# Duble Landing Page - VPS Deployment Rehberi

Bu rehber, landing page'i VPS'de yayına almak için adım adım talimatlar içerir.

## Senaryo

- **Ana Domain:** `Dubleapp.com` (mevcut)
- **Admin Panel:** `admin.Dubleapp.com` veya subdomain (mevcut)
- **Landing Page:** `www.Dubleapp.com` veya `Dubleapp.com` (yeni)

## Yöntem 1: Ana Domain'i Landing Page Olarak Kullanma (Önerilen)

### Adım 1: VPS'e Bağlan

```bash
ssh kullanici_adi@sunucu_ip
```

### Adım 2: Nginx Kurulu mu Kontrol Et

```bash
nginx -v
```

Kurulu değilse:
```bash
# Ubuntu/Debian için
sudo apt update
sudo apt install nginx

# CentOS için
sudo yum install nginx
```

### Adım 3: Proje Klasörünü Oluştur

```bash
# Web root klasörü oluştur
sudo mkdir -p /var/www/Dubleapp.com/landing-page

# Klasör izinlerini ayarla
sudo chown -R $USER:$USER /var/www/Dubleapp.com/landing-page
sudo chmod -R 755 /var/www/Dubleapp.com
```

### Adım 4: Dosyaları VPS'e Yükle

**Bilgisayarından (yeni terminal):**

```bash
# Landing page klasörüne git
cd /Users/hasan/Desktop/Dubleapp/landing-page

# SCP ile dosyaları yükle
scp -r * kullanici_adi@sunucu_ip:/var/www/Dubleapp.com/landing-page/

# veya rsync ile (daha hızlı)
rsync -avz --progress * kullanici_adi@sunucu_ip:/var/www/Dubleapp.com/landing-page/
```

### Adım 5: Nginx Konfigürasyonu Oluştur

**VPS'de:**

```bash
# Yeni site konfigürasyonu oluştur
sudo nano /etc/nginx/sites-available/Dubleapp.com
```

**Aşağıdaki konfigürasyonu yapıştır:**

```nginx
# Landing Page - Ana Domain
server {
    listen 80;
    listen [::]:80;

    server_name Dubleapp.com www.Dubleapp.com;

    root /var/www/Dubleapp.com/landing-page;
    index index.html;

    # Logging
    access_log /var/log/nginx/Dubleapp-landing.access.log;
    error_log /var/log/nginx/Dubleapp-landing.error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Main location
    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable logging for favicon
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    # Disable logging for robots.txt
    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

### Adım 6: Mevcut Admin Panel Konfigürasyonunu Kontrol Et

```bash
# Mevcut konfigürasyonları listele
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

# Admin panel config'ini kontrol et (varsa)
sudo cat /etc/nginx/sites-available/admin.Dubleapp.com
# veya
sudo cat /etc/nginx/sites-available/Dubleapp.com
```

**Admin panel zaten subdomain'de ise (örn: admin.Dubleapp.com):**
- Admin panel konfigürasyonuna dokunma, ayrı çalışacak

**Admin panel başka bir port'ta çalışıyorsa (örn: :3000):**
- Nginx reverse proxy ile admin panel'i subdomain'e al (Adım 8'e bak)

### Adım 7: Siteyi Aktif Et

```bash
# Symbolic link oluştur
sudo ln -s /etc/nginx/sites-available/Dubleapp.com /etc/nginx/sites-enabled/

# Nginx konfigürasyonunu test et
sudo nginx -t

# Nginx'i yeniden başlat
sudo systemctl restart nginx

# Nginx durumunu kontrol et
sudo systemctl status nginx
```

### Adım 8: SSL Sertifikası Ekle (Let's Encrypt - ÜCRETSİZ)

```bash
# Certbot kur (Ubuntu/Debian)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# CentOS için
sudo yum install certbot python3-certbot-nginx

# SSL sertifikası al (otomatik Nginx konfigürasyonu)
sudo certbot --nginx -d Dubleapp.com -d www.Dubleapp.com

# Otomatik yenileme için cronjob ekle (zaten varsayılan olarak eklidir)
sudo certbot renew --dry-run
```

**Certbot aşağıdaki soruları soracak:**
1. E-posta adresinizi girin (yenileme bildirimleri için)
2. Şartları kabul edin
3. HTTP'yi HTTPS'e yönlendir mi? → **Yes (2)**

### Adım 9: DNS Ayarları (Domain Sağlayıcınızda)

Domain sağlayıcınızda (GoDaddy, Namecheap, vb.) DNS kayıtlarını güncelle:

```
A Record:
Dubleapp.com          →  VPS_IP_ADRESI
www.Dubleapp.com      →  VPS_IP_ADRESI

(Admin panel zaten varsa dokunma)
A Record (mevcut):
admin.Dubleapp.com    →  VPS_IP_ADRESI (veya mevcut IP)
```

**DNS yayılması 1-24 saat sürebilir.**

---

## Yöntem 2: Subdomain Kullanma (Ana Domain'e Dokunmadan)

Eğer `Dubleapp.com` ana domain'ine dokunmak istemiyorsan, landing page'i subdomain'de yayınla:

### Seçenekler:
- `www.Dubleapp.com` → Landing Page
- `app.Dubleapp.com` → Admin Panel
- `Dubleapp.com` → Mevcut site/yönlendirme

### Nginx Konfigürasyonu (Subdomain için)

```nginx
# Landing Page - WWW Subdomain
server {
    listen 80;
    listen [::]:80;

    server_name www.Dubleapp.com;

    root /var/www/Dubleapp.com/landing-page;
    index index.html;

    access_log /var/log/nginx/www-landing.access.log;
    error_log /var/log/nginx/www-landing.error.log;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Ana domain'i www'ye yönlendir
server {
    listen 80;
    listen [::]:80;

    server_name Dubleapp.com;

    return 301 https://www.Dubleapp.com$request_uri;
}
```

---

## Yöntem 3: Admin Panel Zaten Ana Domain'deyse

Eğer admin panel `Dubleapp.com` üzerinde çalışıyorsa:

### Çözüm A: Admin Panel'i Subdomain'e Taşı

```nginx
# Admin Panel - Subdomain
server {
    listen 80;
    server_name admin.Dubleapp.com;

    location / {
        proxy_pass http://localhost:3000;  # Admin panel portunu değiştir
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Landing Page - Ana Domain
server {
    listen 80;
    server_name Dubleapp.com www.Dubleapp.com;

    root /var/www/Dubleapp.com/landing-page;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Çözüm B: Path Bazlı Routing

```nginx
server {
    listen 80;
    server_name Dubleapp.com www.Dubleapp.com;

    # Landing page ana sayfada
    location / {
        root /var/www/Dubleapp.com/landing-page;
        try_files $uri $uri/ =404;
    }

    # Admin panel /admin path'inde
    location /admin {
        alias /var/www/Dubleapp.com/admin-panel;
        try_files $uri $uri/ /admin/index.html;

        # Eğer admin panel bir backend ise (Node.js, Python vb.)
        # proxy_pass http://localhost:3000;
    }

    # API endpoint'leri (eğer varsa)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Güvenlik ve Optimizasyon

### 1. Firewall Ayarları

```bash
# UFW firewall (Ubuntu/Debian)
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status

# Port kontrolü
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### 2. robots.txt Oluştur

```bash
nano /var/www/Dubleapp.com/landing-page/robots.txt
```

```
User-agent: *
Allow: /

Sitemap: https://Dubleapp.com/sitemap.xml
```

### 3. Sitemap Oluştur (SEO için)

```bash
nano /var/www/Dubleapp.com/landing-page/sitemap.xml
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://Dubleapp.com/</loc>
    <lastmod>2024-10-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://Dubleapp.com/pages/hakkimizda.html</loc>
    <lastmod>2024-10-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://Dubleapp.com/pages/iletisim.html</loc>
    <lastmod>2024-10-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://Dubleapp.com/pages/gizlilik-politikasi.html</loc>
    <lastmod>2024-10-21</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://Dubleapp.com/pages/kullanici-sozlesmesi.html</loc>
    <lastmod>2024-10-21</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 4. Performans İyileştirmeleri

**Nginx'te Browser Caching:**

```nginx
# /etc/nginx/nginx.conf içine ekle
http {
    # ... mevcut ayarlar

    # Browser caching
    map $sent_http_content_type $expires {
        default                    off;
        text/html                  epoch;
        text/css                   max;
        application/javascript     max;
        ~image/                    max;
        ~font/                     max;
    }

    expires $expires;
}
```

---

## Hızlı Deployment Scripti

Gelecekte güncellemeler için script:

```bash
nano deploy.sh
```

```bash
#!/bin/bash

# Duble Landing Page Deployment Script

echo "🚀 Duble Landing Page Deployment Başlatılıyor..."

# Değişkenler
LOCAL_DIR="/Users/hasan/Desktop/Dubleapp/landing-page"
REMOTE_USER="kullanici_adi"
REMOTE_HOST="sunucu_ip"
REMOTE_DIR="/var/www/Dubleapp.com/landing-page"

# Dosyaları yükle
echo "📦 Dosyalar yükleniyor..."
rsync -avz --progress \
    --exclude='.DS_Store' \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='deploy.sh' \
    "$LOCAL_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

# Nginx'i yeniden yükle
echo "🔄 Nginx yenileniyor..."
ssh "$REMOTE_USER@$REMOTE_HOST" "sudo systemctl reload nginx"

echo "✅ Deployment tamamlandı!"
echo "🌐 Site: https://Dubleapp.com"
```

**Script'i çalıştırılabilir yap:**

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Sorun Giderme

### 1. Nginx Hata Logları

```bash
# Hataları kontrol et
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/Dubleapp-landing.error.log
```

### 2. Nginx Test

```bash
# Konfigürasyon test et
sudo nginx -t

# Syntax hatası varsa düzelt
sudo nano /etc/nginx/sites-available/Dubleapp.com
```

### 3. Port Kontrolü

```bash
# Hangi port'lar kullanılıyor?
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Veya
sudo ss -tlnp | grep :80
```

### 4. DNS Propagation Kontrolü

```bash
# Online araçlar:
# https://www.whatsmydns.net/
# https://dnschecker.org/

# Terminal'den:
nslookup Dubleapp.com
dig Dubleapp.com
```

### 5. SSL Sertifika Yenileme

```bash
# Manuel yenileme
sudo certbot renew

# Otomatik yenileme durumu
sudo systemctl status certbot.timer
```

---

## Önerilen Yapı (En İyi Senaryo)

```
Dubleapp.com              → Landing Page (Ana sayfa)
www.Dubleapp.com          → Landing Page (yönlendirme)
admin.Dubleapp.com        → Admin Panel
api.Dubleapp.com          → Backend API (gelecekte)
```

**Nginx Konfigürasyonu:**

```nginx
# Landing Page
server {
    listen 443 ssl http2;
    server_name Dubleapp.com www.Dubleapp.com;

    ssl_certificate /etc/letsencrypt/live/Dubleapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/Dubleapp.com/privkey.pem;

    root /var/www/Dubleapp.com/landing-page;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

# Admin Panel
server {
    listen 443 ssl http2;
    server_name admin.Dubleapp.com;

    ssl_certificate /etc/letsencrypt/live/admin.Dubleapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.Dubleapp.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        # proxy ayarları...
    }
}

# HTTP'den HTTPS'e yönlendirme
server {
    listen 80;
    server_name Dubleapp.com www.Dubleapp.com admin.Dubleapp.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Checklist

- [ ] VPS'e SSH bağlantısı kuruldu
- [ ] Nginx kuruldu ve çalışıyor
- [ ] Proje klasörü oluşturuldu
- [ ] Dosyalar VPS'e yüklendi
- [ ] Nginx konfigürasyonu oluşturuldu
- [ ] Admin panel konfigürasyonu kontrol edildi
- [ ] Site aktif edildi (`sites-enabled`)
- [ ] Nginx test edildi (`nginx -t`)
- [ ] Nginx yeniden başlatıldı
- [ ] DNS kayıtları güncellendi
- [ ] SSL sertifikası kuruldu
- [ ] HTTPS çalışıyor
- [ ] Otomatik yönlendirmeler test edildi
- [ ] Tüm sayfalar kontrol edildi
- [ ] robots.txt ve sitemap.xml eklendi
- [ ] Güvenlik ayarları yapıldı

---

## Yardım ve Destek

Deployment sırasında sorun yaşarsan:

1. Nginx error log'larını kontrol et
2. Firewall ayarlarını kontrol et
3. DNS propagation'ı bekle (24 saat)
4. Port çakışmalarını kontrol et

**Hızlı Test:**
```bash
curl -I https://Dubleapp.com
curl -I https://www.Dubleapp.com
curl -I https://admin.Dubleapp.com
```

Başarılar! 🚀
