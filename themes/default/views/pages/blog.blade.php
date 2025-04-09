@extends('theme::layouts.main')

@section('title', 'Blog')

@section('content')
    <div class="flex flex-col md:flex-row gap-8">
        <!-- Main Content -->
        <div class="md:w-2/3">
            <div class="mb-8">
                <h1 class="text-3xl font-bold mb-4">Blog Posts</h1>
                @if (request()->has('search'))
                    <p class="text-gray-600">
                        Search results for: <span class="font-medium">{{ request('search') }}</span>
                    </p>
                @elseif(request()->has('category'))
                    <p class="text-gray-600">
                        Posts in category: <span class="font-medium">{{ request('category') }}</span>
                    </p>
                @elseif(request()->has('tag'))
                    <p class="text-gray-600">
                        Posts tagged with: <span class="font-medium">{{ request('tag') }}</span>
                    </p>
                @endif
            </div>

            @if ($posts->count() > 0)
                <div class="space-y-8">
                    @foreach ($posts as $post)
                        <article class="card">
                            <div class="flex flex-col md:flex-row gap-6">
                                @if ($post->featured_image)
                                    <div class="md:w-1/3">
                                        <img src="{{ $post->featured_image }}" alt="{{ $post->title }}"
                                            class="w-full h-48 object-cover rounded-lg">
                                    </div>
                                @endif
                                <div class="md:w-2/3">
                                    <h2 class="text-xl font-bold mb-2">
                                        <a href="{{ url('/blog/' . $post->slug) }}" class="hover:text-primary">
                                            {{ $post->title }}
                                        </a>
                                    </h2>
                                    <p class="text-gray-600 mb-4">
                                        {{ Str::limit($post->excerpt ?? $post->content, 200) }}
                                    </p>
                                    <div class="flex items-center gap-4">
                                        <span class="text-sm text-gray-600">
                                            {{ $post->published_at->format('M d, Y') }}
                                        </span>
                                        @if ($post->category)
                                            <a href="{{ url('/blog?category=' . $post->category->slug) }}"
                                                class="text-sm text-primary">
                                                {{ $post->category->name }}
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </article>
                    @endforeach
                </div>

                <div class="mt-8">
                    {{ $posts->links() }}
                </div>
            @else
                <div class="card text-center py-8">
                    <p class="text-gray-600">No posts found.</p>
                </div>
            @endif
        </div>

        <!-- Sidebar -->
        <div class="md:w-1/3">
            <!-- Search -->
            <div class="card mb-8">
                <h3 class="text-lg font-semibold mb-4">Search</h3>
                <form action="{{ url('/blog') }}" method="GET">
                    <div class="flex gap-2">
                        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search posts..."
                            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary">
                        <button type="submit" class="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <!-- Categories -->
            @if ($categories->count() > 0)
                <div class="card mb-8">
                    <h3 class="text-lg font-semibold mb-4">Categories</h3>
                    <div class="space-y-2">
                        @foreach ($categories as $category)
                            <a href="{{ url('/blog?category=' . $category->slug) }}"
                                class="flex items-center justify-between py-2 hover:text-primary">
                                <span>{{ $category->name }}</span>
                                <span class="text-sm text-gray-600">{{ $category->posts_count }}</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif

            <!-- Tags -->
            @if ($tags->count() > 0)
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Tags</h3>
                    <div class="flex flex-wrap gap-2">
                        @foreach ($tags as $tag)
                            <a href="{{ url('/blog?tag=' . $tag->slug) }}"
                                class="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                                {{ $tag->name }}
                                <span class="text-gray-600">({{ $tag->posts_count }})</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection
