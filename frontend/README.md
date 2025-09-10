# Frontend – React + TypeScript + Vite

Bu proje, React ve TypeScript kullanılarak Vite ile oluşturulmuş basit bir web arayüzüdür. Kullanıcı ve post verileri listelenir, CRUD işlemleri yapılabilir ve kullanıcı-post ilişkisi gösterilir.

## Kurulum ve Çalıştırma
1.Proje klasörüne geçilir.
'''bash
cd frontend
2.Bağımlılıklar yüklenir.
npm install
3.Uygulama başlatılır
npm run dev
Uygulama varsayılan olarak şu adreste çalışır:http://localhost:5173

### Kullanılan Teknolojiler
.React
.TypScript
.Vite
.ESLint
.Tailwind CSS(isteğe bağlı stil için)

#### Özellikler
.Ana sayfa üzerinden Users ve Posts listelerine erişim
.https://jsonplaceholder.typicode.com/ üzerinden veri çekme.
.Kullanıcı ve post listelerinde:
.Listeleme
.Ekleme
.Güncelleme
.Silme
.Postlar userId alanı üzerinden ilgili kullanıcıya bağlanır.
.Temel stil ve layout düzenlemeleri ile sade bir UI/UX

##### Tip Güvenliği ve Lint Uyumu
. Eslint kuralları uygulanmıştır.
.npx eslint src --ext .ts,.tsx` çıktısı hatasızdır.
.'any','no-unused-vars', 'no-console' gibi kurallar aktif.
.Tip güvenliği 'User' ve 'Post' interface’leri ile sağlanmıştır.



















