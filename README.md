# HibbuCMS

HibbuCMS adalah Content Management System modern yang dibangun dengan Laravel dan React.

## Fitur

- Manajemen Konten (Posts, Categories, Tags)
- Media Management
- User & Role Management
- Theme System
- Menu Builder System
- Modern UI dengan Tailwind CSS
- Dan lainnya...

## Menu Builder System

HibbuCMS menyediakan sistem menu builder yang fleksibel, memungkinkan Anda untuk membuat dan mengelola menu navigasi dengan mudah.

### Cara Penggunaan Menu Builder

1. **Membuat Menu di Admin Panel**
   ```php
   use App\Models\Menu;
   use App\Models\MenuItem;

   // Membuat menu header
   $headerMenu = Menu::create([
       'name' => 'Header Menu',
       'location' => 'header', // header atau footer
       'is_active' => true
   ]);

   // Menambahkan item menu
   $headerMenu->items()->create([
       'title' => 'Home',
       'url' => '/',
       'order' => 1,
       'target' => '_self' // _self atau _blank
   ]);

   // Membuat dropdown menu
   $services = $headerMenu->items()->create([
       'title' => 'Services',
       'url' => '/services',
       'order' => 2
   ]);

   // Menambahkan submenu
   $services->children()->create([
       'title' => 'Web Development',
       'url' => '/services/web-development',
       'order' => 1
   ]);
   ```

2. **Struktur Database**
   ```php
   // Menu Migration
   Schema::create('menus', function (Blueprint $table) {
       $table->id();
       $table->string('name');
       $table->string('location')->default('header');
       $table->boolean('is_active')->default(true);
       $table->timestamps();
   });

   // Menu Items Migration
   Schema::create('menu_items', function (Blueprint $table) {
       $table->id();
       $table->foreignId('menu_id')->constrained()->onDelete('cascade');
       $table->foreignId('parent_id')->nullable()->constrained('menu_items')->onDelete('cascade');
       $table->string('title');
       $table->string('url');
       $table->string('target')->default('_self');
       $table->string('type')->default('custom');
       $table->integer('order')->default(0);
       $table->timestamps();
   });
   ```

3. **Menggunakan Menu di Theme**

   Menu builder mengembalikan array data yang bisa digunakan dengan berbagai framework CSS. Menu tersedia dalam dua variabel view:
   - `$headerMenu` untuk menu di header
   - `$footerMenu` untuk menu di footer

   Struktur data menu:
   ```php
   [
       [
           'id' => 1,
           'title' => 'Menu Item',
           'url' => '/path/to/page',
           'target' => '_self',
           'type' => 'custom',
           'order' => 0,
           'child' => [
               [
                   'id' => 2,
                   'title' => 'Submenu Item',
                   'url' => '/path/to/subpage',
                   'target' => '_blank',
                   'type' => 'custom',
                   'order' => 0,
                   'child' => []
               ]
           ]
       ]
   ]
   ```

### Implementasi Menu di Theme

#### 1. Bootstrap 5 (Default Theme)
```php
@if($headerMenu && is_array($headerMenu) && count($headerMenu) > 0)
<ul class="navbar-nav">
    @foreach($headerMenu as $item)
    <li class="nav-item {{ !empty($item['child']) ? 'dropdown' : '' }}">
        @if(!empty($item['child']))
            <a class="nav-link dropdown-toggle" href="{{ $item['url'] }}" role="button" data-bs-toggle="dropdown">
                {{ $item['title'] }}
            </a>
            <ul class="dropdown-menu">
                @foreach($item['child'] as $child)
                    <li>
                        <a class="dropdown-item" href="{{ $child['url'] }}" target="{{ $child['target'] }}">
                            {{ $child['title'] }}
                        </a>
                    </li>
                @endforeach
            </ul>
        @else
            <a class="nav-link" href="{{ $item['url'] }}" target="{{ $item['target'] }}">
                {{ $item['title'] }}
            </a>
        @endif
    </li>
    @endforeach
</ul>
@endif
```

#### 2. Tailwind CSS
```php
@if($headerMenu && is_array($headerMenu) && count($headerMenu) > 0)
<ul class="flex space-x-4">
    @foreach($headerMenu as $item)
    <li class="relative group">
        @if(!empty($item['child']))
            <a href="{{ $item['url'] }}" class="px-4 py-2 text-gray-700 hover:text-blue-600 inline-flex items-center">
                {{ $item['title'] }}
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </a>
            <ul class="absolute left-0 hidden pt-2 group-hover:block w-48 bg-white shadow-lg rounded-md">
                @foreach($item['child'] as $child)
                    <li>
                        <a href="{{ $child['url'] }}" target="{{ $child['target'] }}" 
                           class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {{ $child['title'] }}
                        </a>
                    </li>
                @endforeach
            </ul>
        @else
            <a href="{{ $item['url'] }}" target="{{ $item['target'] }}" 
               class="px-4 py-2 text-gray-700 hover:text-blue-600">
                {{ $item['title'] }}
            </a>
        @endif
    </li>
    @endforeach
</ul>
@endif
```

#### 3. CSS Native
```php
@if($headerMenu && is_array($headerMenu) && count($headerMenu) > 0)
<ul class="main-menu">
    @foreach($headerMenu as $item)
    <li class="menu-item {{ !empty($item['child']) ? 'has-submenu' : '' }}">
        <a href="{{ $item['url'] }}" target="{{ $item['target'] }}">{{ $item['title'] }}</a>
        @if(!empty($item['child']))
            <ul class="submenu">
                @foreach($item['child'] as $child)
                    <li class="submenu-item">
                        <a href="{{ $child['url'] }}" target="{{ $child['target'] }}">{{ $child['title'] }}</a>
                    </li>
                @endforeach
            </ul>
        @endif
    </li>
    @endforeach
</ul>
@endif
```

Dengan CSS:
```css
.main-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.menu-item {
    position: relative;
    padding: 10px;
}

.has-submenu:hover .submenu {
    display: block;
}

.submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    min-width: 200px;
    list-style: none;
    padding: 0;
}

.submenu-item a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: inherit;
}
```

### Fitur Menu Builder

1. **Lokasi Menu**
   - Header (`header`)
   - Footer (`footer`)
   - Sidebar (`sidebar`)
   - Custom locations

2. **Tipe Menu Item**
   - Custom URL
   - Page
   - Category
   - Tag
   - Post

3. **Atribut Menu Item**
   - Title (judul menu)
   - URL (link tujuan)
   - Target (`_self` atau `_blank`)
   - Order (urutan menu)
   - Parent (untuk submenu)

4. **Fitur Tambahan**
   - Drag & drop ordering
   - Unlimited nested submenu
   - Active state detection
   - Mobile responsive
   - SEO friendly

## Theme System

HibbuCMS memiliki sistem tema yang fleksibel, memungkinkan Anda untuk mengkustomisasi tampilan website dengan mudah.

### Struktur Tema

Setiap tema harus mengikuti struktur folder berikut:

```themes/
  ├── your-theme/              # Folder tema Anda
  │   ├── theme.json          # Konfigurasi tema (wajib)
  │   ├── screenshot.png      # Preview tema (opsional)
  │   ├── views/             # Template views
  │   │   ├── layouts/      # Layout templates
  │   │   ├── components/   # Reusable components
  │   │   └── pages/        # Page templates
  │   └── assets/           # Asset statis
  │       ├── css/         # File CSS
  │       ├── js/          # File JavaScript
  │       └── images/      # Gambar tema
```

### Konfigurasi Tema (theme.json)

Setiap tema harus memiliki file `theme.json` dengan struktur minimal berikut:

```json
{
    "name": "Nama Tema Anda",
    "slug": "nama-tema-anda",
    "version": "1.0.0",
    "description": "Deskripsi tema Anda",
    "author": "Nama Anda",
    "requires": {
        "cms_version": "^1.0.0"
    },
    "settings": {
        "colors": {
            "primary": "#007bff",
            "secondary": "#6c757d"
        },
        "typography": {
            "primary_font": "Inter",
            "secondary_font": "Roboto"
        },
        "layout": {
            "container_width": "1200px",
            "sidebar_position": "right"
        }
    }
}
```

### Cara Menambahkan Tema

Ada dua cara untuk menambahkan tema baru:

1. Upload Tema (ZIP)
   - Siapkan tema Anda dalam format ZIP dengan struktur yang benar
   - Buka halaman Themes di admin panel
   - Klik tombol "Upload Theme"
   - Pilih file ZIP tema Anda
   - Klik "Upload"

2. Manual Installation
   - Buat folder baru di `themes/`
   - Tambahkan semua file tema Anda
   - Pastikan ada file `theme.json`
   - Di admin panel, klik "Scan for Themes"

### Mengaktifkan Tema

1. Buka halaman Themes di admin panel
2. Cari tema yang ingin diaktifkan
3. Klik tombol "Activate Theme"

### Menghapus Tema

1. Buka halaman Themes di admin panel
2. Cari tema yang ingin dihapus
3. Klik tombol hapus (icon trash)
4. Konfirmasi penghapusan

**Catatan**: Tema yang sedang aktif tidak dapat dihapus.

### Pengembangan Tema

Untuk membuat tema baru:

1. Buat struktur folder sesuai panduan di atas
2. Buat file `theme.json` dengan konfigurasi yang diperlukan
3. Kembangkan template views di folder `views/`
4. Tambahkan asset yang diperlukan di folder `assets/`
5. Zip tema Anda atau letakkan langsung di folder `themes/`

### Keamanan

- File ZIP tema dibatasi maksimal 10MB
- Hanya file ZIP yang diizinkan untuk upload
- Validasi struktur tema saat upload/scan
- Tema aktif tidak dapat dihapus
- Pembersihan otomatis file temporary

## Instalasi

[Instruksi instalasi CMS Anda di sini]

## Lisensi

[Informasi lisensi CMS Anda di sini] 
