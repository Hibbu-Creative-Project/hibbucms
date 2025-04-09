<div class="bg-white border-top mt-5">
    <div class="container py-4">
        <div class="row g-4">
            <div class="col-md-4">
                <h5 class="fw-bold mb-3">{{ config('app.name') }}</h5>
                <p class="text-muted">Platform konten terbaik di Indonesia yang menyediakan berbagai artikel informatif
                    dan bermanfaat.</p>
                <div class="d-flex gap-2 mt-3">
                    <a href="#" class="text-muted"><i class="bi bi-facebook fs-5"></i></a>
                    <a href="#" class="text-muted"><i class="bi bi-twitter fs-5"></i></a>
                    <a href="#" class="text-muted"><i class="bi bi-instagram fs-5"></i></a>
                </div>
            </div>
            <div class="col-md-4">
                <h5 class="fw-bold mb-3">Link Cepat</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="{{ url('/') }}" class="text-decoration-none text-muted">Beranda</a>
                    </li>
                    <li class="mb-2"><a href="{{ url('/blog') }}" class="text-decoration-none text-muted">Blog</a>
                    </li>
                    <li class="mb-2"><a href="{{ url('/about') }}" class="text-decoration-none text-muted">Tentang
                            Kami</a></li>
                    <li class="mb-2"><a href="{{ url('/contact') }}"
                            class="text-decoration-none text-muted">Kontak</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h5 class="fw-bold mb-3">Hubungi Kami</h5>
                <address class="text-muted">
                    <p><i class="bi bi-geo-alt me-2"></i> Jl. Sudirman No. 123, Jakarta</p>
                    <p><i class="bi bi-envelope me-2"></i> info@hibbu.com</p>
                    <p><i class="bi bi-telephone me-2"></i> +62 21 1234 5678</p>
                </address>
            </div>
        </div>
        <hr>
        <div class="text-center text-muted">
            <p class="mb-0">&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>
</div>
