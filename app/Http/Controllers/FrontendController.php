<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Page;
use App\Services\TemplateHierarchy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class FrontendController extends Controller
{
    /**
     * Displaying home page
     * Using template hierarchy to find the appropriate template
     *
     * @return \Illuminate\View\View
     */
    public function home()
    {
        $posts = Post::with(['category', 'tags'])
            ->where('status', 'published')
            ->latest('published_at')
            ->take(6)
            ->get();

        $categories = Category::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        $tags = Tag::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        // Run action before rendering home page
        do_action('before_home_page', $posts, $categories, $tags);

        // Get data for view
        $data = [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ];

        // Apply filter for data
        $data = apply_filters('home_page_data', $data);

        // Find appropriate template based on hierarchy
        $templates = TemplateHierarchy::getHomeTemplates();
        $template = TemplateHierarchy::locateTemplate($templates, app('theme'));

        // If no template is found, use fallback
        if (!$template) {
            return view('theme::pages.home', $data);
        }

        return view($template, $data);
    }

    /**
     * Displaying blog/archive page
     * Supports filtering by category, tag, and search
     * Using template hierarchy to find the appropriate template
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function blog(Request $request)
    {
        $posts = Post::with(['category', 'tags'])
            ->where('status', 'published')
            ->when($request->category, function ($query, $category) {
                return $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($request->tag, function ($query, $tag) {
                return $query->whereHas('tags', function ($q) use ($tag) {
                    $q->where('slug', $tag);
                });
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            });

        // Apply filter for query posts
        $posts = apply_filters('blog_posts_query', $posts, $request);

        // Continue with pagination
        $posts = $posts->latest('published_at')
            ->paginate(apply_filters('blog_posts_per_page', 9))
            ->withQueryString();

        $categories = Category::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        $tags = Tag::withCount(['posts' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        // Run action before rendering blog page
        do_action('before_blog_page', $posts, $categories, $tags, $request);

        // Get data for view
        $data = [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
        ];

        // Apply filter for data
        $data = apply_filters('blog_page_data', $data, $request);

        // Determine template to be used based on request parameter
        $templates = [];

        if ($request->category) {
            // If category filter is applied, use category template
            $templates = TemplateHierarchy::getCategoryTemplates($request->category);
        } elseif ($request->tag) {
            // If tag filter is applied, use tag template
            $templates = TemplateHierarchy::getTagTemplates($request->tag);
        } elseif ($request->search) {
            // If search is applied, use search template
            $templates = TemplateHierarchy::getSearchTemplates();
        } else {
            // If no filter is applied, use blog/archive template
            $templates = TemplateHierarchy::getBlogTemplates();
        }

        // Find appropriate template based on hierarchy
        $template = TemplateHierarchy::locateTemplate($templates, app('theme'));

        // If no template is found, use fallback
        if (!$template) {
            return view('theme::pages.blog', $data);
        }

        return view($template, $data);
    }

    /**
     * Displaying single post page
     * Using template hierarchy to find the appropriate template
     *
     * @param string $slug Slug postingan
     * @return \Illuminate\View\View
     */
    public function post($slug)
    {
        $post = Post::with(['category', 'tags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Run action after post is found
        do_action('post_found', $post);

        $relatedPosts = Post::with(['category', 'tags'])
            ->where('status', 'published')
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($post) {
                return $query->where('category_id', $post->category_id)
                    ->orWhereHas('tags', function ($q) use ($post) {
                        $q->whereIn('id', $post->tags->pluck('id'));
                    });
            });

        // Apply filter for query related posts
        $relatedPosts = apply_filters('related_posts_query', $relatedPosts, $post);

        // Continue with data retrieval
        $relatedPosts = $relatedPosts->latest('published_at')
            ->take(apply_filters('related_posts_count', 3))
            ->get();

        // Run action before rendering single post page
        do_action('before_single_post', $post, $relatedPosts);

        // Get data for view
        $data = [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ];

        // Apply filter for data
        $data = apply_filters('single_post_data', $data);

        // Find appropriate template based on hierarchy
        $templates = TemplateHierarchy::getSingleTemplates($slug);
        $template = TemplateHierarchy::locateTemplate($templates, app('theme'));

        // If no template is found, use fallback
        if (!$template) {
            return view('theme::pages.post', $data);
        }

        return view($template, $data);
    }

    /**
     * Displaying static page
     * Using template hierarchy to find the appropriate template
     *
     * @param string $slug Slug halaman
     * @return \Illuminate\View\View
     */
    public function page($slug)
    {
        $page = Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Run action after page is found
        do_action('page_found', $page);

        // Run action before rendering page
        do_action('before_page', $page);

        // Get data for view
        $data = [
            'page' => $page
        ];

        // Apply filter for data
        $data = apply_filters('page_data', $data);

        // Check if page has custom template
        $customTemplate = $page->template ?? null;

        if ($customTemplate) {
            // If page has custom template, try to use it
            $customTemplatePath = "theme::templates.{$customTemplate}";

            if (View::exists($customTemplatePath)) {
                return view($customTemplatePath, $data);
            }
        }

        // Find appropriate template based on hierarchy
        $templates = TemplateHierarchy::getPageTemplates($slug);
        $template = TemplateHierarchy::locateTemplate($templates, app('theme'));

        // If no template is found, use fallback
        if (!$template) {
            return view('theme::pages.page', $data);
        }

        return view($template, $data);
    }
}
