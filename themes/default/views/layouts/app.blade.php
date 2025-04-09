<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }} - @yield('title', 'Welcome')</title>

    <!-- Theme Assets -->
    <link href="{{ asset($theme->getAssetPath('css/style.css')) }}" rel="stylesheet">

    @stack('styles')
</head>

<body>
    <header>
        @include($theme->getViewPath('components.header'))
    </header>

    <main>
        <div class="container">
            @yield('content')
        </div>
    </main>

    <footer>
        @include($theme->getViewPath('components.footer'))
    </footer>

    <!-- Theme Scripts -->
    <script src="{{ asset($theme->getAssetPath('js/main.js')) }}"></script>

    @stack('scripts')
</body>

</html>
