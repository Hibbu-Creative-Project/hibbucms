# HibbuCMS Theme Development Guide

This guide provides practical steps for creating a HibbuCMS theme from start to finish. This document complements the existing [Theme Documentation](theme-documentation.md) and [Hooks and Template Hierarchy System](hooks-and-templates.md).

## Table of Contents

1. [Preparation](#preparation)
2. [Creating Theme Structure](#creating-theme-structure)
3. [Creating Theme Configuration File](#creating-theme-configuration-file)
4. [Creating Functions.php](#creating-functionsphp)
5. [Creating Main Layout](#creating-main-layout)
6. [Creating Page Templates](#creating-page-templates)
7. [Managing Theme Assets](#managing-theme-assets)
8. [Using Hooks and Filters](#using-hooks-and-filters)
9. [Creating Child Theme](#creating-child-theme)
10. [Publishing Theme](#publishing-theme)

## Preparation

Before starting to create a theme, make sure you have:

1. A properly running HibbuCMS installation
2. Basic knowledge of PHP, HTML, CSS, and JavaScript
3. Basic knowledge of Laravel Blade templating
4. A code editor such as Visual Studio Code, Sublime Text, or PhpStorm

## Creating Theme Structure

The first step is to create a theme directory structure in the HibbuCMS `themes` folder:

```bash
# Create a new theme directory
mkdir -p themes/my-theme/assets/{css,js,images}
mkdir -p themes/my-theme/views/{layouts,partials,pages,components}
touch themes/my-theme/theme.json
touch themes/my-theme/functions.php
```

Your theme directory structure will look like this:

```
themes/
  └── my-theme/
      ├── assets/
      │   ├── css/
      │   ├── js/
      │   └── images/
      ├── views/
      │   ├── layouts/
      │   ├── partials/
      │   ├── pages/
      │   └── components/
      ├── functions.php
      └── theme.json
```

## Creating Theme Configuration File

The `theme.json` file contains theme metadata and configuration. Here's an example of a `theme.json` file:

```json
{
    "name": "My Theme",
    "slug": "my-theme",
    "version": "1.0.0",
    "description": "Custom theme for HibbuCMS",
    "author": "Your Name",
    "preview": "assets/images/preview.svg",
    "requires": {
        "cms_version": "^1.0.0"
    },
    "settings": {
        "colors": {
            "primary": "#0d6efd",
            "secondary": "#6c757d"
        },
        "typography": {
            "font-family": "'Poppins', sans-serif",
            "font-size": "16px"
        },
        "layout": {
            "container-width": "1200px",
            "sidebar": "right"
        }
    }
}
```

## Creating Functions.php

The `functions.php` file is where you register hooks, filters, menus, sidebars, and theme assets. Here's an example of a `functions.php` file:

```php
<?php

/**
 * My Theme Functions
 *
 * @package MyTheme
 */

// Hook that runs after theme is loaded
add_action('theme.loaded', function($theme) {
    // Register menus
    register_theme_menus();
    
    // Register sidebars
    register_theme_sidebars();
    
    // Register assets
    enqueue_theme_assets();
});

/**
 * Function to register theme menus
 */
function register_theme_menus() {
    // Register theme menus
    add_action('register_menus', function() {
        return [
            'main-menu' => 'Main Menu',
            'footer-menu' => 'Footer Menu'
        ];
    });
}

/**
 * Function to register theme sidebars
 */
function register_theme_sidebars() {
    // Register theme sidebars
    add_action('register_sidebars', function() {
        return [
            'sidebar' => [
                'name' => 'Sidebar',
                'description' => 'Main sidebar that appears on the right.'
            ],
            'footer' => [
                'name' => 'Footer',
                'description' => 'Footer widget area.'
            ]
        ];
    });
}

/**
 * Function to register theme assets (CSS, JavaScript)
 */
function enqueue_theme_assets() {
    // Register and enqueue theme stylesheet
    add_action('theme.styles', function() {
        echo '<link rel="stylesheet" href="' . theme_asset('css/style.css') . '">';
        
        // Add Google Fonts if needed
        echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
        echo '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">';
    });
    
    // Register and enqueue theme JavaScript
    add_action('theme.scripts', function() {
        echo '<script src="' . theme_asset('js/main.js') . '"></script>';
    });
}

/**
 * Filter to modify template hierarchy
 */
add_filter('template_hierarchy', function($templates, $theme) {
    // Add templates directory to hierarchy
    if (is_array($templates)) {
        foreach ($templates as $key => $template) {
            // Check if template starts with 'templates.'
            if (strpos($template, 'templates.') !== 0) {
                // Add templates directory
                $templates[$key] = 'templates.' . $template;
            }
        }
    }
    
    return $templates;
}, 10);

/**
 * Filter to modify home page data
 */
add_filter('home_page_data', function($data) {
    // Add custom data to home page
    $data['featured_posts'] = \App\Models\Post::where('is_featured', true)
        ->where('status', 'published')
        ->limit(3)
        ->get();
    
    return $data;
});
```

## Creating Main Layout

The main layout is the base template used by all pages in your theme. Create a `views/layouts/app.blade.php` file:

```php
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', config('app.name'))</title>
    <meta name="description" content="@yield('meta_description', 'Default description')">
    
    <!-- Theme Styles -->
    {!! do_action('theme.styles') !!}
    
    @stack('styles')
</head>
<body>
    <!-- Header -->
    @include('theme::partials.header')
    
    <!-- Main Content -->
    <main class="main-content">
        @yield('content')
    </main>
    
    <!-- Footer -->
    @include('theme::partials.footer')
    
    <!-- Theme Scripts -->
    {!! do_action('theme.scripts') !!}
    
    @stack('scripts')
</body>
</html>
```

## Creating Page Templates

### Header Partial

Create a `views/partials/header.blade.php` file:

```php
<header class="site-header">
    <div class="container">
        <div class="header-inner">
            <!-- Logo -->
            <div class="site-logo">
                <a href="{{ url('/') }}">
                    {{ config('app.name') }}
                </a>
            </div>
            
            <!-- Navigation -->
            <nav class="main-navigation">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="screen-reader-text">Menu</span>
                    <span class="menu-icon"></span>
                </button>
                
                {!! wp_nav_menu(['theme_location' => 'main-menu', 'menu_id' => 'primary-menu']) !!}
            </nav>
        </div>
    </div>
</header>
```

### Footer Partial

Create a `views/partials/footer.blade.php` file:

```php
<footer class="site-footer">
    <div class="container">
        <div class="footer-widgets">
            <div class="row">
                <div class="col-md-4">
                    <div class="footer-widget">
                        <h3 class="widget-title">About Us</h3>
                        <p>A brief description about your website or company.</p>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="footer-widget">
                        <h3 class="widget-title">Footer Menu</h3>
                        {!! wp_nav_menu(['theme_location' => 'footer-menu', 'menu_id' => 'footer-menu']) !!}
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="footer-widget">
                        <h3 class="widget-title">Contact</h3>
                        <ul class="contact-info">
                            <li><i class="fas fa-map-marker-alt"></i> Your Address</li>
                            <li><i class="fas fa-phone"></i> +1 123 456 789</li>
                            <li><i class="fas fa-envelope"></i> info@example.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="copyright">
                &copy; {{ date('Y') }} {{ config('app.name') }}. All Rights Reserved.
            </div>
        </div>
    </div>
</footer>
```

### Home Page

Create a `views/pages/home.blade.php` file:

```php
@extends('theme::layouts.app')

@section('title', 'Home')
@section('meta_description', 'Description of your website home page')

@section('content')
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">Welcome to {{ config('app.name') }}</h1>
                <p class="hero-description">A brief description about your website or company.</p>
                <div class="hero-buttons">
                    <a href="#" class="btn btn-primary">Learn More</a>
                    <a href="{{ route('contact') }}" class="btn btn-secondary">Contact Us</a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Featured Posts Section -->
    @if(isset($featured_posts) && $featured_posts->count() > 0)
    <section class="featured-posts-section">
        <div class="container">
            <h2 class="section-title">Featured Posts</h2>
            <div class="row">
                @foreach($featured_posts as $post)
                <div class="col-md-4">
                    <div class="featured-post">
                        @if($post->featured_image)
                        <div class="post-thumbnail">
                            <a href="{{ route('post', $post->slug) }}">
                                <img src="{{ $post->featured_image }}" alt="{{ $post->title }}">
                            </a>
                        </div>
                        @endif
                        <div class="post-content">
                            <h3 class="post-title">
                                <a href="{{ route('post', $post->slug) }}">{{ $post->title }}</a>
                            </h3>
                            <div class="post-meta">
                                <span class="post-date">{{ $post->created_at->format('d M Y') }}</span>
                            </div>
                            <div class="post-excerpt">
                                {{ Str::limit(strip_tags($post->content), 150) }}
                            </div>
                            <a href="{{ route('post', $post->slug) }}" class="read-more">Read More</a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>
    @endif
@endsection
```

### Blog Page

Create a `views/pages/blog.blade.php` file:

```php
@extends('theme::layouts.app')

@section('title', 'Blog')
@section('meta_description', 'Read the latest articles from our blog')

@section('content')
    <section class="blog-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <h1 class="page-title">Blog</h1>
                    
                    @if($posts->count() > 0)
                        <div class="posts-list">
                            @foreach($posts as $post)
                                <article class="post">
                                    @if($post->featured_image)
                                    <div class="post-thumbnail">
                                        <a href="{{ route('post', $post->slug) }}">
                                            <img src="{{ $post->featured_image }}" alt="{{ $post->title }}">
                                        </a>
                                    </div>
                                    @endif
                                    <div class="post-content">
                                        <h2 class="post-title">
                                            <a href="{{ route('post', $post->slug) }}">{{ $post->title }}</a>
                                        </h2>
                                        <div class="post-meta">
                                            <span class="post-date">{{ $post->created_at->format('d M Y') }}</span>
                                            @if($post->categories->count() > 0)
                                            <span class="post-categories">
                                                @foreach($post->categories as $category)
                                                <a href="{{ route('category', $category->slug) }}">{{ $category->name }}</a>{{ !$loop->last ? ', ' : '' }}
                                                @endforeach
                                            </span>
                                            @endif
                                        </div>
                                        <div class="post-excerpt">
                                            {{ Str::limit(strip_tags($post->content), 250) }}
                                        </div>
                                        <a href="{{ route('post', $post->slug) }}" class="read-more">Read More</a>
                                    </div>
                                </article>
                            @endforeach
                        </div>
                        
                        <!-- Pagination -->
                        {{ $posts->links() }}
                    @else
                        <div class="no-posts">
                            <p>No posts found.</p>
                        </div>
                    @endif
                </div>
                
                <div class="col-lg-4">
                    @include('theme::partials.sidebar')
                </div>
            </div>
        </div>
    </section>
@endsection
```

### Single Post Page

Create a `views/pages/post.blade.php` file:

```php
@extends('theme::layouts.app')

@section('title', $post->title)
@section('meta_description', Str::limit(strip_tags($post->content), 160))

@section('content')
    <article class="single-post">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="post-header">
                        <h1 class="post-title">{{ $post->title }}</h1>
                        <div class="post-meta">
                            <span class="post-date">{{ $post->created_at->format('d M Y') }}</span>
                            @if($post->categories->count() > 0)
                            <span class="post-categories">
                                @foreach($post->categories as $category)
                                <a href="{{ route('category', $category->slug) }}">{{ $category->name }}</a>{{ !$loop->last ? ', ' : '' }}
                                @endforeach
                            </span>
                            @endif
                        </div>
                    </div>
                    
                    @if($post->featured_image)
                    <div class="post-thumbnail">
                        <img src="{{ $post->featured_image }}" alt="{{ $post->title }}">
                    </div>
                    @endif
                    
                    <div class="post-content">
                        {!! $post->content !!}
                    </div>
                    
                    @if($post->tags->count() > 0)
                    <div class="post-tags">
                        <span class="tags-title">Tags:</span>
                        @foreach($post->tags as $tag)
                        <a href="{{ route('tag', $tag->slug) }}" class="tag">{{ $tag->name }}</a>
                        @endforeach
                    </div>
                    @endif
                    
                    <!-- Author Bio -->
                    @if($post->author)
                    <div class="author-bio">
                        <div class="author-avatar">
                            <img src="{{ $post->author->avatar }}" alt="{{ $post->author->name }}">
                        </div>
                        <div class="author-info">
                            <h3 class="author-name">{{ $post->author->name }}</h3>
                            <p class="author-description">{{ $post->author->bio }}</p>
                        </div>
                    </div>
                    @endif
                    
                    <!-- Related Posts -->
                    @if(isset($related_posts) && $related_posts->count() > 0)
                    <div class="related-posts">
                        <h3 class="related-posts-title">Related Posts</h3>
                        <div class="row">
                            @foreach($related_posts as $related_post)
                            <div class="col-md-4">
                                <div class="related-post">
                                    @if($related_post->featured_image)
                                    <div class="post-thumbnail">
                                        <a href="{{ route('post', $related_post->slug) }}">
                                            <img src="{{ $related_post->featured_image }}" alt="{{ $related_post->title }}">
                                        </a>
                                    </div>
                                    @endif
                                    <h4 class="post-title">
                                        <a href="{{ route('post', $related_post->slug) }}">{{ $related_post->title }}</a>
                                    </h4>
                                    <div class="post-meta">
                                        <span class="post-date">{{ $related_post->created_at->format('d M Y') }}</span>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                    @endif
                    
                    <!-- Comments -->
                    @if(config('blog.comments_enabled'))
                    <div class="comments-area">
                        <h3 class="comments-title">Comments</h3>
                        @include('theme::components.comments', ['post' => $post])
                    </div>
                    @endif
                </div>
                
                <div class="col-lg-4">
                    @include('theme::partials.sidebar')
                </div>
            </div>
        </div>
    </article>
@endsection
```

## Managing Theme Assets

### CSS

Create a `assets/css/style.css` file:

```css
/**
 * Theme Name: My Theme
 * Theme URI: https://example.com/my-theme
 * Author: Your Name
 * Author URI: https://example.com
 * Description: Custom theme for HibbuCMS
 * Version: 1.0.0
 */

/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

/* Container */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

/* Header */
.site-header {
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    position: relative;
}

.header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.site-logo a {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    text-decoration: none;
}

/* Navigation */
.main-navigation ul {
    display: flex;
    list-style: none;
}

.main-navigation li {
    margin-left: 20px;
    position: relative;
}

.main-navigation a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.main-navigation a:hover {
    color: #0d6efd;
}

.menu-toggle {
    display: none;
}

/* Hero Section */
.hero-section {
    background-color: #0d6efd;
    color: #fff;
    padding: 100px 0;
    text-align: center;
}

.hero-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 20px;
}

.hero-description {
    font-size: 20px;
    margin-bottom: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #fff;
    color: #0d6efd;
}

.btn-primary:hover {
    background-color: #f8f9fa;
}

.btn-secondary {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
}

.btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Featured Posts Section */
.featured-posts-section {
    padding: 80px 0;
}

.section-title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 36px;
    font-weight: 700;
}

.featured-post {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-post:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.post-thumbnail img {
    width: 100%;
    height: auto;
    display: block;
}

.post-content {
    padding: 20px;
}

.post-title {
    font-size: 20px;
    margin-bottom: 10px;
}

.post-title a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
}

.post-title a:hover {
    color: #0d6efd;
}

.post-meta {
    font-size: 14px;
    color: #6c757d;
    margin-bottom: 10px;
}

.post-excerpt {
    margin-bottom: 15px;
}

.read-more {
    display: inline-block;
    color: #0d6efd;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.read-more:hover {
    color: #0a58ca;
}

/* Blog Section */
.blog-section {
    padding: 80px 0;
}

.page-title {
    margin-bottom: 40px;
    font-size: 36px;
    font-weight: 700;
}

.posts-list .post {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.posts-list .post-thumbnail {
    flex: 0 0 35%;
}

.posts-list .post-content {
    flex: 0 0 65%;
    padding: 30px;
}

/* Single Post */
.single-post {
    padding: 80px 0;
}

.post-header {
    margin-bottom: 30px;
}

.single-post .post-title {
    font-size: 36px;
    margin-bottom: 15px;
}

.single-post .post-meta {
    margin-bottom: 20px;
}

.single-post .post-thumbnail {
    margin-bottom: 30px;
}

.single-post .post-content {
    margin-bottom: 40px;
}

.post-tags {
    margin-bottom: 40px;
}

.tags-title {
    font-weight: 600;
    margin-right: 10px;
}

.tag {
    display: inline-block;
    background-color: #f8f9fa;
    color: #6c757d;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 5px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.tag:hover {
    background-color: #e9ecef;
    color: #495057;
}

/* Author Bio */
.author-bio {
    display: flex;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 40px;
}

.author-avatar {
    flex: 0 0 80px;
    margin-right: 20px;
}

.author-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.author-info {
    flex: 1;
}

.author-name {
    font-size: 20px;
    margin-bottom: 10px;
}

/* Related Posts */
.related-posts {
    margin-bottom: 40px;
}

.related-posts-title {
    margin-bottom: 20px;
}

.related-post {
    margin-bottom: 20px;
}

/* Comments */
.comments-area {
    margin-bottom: 40px;
}

.comments-title {
    margin-bottom: 20px;
}

/* Footer */
.site-footer {
    background-color: #212529;
    color: #fff;
    padding: 60px 0 30px;
}

.footer-widgets {
    margin-bottom: 30px;
}

.footer-widget {
    margin-bottom: 30px;
}

.widget-title {
    font-size: 20px;
    margin-bottom: 20px;
    color: #fff;
}

.footer-widget p {
    color: rgba(255, 255, 255, 0.7);
}

.footer-widget ul {
    list-style: none;
}

.footer-widget ul li {
    margin-bottom: 10px;
}

.footer-widget ul li a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-widget ul li a:hover {
    color: #fff;
}

.contact-info li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    color: rgba(255, 255, 255, 0.7);
}

.contact-info li i {
    margin-right: 10px;
    color: #0d6efd;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;
    text-align: center;
}

.copyright {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
}

/* Responsive */
@media (max-width: 991px) {
    .hero-title {
        font-size: 36px;
    }
    
    .hero-description {
        font-size: 18px;
    }
}

@media (max-width: 767px) {
    .menu-toggle {
        display: block;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
    }
    
    .main-navigation ul {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        padding: 10px 0;
        z-index: 100;
    }
    
    .main-navigation.toggled ul {
        display: block;
    }
    
    .main-navigation li {
        margin: 0;
        padding: 10px 20px;
    }
    
    .hero-section {
        padding: 60px 0;
    }
    
    .hero-title {
        font-size: 28px;
    }
    
    .hero-description {
        font-size: 16px;
    }
    
    .hero-buttons {
        flex-direction: column;
        gap: 10px;
    }
    
    .btn {
        width: 100%;
    }
}
```

### JavaScript

Create a `assets/js/main.js` file:

```javascript
/**
 * Theme Name: My Theme
 * Theme URI: https://example.com/my-theme
 * Author: Your Name
 * Author URI: https://example.com
 * Description: Custom theme for HibbuCMS
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    setupMobileMenu();
    setupDropdownMenus();
    setupBackToTop();
});

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    
    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('toggled');
            const expanded = mainNavigation.classList.contains('toggled');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }
}

/**
 * Setup dropdown menus
 */
function setupDropdownMenus() {
    const hasChildren = document.querySelectorAll('.menu-item-has-children');
    
    if (hasChildren.length > 0) {
        hasChildren.forEach(function(item) {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');
            
            if (link && submenu) {
                // Add dropdown toggle button
                const dropdownToggle = document.createElement('button');
                dropdownToggle.className = 'dropdown-toggle';
                dropdownToggle.setAttribute('aria-expanded', 'false');
                link.after(dropdownToggle);
                
                // Toggle submenu on click
                dropdownToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    submenu.classList.toggle('toggled');
                    const expanded = submenu.classList.contains('toggled');
                    dropdownToggle.setAttribute('aria-expanded', expanded);
                });
            }
        });
    }
}

/**
 * Setup back to top button
 */
function setupBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
```

## Using Hooks and Filters

Hooks and filters allow you to modify the behavior of HibbuCMS without modifying core files. Here are some examples of using hooks and filters:

### Adding Custom CSS

```php
add_action('theme.styles', function() {
    echo '<style>
        /* Custom CSS */
        .custom-element {
            color: red;
        }
    </style>';
});
```

### Modifying Posts Per Page

```php
add_filter('blog_posts_per_page', function($perPage) {
    return 12; // Show 12 posts per page
});
```

### Adding Custom Data to Home Page

```php
add_filter('home_page_data', function($data) {
    $data['custom_data'] = 'Custom value';
    return $data;
});
```

### Modifying Related Posts Query

```php
add_filter('related_posts_query', function($query, $post) {
    // Modify query to get related posts
    $query->where('category_id', $post->category_id);
    return $query;
});
```

## Creating Child Theme

Child themes allow you to modify a parent theme without changing its files. This is useful for making customizations that won't be lost when the parent theme is updated.

### Child Theme Structure

```
themes/
  ├── my-theme/
  │   ├── assets/
  │   ├── views/
  │   └── functions.php
  └── my-child-theme/
      ├── assets/
      ├── views/
      ├── functions.php
      └── theme.json
```

### Child Theme Configuration

Create a `theme.json` file for your child theme:

```json
{
    "name": "My Child Theme",
    "slug": "my-child-theme",
    "version": "1.0.0",
    "description": "A child theme of My Theme",
    "author": "Your Name",
    "preview": "assets/images/preview.svg",
    "requires": {
        "cms_version": "^1.0.0"
    },
    "settings": {
        "parent": "my-theme",
        "colors": {
            "primary": "#ff6b6b",
            "secondary": "#546de5"
        }
    }
}
```

### Functions.php for Child Theme

Create a `functions.php` file for your child theme:

```php
<?php

/**
 * My Child Theme Functions
 *
 * @package MyChildTheme
 */

// Hook that runs after theme is loaded
add_action('theme.loaded', function($theme) {
    // Register child theme assets
    enqueue_child_theme_assets();
});

/**
 * Function to register child theme assets (CSS, JavaScript)
 */
function enqueue_child_theme_assets() {
    // Register and enqueue child theme stylesheet
    add_action('theme.styles', function() {
        // Add parent theme stylesheet first
        echo '<link rel="stylesheet" href="' . parent_theme_asset('css/style.css') . '">';
        
        // Then add child theme stylesheet
        echo '<link rel="stylesheet" href="' . theme_asset('css/style.css') . '">';
    }, 5); // Higher priority (lower number) than parent theme
    
    // Register and enqueue child theme JavaScript
    add_action('theme.scripts', function() {
        // Add parent theme JavaScript first
        echo '<script src="' . parent_theme_asset('js/main.js') . '"></script>';
        
        // Then add child theme JavaScript
        echo '<script src="' . theme_asset('js/main.js') . '"></script>';
    }, 5); // Higher priority (lower number) than parent theme
}

/**
 * Override filter from parent theme
 */
add_filter('blog_posts_per_page', function($perPage) {
    return 6; // Show 6 posts per page (override from parent theme)
}, 5); // Higher priority (lower number) than parent theme
```

### CSS for Child Theme

Create a `assets/css/style.css` file for your child theme:

```css
/**
 * Theme Name: My Child Theme
 * Theme URI: https://example.com/my-child-theme
 * Author: Your Name
 * Author URI: https://example.com
 * Description: Child theme of My Theme
 * Version: 1.0.0
 * Template: my-theme
 */

/* Override styles from parent theme */
body {
    font-family: 'Montserrat', sans-serif;
}

.hero-section {
    background-color: #ff6b6b;
}

.btn-primary {
    background-color: #546de5;
    color: #fff;
}

.btn-primary:hover {
    background-color: #3f51b5;
}
```

## Publishing Theme

After your theme is complete, you need to publish theme assets to the public directory so they can be accessed by the browser. Use the following Artisan command:

```bash
php artisan vendor:publish --tag=theme-assets --force
```

This command will copy assets from the `themes/[theme-name]/assets` directory to the `public/themes/[theme-name]/assets` directory.

### Activating Theme

To activate your theme, you can use the HibbuCMS admin panel or the following Artisan command:

```bash
php artisan theme:activate my-theme
```

### Creating Theme Package

If you want to distribute your theme, you can create a theme package in ZIP format:

```bash
php artisan theme:package my-theme
```

This command will create a ZIP file of your theme in the `storage/app/themes` directory.

## Conclusion

This guide has provided practical steps for creating a HibbuCMS theme from start to finish. By following this guide, you can create a custom and professional theme for HibbuCMS.

For more information about the HibbuCMS theme system, see [Theme Documentation](theme-documentation.md) and [Hooks and Template Hierarchy System](hooks-and-templates.md).