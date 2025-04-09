@extends('theme::layouts.main')

@section('title', 'Blog')

@section('content')
    <div class="row g-4">
        <!-- Main Content -->
        <div class="col-lg-8">
            <div class="mb-4">
                <h1 class="fw-bold mb-3">Artikel Blog</h1>
                @if (request()->has('search'))
                    <p class="text-muted">
                        Hasil pencarian untuk: <span class="fw-medium">{{ request('search') }}</span>
                    </p>
                @elseif(request()->has('category'))
                    <p class="text-muted">
                        Artikel dalam kategori: <span class="fw-medium">{{ request('category') }}</span>
                    </p>
                @elseif(request()->has('tag'))
                    <p class="text-muted">
                        Artikel dengan tag: <span class="fw-medium">{{ request('tag') }}</span>
                    </p>
                @endif
            </div>

            @if ($posts->count() > 0)
                <div class="mb-4">
                    @foreach ($posts as $post)
                        <article class="card mb-4 shadow-sm">
                            <div class="card-body">
                                <div class="row g-3">
                                    @if ($post->featured_image)
                                        <div class="col-md-4">
                                            <img src="{{ $post->featured_image }}" alt="{{ $post->title }}"
                                                class="img-fluid rounded"
                                                style="object-fit: cover; height: 200px; width: 100%;">
                                        </div>
                                    @endif
                                    <div class="col-md-{{ $post->featured_image ? '8' : '12' }}">
                                        <h2 class="fs-4 fw-bold mb-2">
                                            <a href="{{ url('/blog/' . $post->slug) }}"
                                                class="text-decoration-none text-dark">
                                                {{ $post->title }}
                                            </a>
                                        </h2>
                                        <p class="text-muted mb-3">
                                            {{ Str::limit($post->excerpt ?? $post->content, 200) }}
                                        </p>
                                        <div class="d-flex align-items-center gap-3">
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
                        </article>
                    @endforeach
                </div>

                <div class="d-flex justify-content-center">
                    {{ $posts->links() }}
                </div>
            @else
                <div class="card text-center py-5 mb-4">
                    <div class="card-body">
                        <p class="text-muted">Tidak ada artikel yang ditemukan.</p>
                    </div>
                </div>
            @endif
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
            <!-- Search -->
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h3 class="fs-5 fw-bold mb-3">Pencarian</h3>
                    <form action="{{ url('/blog') }}" method="GET">
                        <div class="input-group">
                            <input type="text" name="search" value="{{ request('search') }}"
                                placeholder="Cari artikel..." class="form-control">
                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Categories -->
            @if ($categories->count() > 0)
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h3 class="fs-5 fw-bold mb-3">Kategori</h3>
                        <div class="list-group list-group-flush">
                            @foreach ($categories as $category)
                                <a href="{{ url('/blog?category=' . $category->slug) }}"
                                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <span>{{ $category->name }}</span>
                                    <span class="badge bg-light text-dark rounded-pill">{{ $category->posts_count }}</span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endif

            <!-- Tags -->
            @if ($tags->count() > 0)
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h3 class="fs-5 fw-bold mb-3">Tag</h3>
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
                </div>
            @endif
        </div>
    </div>
@endsection
