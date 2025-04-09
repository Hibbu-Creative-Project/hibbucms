@extends('theme::layouts.main')

@section('title', 'Welcome')

@section('content')
    <!-- Hero Section -->
    <div class="card text-center mb-4 border-0 bg-primary bg-opacity-10">
        <div class="card-body py-5">
            <h1 class="display-4 fw-bold mb-3">Selamat Datang di {{ config('app.name') }}</h1>
            <p class="lead mb-4">Temukan artikel dan wawasan terbaru kami</p>
            <a href="{{ url('/blog') }}" class="btn btn-primary">Baca Blog Kami</a>
        </div>
    </div>

    <!-- Featured Posts -->
    @if ($posts->count() > 0)
        <div class="mb-5">
            <h2 class="fw-bold mb-4">Postingan Terbaru</h2>
            <div class="row g-4">
                @foreach ($posts as $post)
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm">
                            @if ($post->featured_image)
                                <img src="{{ $post->featured_image }}" class="card-img-top" alt="{{ $post->title }}"
                                    style="height: 200px; object-fit: cover;">
                            @endif
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a href="{{ url('/blog/' . $post->slug) }}"
                                        class="text-decoration-none text-dark">{{ $post->title }}</a>
                                </h5>
                                <p class="card-text text-muted">{{ Str::limit($post->excerpt ?? $post->content, 120) }}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        @if ($post->published_at)
                                            {{ $post->published_at->format('d M Y') }}
                                        @else
                                            Draft
                                        @endif
                                    </small>
                                    @if ($post->category)
                                        <a href="{{ url('/blog?category=' . $post->category->slug) }}"
                                            class="badge bg-light text-primary text-decoration-none">
                                            {{ $post->category->name }}
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    <!-- Categories Section -->
    @if ($categories->count() > 0)
        <div class="mb-5">
            <h2 class="fw-bold mb-4">Kategori</h2>
            <div class="row g-3">
                @foreach ($categories as $category)
                    <div class="col-6 col-md-4 col-lg-3">
                        <a href="{{ url('/blog?category=' . $category->slug) }}" class="text-decoration-none">
                            <div class="card h-100 shadow-sm hover-shadow">
                                <div class="card-body">
                                    <h5 class="card-title">{{ $category->name }}</h5>
                                    <p class="card-text text-muted">{{ $category->posts_count }} postingan</p>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    <!-- Tags Cloud -->
    @if ($tags->count() > 0)
        <div>
            <h2 class="fw-bold mb-4">Tag Populer</h2>
            <div class="d-flex flex-wrap gap-2">
                @foreach ($tags as $tag)
                    <a href="{{ url('/blog?tag=' . $tag->slug) }}"
                        class="badge bg-light text-dark text-decoration-none p-2">
                        {{ $tag->name }}
                        <span class="text-muted">({{ $tag->posts_count }})</span>
                    </a>
                @endforeach
            </div>
        </div>
    @endif
@endsection
