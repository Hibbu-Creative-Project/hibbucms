# Static Pages Guide

## Overview

HibbuCMS provides a secure and flexible system for creating custom static pages that are manually coded rather than stored in the database. This system allows developers to create pages like "About Us", "Vision & Mission", "Contact", and other static pages using Blade templates.

## Security Features

- **Input Validation**: Page slugs are validated to prevent path traversal attacks
- **Path Traversal Protection**: Only alphanumeric characters, underscores, and hyphens are allowed
- **Route Constraints**: URL parameters are restricted using regex patterns
- **Dynamic Theme Support**: Uses active theme instead of hardcoded values
- **Specific Template Matching**: Only pages with specific templates are displayed
- **404 for Non-existent Pages**: Proper error handling for pages without templates

## How It Works

### Route Definition
The static page route is defined as a catch-all route in `web.php`:
```php
Route::get('/{page}', [FrontendController::class, 'staticPage'])
    ->name('static.page')
    ->where('page', '[a-zA-Z0-9_-]+');
```

### Controller Method
The `staticPage` method in `FrontendController` handles the request with these steps:
1. **Security Validation**: Validates the page parameter to prevent path traversal attacks
2. **Dynamic Theme Support**: Uses the currently active theme instead of hardcoded values
3. **Hook Integration**: Runs `before_static_page` action and applies filters
4. **Template Hierarchy**: Searches for templates in this order:
   - `pages.static.{page}`
   - `pages.{page}`
   - `static.{page}`
5. **Fallback Handling**: Uses theme namespace `theme::pages.static.{page}` if hierarchy search fails
6. **404 Response**: Returns 404 if no specific template is found

### Template Hierarchy

The system searches for templates in the following order:

1. `pages.static.{page}` - Specific static page template
2. `pages.{page}` - General page template
3. `static.{page}` - Static template
4. `theme::pages.static.{page}` - Theme namespace fallback

## Creating Static Pages

### Method 1: Custom Template Files

Create specific template files in your theme's static pages directory:

```
themes/{theme}/views/pages/static/
├── simple-static.blade.php          # /simple-static
├── ...
```

**Note**: Each page must have its own specific template file.

1. **Create a specific template** for your page:
   ```
   themes/default/views/pages/static/simple-static.blade.php
   ```

2. **Access the page** via URL:
   ```
   https://yoursite.com/simple-static
   ```

### Method 2: Additional Template Examples

Here are more examples of specific static page templates:

**File**: `themes/default/views/pages/static/simple-static.blade.php`

```blade
@extends('theme::layouts.app')

@section('title', 'Simple Static Page')
@section('meta_description', 'This is a simple static page.')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1>Halo Dunia</h1>
</div>
@endsection

@push('scripts')
<script>
    // Add any page-specific JavaScript here
    console.log('Simple Static Page loaded');
</script>
@endpush
```

### Method 3: Hook System

You can use the hook system to modify static page behavior:

**File**: `themes/default/functions.php`

```php
// Modify static page data
add_filter('static_page_data', function($data, $page) {
    if ($page === 'simple-static') {
        $data['company_name'] = 'Your Company Name';
        $data['founded_year'] = '2020';
    }
    return $data;
}, 10, 2);

// Add custom template hierarchy
add_filter('static_page_templates', function($templates, $page) {
    if ($page === 'special') {
        array_unshift($templates, "custom.special");
    }
    return $templates;
}, 10, 2);

// Run action before static page
add_action('before_static_page', function($page) {
    // Custom logic before rendering static page
    if ($page === 'contact') {
        // Load contact form data, etc.
    }
});
```

## Available Data in Templates

All static page templates receive the following data:

- `$page_slug` - The requested page slug (e.g., "simple-static")
- `$theme` - Current active theme name
- Additional data from filters and hooks

## Best Practices

### Security
- Always validate and sanitize user input
- Use proper escaping in Blade templates
- Avoid exposing sensitive information in templates
- Follow Laravel security guidelines

### Performance
- Use view caching for better performance
- Optimize images and assets
- Minimize database queries in templates
- Use CDN for static assets

### SEO
- Include proper meta tags (title, description, keywords)
- Use semantic HTML structure
- Implement structured data when appropriate
- Ensure mobile responsiveness

### Maintenance
- Keep templates organized and well-documented
- Use consistent naming conventions
- Implement proper error handling
- Regular testing of all static pages

## Troubleshooting

### Common Issues

1. **Page shows 404 error**
   - Check if template file exists: `themes/{theme}/views/pages/static/{page}.blade.php`
   - Verify file naming convention matches URL slug exactly
   - Ensure theme is active and properly configured
   - Clear view cache: `php artisan view:clear`

2. **Template not loading**
   - Clear view cache: `php artisan view:clear`
   - Check template hierarchy order
   - Verify theme directory structure
   - Ensure template name matches exactly with URL slug

3. **Data not available in template**
   - Check hook implementation in `functions.php`
   - Verify filter usage for data modification
   - Ensure proper variable passing

4. **Security errors**
   - Ensure page slug contains only allowed characters
   - Avoid using user input directly in template names
   - Always validate and sanitize data
   - Use proper escaping in Blade templates

5. **Theme issues**
   - Confirm active theme and template locations
   - Verify proper theme namespace usage

### Debugging

To debug static page issues:

1. **Enable debug mode** in `.env`:
   ```
   APP_DEBUG=true
   ```

2. **Check Laravel logs**:
   ```
   storage/logs/laravel.log
   ```

3. **Use dd() for debugging** in controller or templates:
   ```php
   dd($data, $templates, $theme);
   ```

4. **Verify template paths**:
   ```php
   // In controller
   dd(view()->exists('theme::pages.static.simple-static'));
   ```

## Advanced Usage

### Custom Template Hierarchy

You can modify the template hierarchy using filters:

```php
add_filter('static_page_templates', function($templates, $page) {
    // Add custom template for specific pages
    if ($page === 'special') {
        array_unshift($templates, "custom.special-page");
    }
    
    // Add fallback for all pages
    $templates[] = "fallback.static";
    
    return $templates;
}, 10, 2);
```

### Dynamic Data Loading

Load dynamic data for static pages:

```php
add_filter('static_page_data', function($data, $page) {
    switch ($page) {
        case 'team':
            $data['team_members'] = collect([
                ['name' => 'John Doe', 'position' => 'CEO'],
                ['name' => 'Jane Smith', 'position' => 'CTO'],
            ]);
            break;
            
        case 'stats':
            $data['statistics'] = [
                'projects_completed' => 150,
                'happy_clients' => 200,
                'years_experience' => 5,
            ];
            break;
    }
    
    return $data;
}, 10, 2);
```

### Conditional Template Loading

Load different templates based on conditions:

```php
add_action('before_static_page', function($page) {
    // Redirect mobile users to mobile-specific pages
    if (request()->header('User-Agent') && str_contains(request()->header('User-Agent'), 'Mobile')) {
        if ($page === 'contact') {
            // Load mobile contact template
            add_filter('static_page_templates', function($templates) {
                array_unshift($templates, 'mobile.contact');
                return $templates;
            });
        }
    }
});
```

This guide provides comprehensive information for creating and managing static pages in HibbuCMS. For more advanced customizations, refer to the theme development documentation.
