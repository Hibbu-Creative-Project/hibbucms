@extends('theme::layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <article class="max-w-4xl mx-auto">
            @if ($page->featured_image)
                <img src="{{ asset('storage/' . $page->featured_image) }}" alt="{{ $page->title }}"
                    class="w-full h-96 object-cover rounded-lg mb-8">
            @endif

            <h1 class="text-4xl font-bold mb-6">{{ $page->title }}</h1>

            <div class="prose prose-lg max-w-none">
                {!! $page->content !!}
            </div>
        </article>
    </div>
@endsection
