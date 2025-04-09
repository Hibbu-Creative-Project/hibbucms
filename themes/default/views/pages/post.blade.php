@extends('theme::layouts.main')

@section('title', $post->title)

@section('content')
    <article class="max-w-4xl mx-auto">
        <!-- Post Header -->
        <header class="mb-8">
            <h1 class="text-4xl font-bold mb-4">{{ $post->title }}</h1>
            <div class="flex items-center gap-4 text-gray-600">
                <time datetime="{{ $post->published_at->format('Y-m-d') }}">
                    {{ $post->published_at->format('F d, Y') }}
                </time>
                @if ($post->category)
                    <span>•</span>
                    <a href="{{ url('/blog?category=' . $post->category->slug) }}"
                        class="text-primary hover:text-primary-dark">
                        {{ $post->category->name }}
                    </a>
                @endif
            </div>
        </header>

        <!-- Featured Image -->
        @if ($post->featured_image)
            <div class="mb-8">
                <img src="{{ $post->featured_image }}" alt="{{ $post->title }}" class="w-full h-96 object-cover rounded-lg">
            </div>
        @endif

        <!-- Post Content -->
        <div class="prose prose-lg max-w-none mb-8">
            {!! $post->content !!}
        </div>

        <!-- Tags -->
        @if ($post->tags->count() > 0)
            <div class="mb-8">
                <h3 class="text-lg font-semibold mb-4">Tags</h3>
                <div class="flex flex-wrap gap-2">
                    @foreach ($post->tags as $tag)
                        <a href="{{ url('/blog?tag=' . $tag->slug) }}"
                            class="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                            {{ $tag->name }}
                        </a>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- Share Buttons -->
        <div class="flex items-center gap-4 mb-12">
            <span class="font-semibold">Share:</span>
            <a href="https://twitter.com/intent/tweet?url={{ urlencode(url()->current()) }}&text={{ urlencode($post->title) }}"
                target="_blank" class="text-gray-600 hover:text-primary">
                Twitter
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(url()->current()) }}" target="_blank"
                class="text-gray-600 hover:text-primary">
                Facebook
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ urlencode(url()->current()) }}&title={{ urlencode($post->title) }}"
                target="_blank" class="text-gray-600 hover:text-primary">
                LinkedIn
            </a>
        </div>

        <!-- Related Posts -->
        @if ($relatedPosts->count() > 0)
            <div class="border-t pt-12">
                <h2 class="text-2xl font-bold mb-6">Related Posts</h2>
                <div class="post-grid">
                    @foreach ($relatedPosts as $relatedPost)
                        <div class="card post-card">
                            @if ($relatedPost->featured_image)
                                <img src="{{ $relatedPost->featured_image }}" alt="{{ $relatedPost->title }}"
                                    class="post-card-image">
                            @endif
                            <div class="post-content">
                                <h3 class="post-title">
                                    <a href="{{ url('/blog/' . $relatedPost->slug) }}">
                                        {{ $relatedPost->title }}
                                    </a>
                                </h3>
                                <p class="post-excerpt">
                                    {{ Str::limit($relatedPost->excerpt ?? $relatedPost->content, 120) }}
                                </p>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">
                                        {{ $relatedPost->published_at->format('M d, Y') }}
                                    </span>
                                    @if ($relatedPost->category)
                                        <a href="{{ url('/blog?category=' . $relatedPost->category->slug) }}"
                                            class="text-sm text-primary">
                                            {{ $relatedPost->category->name }}
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </article>
@endsection

@push('styles')
    <style>
        .prose {
            max-width: 100%;
        }

        .prose img {
            margin: 2rem auto;
            border-radius: 0.5rem;
        }

        .prose h2 {
            font-size: 1.875rem;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            font-weight: 700;
        }

        .prose h3 {
            font-size: 1.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .prose p {
            margin-bottom: 1.25rem;
            line-height: 1.75;
        }

        .prose ul,
        .prose ol {
            margin: 1.25rem 0;
            padding-left: 1.25rem;
        }

        .prose li {
            margin: 0.5rem 0;
        }

        .prose blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: #4b5563;
            font-style: italic;
        }

        .prose code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
        }

        .prose pre {
            background: #1f2937;
            color: #f3f4f6;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }

        .prose pre code {
            background: transparent;
            padding: 0;
            color: inherit;
        }
    </style>
@endpush
