# Backend-NestJS API

Bu bölümde,frontend uygulamasına veri sağlayan NestJS tabanlı backend API'yi içerir.Kullanıcılar ve gönderiler(posts) için CRUD işlemleri desteklenmektedir.Veri,servis dosyalarında hardcoded olarak tanımlanmıştır.Veritabanı entegrasyonu yoktur.

## Kurulum ve Çalıştırma
1.Bağımlılıklar yüklenir.
'''bash
npm install

2.Geliştirme sunucusu başlatılır.
'''bash
npm run start:dev

Backend varsayılan olarak http://localhost:3000 adresinde çalışır.
Frontend ile entegrasyon için CORS yapılandırması main.ts dosyasında yapılmıştır.

### Cors Yapılandırması
Frontend ile entegrasyon için main.ts dosyasında CORS aktif edilmiştir.Tüm HTTP metodlarına izin verilmiştir.

#### API Endpointleri
API endpointleri,Kullanıcılar(Users) ve Gönderiler(Posts) şeklinde modül bazlı olarak yapılandırılmıştır.Her modül,lgili CRUD işlemlerini destekler.

##### Veri Doğrulama ve Hata Yönetimi
Tüm DTO'lar class-validator ile doğrulanır(@IsString,@IsEmail,gibi).
main.ts içinde ValidationPipe global olarak tanımlanmıştır.
Geçersiz ID veya eksik veri durumunda NotFoundException fırlatılır.
Kod mimarisi modül bazlı ayrılmıştır(UsersModule,PostsModule).
//Hatalı veri gönderiminde anlamlı 400 hataları döner.


