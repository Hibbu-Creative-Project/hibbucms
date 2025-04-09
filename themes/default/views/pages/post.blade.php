@extends('theme::layouts.main')

@section('title', $post->title)

@section('content')
    <article class="row justify-content-center">
        <div class="col-lg-10">
            <!-- Post Header -->
            <header class="mb-4 text-center">
                <h1 class="fw-bold mb-3">{{ $post->title }}</h1>
                <div class="d-flex justify-content-center gap-3 text-muted">
                    @if ($post->published_at)
                        <time datetime="{{ $post->published_at->format('Y-m-d') }}">
                            {{ $post->published_at->format('d F Y') }}
                        </time>
                    @else
                        <span>Draft</span>
                    @endif
                    @if ($post->category)
                        <span>•</span>
                        <a href="{{ url('/blog?category=' . $post->category->slug) }}"
                            class="text-primary text-decoration-none">
                            {{ $post->category->name }}
                        </a>
                    @endif
                </div>
            </header>

            <!-- Featured Image -->
            @if ($post->featured_image)
                <div class="mb-4 text-center">
                    <img src="{{ $post->featured_image }}" alt="{{ $post->title }}" class="img-fluid rounded shadow"
                        style="max-height: 500px; object-fit: cover;">
                </div>
            @endif

            <!-- Post Content -->
            <div class="post-content mb-5">
                {!! $post->content !!}
            </div>

            <!-- Tags -->
            @if ($post->tags->count() > 0)
                <div class="mb-4">
                    <h3 class="fs-5 fw-bold mb-3">Tag</h3>
                    <div class="d-flex flex-wrap gap-2">
                        @foreach ($post->tags as $tag)
                            <a href="{{ url('/blog?tag=' . $tag->slug) }}"
                                class="badge bg-light text-dark text-decoration-none p-2">
                                {{ $tag->name }}
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif

            <!-- Share Buttons -->
            <div class="d-flex align-items-center gap-3 mb-5 border-top border-bottom py-3">
                <span class="fw-semibold">Bagikan:</span>
                <a href="https://twitter.com/intent/tweet?url={{ urlencode(url()->current()) }}&text={{ urlencode($post->title) }}"
                    target="_blank" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-twitter me-1"></i> Twitter
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(url()->current()) }}" target="_blank"
                    class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-facebook me-1"></i> Facebook
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url={{ urlencode(url()->current()) }}&title={{ urlencode($post->title) }}"
                    target="_blank" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-linkedin me-1"></i> LinkedIn
                </a>
                <a href="https://api.whatsapp.com/send?text={{ urlencode($post->title . ' ' . url()->current()) }}"
                    target="_blank" class="btn btn-sm btn-outline-success">
                    <i class="bi bi-whatsapp me-1"></i> WhatsApp
                </a>
            </div>

            <!-- Related Posts -->
            @if ($relatedPosts->count() > 0)
                <div class="mt-5">
                    <h2 class="fw-bold mb-4">Artikel Terkait</h2>
                    <div class="row g-4">
                        @foreach ($relatedPosts as $relatedPost)
                            <div class="col-md-6 col-lg-4">
                                <div class="card h-100 shadow-sm">
                                    @if ($relatedPost->featured_image)
                                        <img src="{{ $relatedPost->featured_image }}" alt="{{ $relatedPost->title }}"
                                            class="card-img-top" style="height: 200px; object-fit: cover;">
                                    @endif
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            <a href="{{ url('/blog/' . $relatedPost->slug) }}"
                                                class="text-decoration-none text-dark">
                                                {{ $relatedPost->title }}
                                            </a>
                                        </h5>
                                        <p class="card-text text-muted">
                                            {{ Str::limit($relatedPost->excerpt ?? $relatedPost->content, 100) }}
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <small class="text-muted">
                                                @if ($relatedPost->published_at)
                                                    {{ $relatedPost->published_at->format('d M Y') }}
                                                @else
                                                    Draft
                                                @endif
                                            </small>
                                            @if ($relatedPost->category)
                                                <a href="{{ url('/blog?category=' . $relatedPost->category->slug) }}"
                                                    class="badge bg-light text-primary text-decoration-none">
                                                    {{ $relatedPost->category->name }}
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
        </div>
    </article>
@endsection

@push('styles')
    <style>
        .post-content {
            font-size: 1.1rem;
            line-height: 1.8;
        }

        .post-content img {
            max-width: 100%;
            height: auto;
            margin: 2rem auto;
            display: block;
            border-radius: 0.5rem;
        }

        .post-content h2 {
            font-size: 1.8rem;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            font-weight: 700;
        }

        .post-content h3 {
            font-size: 1.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .post-content p {
            margin-bottom: 1.25rem;
        }

        .post-content ul,
        .post-content ol {
            margin: 1.25rem 0;
            padding-left: 1.5rem;
        }

        .post-content li {
            margin: 0.5rem 0;
        }

        .post-content blockquote {
            border-left: 4px solid #dee2e6;
            padding: 0.5rem 0 0.5rem 1.5rem;
            margin: 1.5rem 0;
            color: #6c757d;
            font-style: italic;
        }

        .post-content code {
            background: #f8f9fa;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
        }

        .post-content pre {
            background: #212529;
            color: #f8f9fa;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }

        .post-content pre code {
            background: transparent;
            padding: 0;
            color: inherit;
        }
    </style>
@endpush
