# HibbuCMS

HibbuCMS adalah Content Management System modern yang dibangun dengan Laravel dan React.

## Fitur

- Manajemen Konten (Posts, Categories, Tags)
- Media Management
- User & Role Management
- Theme System
- Modern UI dengan Tailwind CSS
- Dan lainnya...

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
