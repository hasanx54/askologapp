# Aşkolog - Dating App Landing Page

Türkiye'nin en yenilikçi flört ve arkadaşlık uygulaması için modern, profesyonel ve tamamen responsive landing page.

## Proje Hakkında

Bu proje, Aşkolog dating uygulaması için hazırlanmış tam kapsamlı bir landing page ve yasal dokümantasyon paketidir. Modern web tasarım prensipleri, kullanıcı deneyimi odaklı tasarım ve Türkiye yasal mevzuatına tam uyumlu içeriklerle hazırlanmıştır.

## Özellikler

### Ana Sayfa Bölümleri
- ✅ **Hero Section** - Etkileyici giriş alanı, animasyonlu arka plan ve telefon mockup
- ✅ **Özellikler** - 6 temel özellik kartı (AI eşleştirme, güvenlik, video chat, vb.)
- ✅ **Nasıl Çalışır** - 3 adımlı kullanım süreci
- ✅ **Başarı Hikayeleri** - Kullanıcı yorumları ve değerlendirmeleri
- ✅ **Fiyatlandırma** - 3 farklı paket (Ücretsiz, Premium, VIP)
- ✅ **İndirme** - App Store ve Google Play butonları
- ✅ **SSS** - Sıkça sorulan sorular (açılır-kapanır)
- ✅ **Footer** - Tüm önemli linkler ve sosyal medya

### Yasal Sayfalar
- ✅ **Gizlilik Politikası** - KVKK ve GDPR uyumlu
- ✅ **Kullanıcı Sözleşmesi** - Detaylı şartlar ve koşullar
- ✅ **Çerez Politikası** - Çerez kullanımı ve yönetimi
- ✅ **KVKK Aydınlatma Metni** - 6698 sayılı kanuna tam uyum

### Ek Sayfalar
- ✅ **Hakkımızda** - Şirket hikayesi, misyon, vizyon, değerler, ekip
- ✅ **İletişim** - Çalışan iletişim formu, bilgiler, harita

## Teknolojiler

- **HTML5** - Semantik ve erişilebilir markup
- **CSS3** - Modern CSS özellikleri, animations, gradients
- **JavaScript (Vanilla)** - Framework bağımsız, temiz kod
- **Font Awesome 6.4.0** - İkon seti
- **Google Fonts** - Poppins & Playfair Display
- **AOS Library** - Scroll animasyonları

## Dosya Yapısı

```
landing-page/
├── index.html                 # Ana sayfa
├── css/
│   └── style.css             # Ana CSS dosyası (27KB+)
├── js/
│   └── main.js               # Ana JavaScript dosyası
├── pages/
│   ├── gizlilik-politikasi.html
│   ├── kullanici-sozlesmesi.html
│   ├── cerez-politikasi.html
│   ├── kvkk.html
│   ├── iletisim.html
│   └── hakkimizda.html
├── assets/
│   └── images/               # Görseller için (şu an placeholder)
└── README.md                 # Bu dosya
```

## Kurulum

1. Projeyi klonlayın veya indirin:
```bash
cd landing-page
```

2. Bir web sunucusu ile açın:
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx http-server

# VS Code Live Server extension ile
# Sağ tık > Open with Live Server
```

3. Tarayıcınızda açın:
```
http://localhost:8000
```

## Özelleştirme

### Renkleri Değiştirme

`css/style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #FF4458;        /* Ana renk */
    --primary-dark: #E63946;         /* Koyu ana renk */
    --primary-light: #FF6B7A;        /* Açık ana renk */
    --secondary-color: #FF6B9D;      /* İkincil renk */
    /* ... diğer renkler */
}
```

### İçerik Güncelleme

- **Logo**: `index.html` içinde `.logo` bölümünü düzenleyin
- **Metinler**: HTML dosyalarında ilgili bölümleri güncelleyin
- **İstatistikler**: Hero ve Features bölümlerindeki sayıları değiştirin
- **Sosyal Medya**: Footer'daki sosyal medya linklerini güncelleyin

### Görseller Ekleme

`assets/images/` klasörüne görselleri ekleyin ve HTML'de referans verin:

```html
<img src="assets/images/your-image.png" alt="Açıklama">
```

## Responsive Tasarım

Tüm sayfalar 3 temel breakpoint'te test edilmiştir:

- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1024px
- **Mobil**: 320px - 767px

## JavaScript Özellikleri

- ✅ Smooth scroll navigation
- ✅ Sticky navbar (kaydırmada)
- ✅ Hamburger menü (mobil)
- ✅ FAQ accordion
- ✅ Scroll to top button
- ✅ Form validation (iletişim formu)
- ✅ Cookie consent banner
- ✅ Parallax efektler
- ✅ Counter animasyonları
- ✅ Testimonial carousel
- ✅ Interactive phone mockup

## Performans Optimizasyonları

- Lazy loading images için hazır yapı
- Minimal JavaScript dependency
- Optimize edilmiş CSS (tek dosya)
- CDN kullanımı (Font Awesome, Google Fonts)
- Async script loading

## Tarayıcı Desteği

- ✅ Chrome/Edge (son 2 versiyon)
- ✅ Firefox (son 2 versiyon)
- ✅ Safari (son 2 versiyon)
- ✅ Opera (son 2 versiyon)
- ⚠️ IE11 (kısmi destek, polyfill gerekebilir)

## SEO Özellikleri

- ✅ Semantic HTML5 kullanımı
- ✅ Meta description her sayfada
- ✅ Structured data için hazır
- ✅ Alt text'ler (görseller eklendiğinde)
- ✅ Sitemap için hazır yapı
- ✅ Clean URL'ler

## Erişilebilirlik (Accessibility)

- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Proper heading hierarchy (h1-h6)
- ✅ Skip to content link
- ✅ Focus states
- ✅ Color contrast (WCAG AA uyumlu)

## Güvenlik

- ✅ XSS koruması için input sanitization hazır
- ✅ HTTPS kullanımı önerilir
- ✅ Content Security Policy için hazır
- ✅ Secure headers kullanımı önerilir

## Yapılacaklar (İyileştirmeler)

- [ ] Gerçek görseller eklemek
- [ ] Backend entegrasyonu (form submission)
- [ ] Google Maps entegrasyonu (iletişim sayfası)
- [ ] Google Analytics ekleme
- [ ] Favicon ve app icons oluşturma
- [ ] PWA desteği ekleme
- [ ] Dark mode toggle
- [ ] Çoklu dil desteği (TR/EN)
- [ ] Blog bölümü
- [ ] Newsletter signup

## Lisans

Bu proje Aşkolog için özel olarak geliştirilmiştir.

## İletişim

Proje hakkında sorularınız için:
- Email: info@askolog.com
- Web: askolog.com

## Versiyon

**v1.0.0** - İlk sürüm (21 Ekim 2024)

### Changelog
- Ana landing page oluşturuldu
- Tüm yasal sayfalar eklendi
- İletişim ve Hakkımızda sayfaları hazırlandı
- Responsive tasarım tamamlandı
- JavaScript interaktivite eklendi

---

**Not**: Bu bir template/starter projedir. Production'a almadan önce:
1. Tüm placeholder metinleri güncelleyin
2. Gerçek görseller ekleyin
3. Backend form submission ekleyin
4. Analytics ekleyin
5. SSL sertifikası alın
6. Güvenlik testleri yapın

**Geliştirici**: Claude AI tarafından oluşturulmuştur.
