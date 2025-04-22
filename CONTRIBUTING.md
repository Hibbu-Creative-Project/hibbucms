# Panduan Kontribusi HibbuCMS

Terima kasih telah mempertimbangkan untuk berkontribusi pada HibbuCMS! Kami sangat menghargai setiap kontribusi dari komunitas.

## 🤝 Cara Berkontribusi

### 1. Fork & Clone
- Fork repositori HibbuCMS
- Clone fork Anda ke lokal
```bash
git clone https://github.com/username-anda/hibbucms.git
cd hibbucms
```

### 2. Setup Development Environment
```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### 3. Buat Branch
```bash
git checkout -b nama-fitur
# atau
git checkout -b fix-issue
```

### 4. Coding Guidelines
- Ikuti PSR-12 untuk PHP
- Gunakan TypeScript untuk kode frontend
- Pastikan kode ter-format dengan Prettier
- Tulis test untuk fitur baru
- Pastikan semua test berjalan
```bash
php artisan test
npm run test
```

### 5. Commit Guidelines
Format commit message:
```
type(scope): description

[optional body]
[optional footer]
```

Types:
- feat: Fitur baru
- fix: Bug fix
- docs: Perubahan dokumentasi
- style: Formatting, missing semicolons, dll
- refactor: Refactoring kode
- test: Menambah/memperbaiki test
- chore: Perubahan build process atau tools

### 6. Submit Pull Request
- Push ke fork Anda
- Buat Pull Request ke repositori utama
- Deskripsikan perubahan dengan jelas
- Link ke issue terkait jika ada

## 🐛 Melaporkan Bug
- Gunakan template bug report
- Sertakan langkah-langkah reproduksi
- Sertakan expected vs actual behavior
- Sertakan screenshot jika memungkinkan

## 💡 Mengusulkan Fitur
- Gunakan template feature request
- Jelaskan use case
- Jelaskan solusi yang diusulkan
- Pertimbangkan alternatif yang telah Anda pikirkan

## 📝 Dokumentasi
- Dokumentasi berada di folder `/docs`
- Gunakan Markdown
- Ikuti panduan penulisan dokumentasi

## ⚖️ Lisensi
Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

## 💬 Pertanyaan?
- Buat issue di GitHub
- Tanya di [Discord](https://discord.gg/hibbucms)
- Kirim email ke maintainers@hibbucms.com 
