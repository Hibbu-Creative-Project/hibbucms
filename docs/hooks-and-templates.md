# Hook System and Template Hierarchy in HibbuCMS

## Hook System

The hook system in HibbuCMS allows themes and plugins to modify core functionality without changing the original source code. This system is inspired by WordPress and consists of two types of hooks: Actions and Filters.

### Action

Actions allow you to execute functions at specific points in code execution. You can register functions to run when certain actions are triggered.

```php
// Registering action
add_action('action_name', function($param1, $param2) {
    // Code that will be executed when the action is triggered
}, 10);

// Running action
do_action('action_name', $param1, $param2);
```

### Filter

Filters allow you to modify data before it is used by the application. You can register functions to modify data when certain filters are triggered.

```php
// Registering filter
add_filter('filter_name', function($value, $param) {
    // Modify $value
    return $modified_value;
}, 10);

// Applying filter
$value = apply_filters('filter_name', $value, $param);
```

### Priority

Both actions and filters support priority. Priority determines the execution order of functions registered to the same hook. The lower the priority number, the earlier the function is executed.

```php
// Priority 5 (executed earlier)
add_action('action_name', function() {
    // Code that will be executed earlier
}, 5);

// Priority 10 (default)
add_action('action_name', function() {
    // Code that will be executed after functions with priority 5
}, 10);

// Priority 20 (executed later)
add_action('action_name', function() {
    // Code that will be executed last
}, 20);
```

### Removing Hooks

You can remove registered actions or filters.

```php
// Removing action
remove_action('action_name', 'function_name', 10);

// Removing filter
remove_filter('filter_name', 'function_name', 10);
```

### Checking Hooks

You can check if an action or filter has been registered.

```php
// Checking action
if (has_action('action_name')) {
    // Action is registered
}

// Checking filter
if (has_filter('filter_name')) {
    // Filter is registered
}
```

## Template Hierarchy

Template hierarchy allows themes to provide custom templates for different types of content. The system searches for templates based on priority and uses the first template found.

### Home Page Template Hierarchy

```php
// Home page template hierarchy
[
    'theme::templates.home',
    'theme::home',
    'theme::index',
]
```

### Blog Template Hierarchy

```php
// Blog template hierarchy
[
    'theme::templates.blog',
    'theme::blog',
    'theme::archive',
    'theme::index',
]
```

### Category Template Hierarchy

```php
// Category template hierarchy
[
    'theme::templates.category-{slug}',
    'theme::category-{slug}',
    'theme::category',
    'theme::archive',
    'theme::index',
]
```

### Tag Template Hierarchy

```php
// Tag template hierarchy
[
    'theme::templates.tag-{slug}',
    'theme::tag-{slug}',
    'theme::tag',
    'theme::archive',
    'theme::index',
]
```

### Search Template Hierarchy

```php
// Search template hierarchy
[
    'theme::templates.search',
    'theme::search',
    'theme::archive',
    'theme::index',
]
```

### Single Post Template Hierarchy

```php
// Single post template hierarchy
[
    'theme::templates.single-{id}',
    'theme::single-{id}',
    'theme::templates.single-{slug}',
    'theme::single-{slug}',
    'theme::templates.single',
    'theme::single',
    'theme::index',
]
```

### Page Template Hierarchy

```php
// Page template hierarchy
[
    'theme::templates.page-{slug}',
    'theme::page-{slug}',
    'theme::templates.page',
    'theme::page',
    'theme::index',
]
```

### 404 Template Hierarchy

```php
// 404 template hierarchy
[
    'theme::templates.404',
    'theme::404',
    'theme::index',
]
```

## Child Theme

HibbuCMS supports child themes that allow you to inherit and override templates from the parent theme.

### Child Theme Structure

```
themes/
  ├── parent-theme/
  │   ├── assets/
  │   ├── views/
  │   └── functions.php
  └── child-theme/
      ├── assets/
      ├── views/
      └── functions.php
```

### Registering Child Theme

Child themes are registered by specifying the `parent_id` in the theme data.

### Template Hierarchy with Child Theme

When using a child theme, the system will search for templates in the following order:

1. Child theme
2. Parent theme

This allows child themes to override specific templates from the parent theme while still inheriting other templates that are not overridden.

## Available Hooks

### Theme Hooks

- `theme.loaded` - Triggered after theme is loaded
- `theme.view_path_base` - Filter to modify theme view path
- `theme.parent_view_path_base` - Filter to modify parent theme view path
- `theme.assets_path_base` - Filter to modify theme assets path
- `theme.public_assets_path` - Filter to modify theme public assets path
- `theme.before_activate` - Triggered before theme activation
- `theme.after_activate` - Triggered after theme activation
- `theme.before_delete` - Triggered before theme deletion
- `theme.after_delete` - Triggered after theme deletion

### Home Page Hooks

- `before_home_page` - Triggered before home page render
- `home_page_data` - Filter to modify home page data

### Blog Page Hooks

- `blog_posts_query` - Filter to modify blog posts query
- `blog_posts_per_page` - Filter to modify posts per page count
- `before_blog_page` - Triggered before blog page render
- `blog_page_data` - Filter to modify blog page data

### Single Post Hooks

- `post_found` - Triggered after post is found
- `before_single_post` - Triggered before single post render
- `related_posts_query` - Filter to modify related posts query
- `related_posts_count` - Filter to modify related posts count
- `single_post_data` - Filter to modify single post data

### Page Hooks

- `page_found` - Triggered after page is found
- `before_page` - Triggered before page render
- `page_data` - Filter to modify page data

### Template Hooks

- `template_hierarchy` - Filter to modify template hierarchy
- `template_include` - Filter to modify template to be used

## Usage Examples

### Adding Custom CSS to Home Page

```php
// In theme's functions.php
add_action('before_home_page', function() {
    echo '<style>
        .home-banner {
            background-color: #f5f5f5;
            padding: 50px 0;
        }
    </style>';
});
```

### Modifying Posts Per Page Count

```php
// In theme's functions.php
add_filter('blog_posts_per_page', function($perPage) {
    return 12; // Display 12 posts per page
});
```

### Adding Custom Data to Blog Page

```php
// In theme's functions.php
add_filter('blog_page_data', function($data, $request) {
    $data['featured_posts'] = \App\Models\Post::where('is_featured', true)
        ->where('status', 'published')
        ->limit(3)
        ->get();
    
    return $data;
}, 10);
```

### Modifying Related Posts Query

```php
// In theme's functions.php
add_filter('related_posts_query', function($query, $post) {
    // Only show posts with the same categories
    $categoryIds = $post->categories->pluck('id')->toArray();
    
    return $query->whereHas('categories', function($q) use ($categoryIds) {
        $q->whereIn('categories.id', $categoryIds);
    });
}, 10);
```

### Adding Meta Tags to Page

```php
// In theme's functions.php
add_action('before_page', function($page) {
    echo '<meta name="description" content="' . $page->meta_description . '">';
});
```

### Modifying Template Hierarchy

```php
// In theme's functions.php
add_filter('template_hierarchy', function($templates, $theme) {
    // Add custom template to hierarchy
    if (is_array($templates) && count($templates) > 0) {
        array_unshift($templates, 'theme::templates.custom');
    }
    
    return $templates;
}, 10);
```
