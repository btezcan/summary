# Örnekler

Sitedeki her kod örneği ve her çıktı bu klasörden gelir. Sayfalar kodu elle
kopyalamaz; `<Sample>`, `<Predict>`, `<Mistake>`, `<Compare>` ve `<Quiz>`
bileşenleri dosyaları derleme zamanında okur.

## Yapı

```
samples/<bolum-slug>/<ornek-adi>/
  Program.cs              tek dosyalık uygulama (dotnet run Program.cs)
  input.txt               (isteğe bağlı) klavyeden girilecek metin
  sample.json             (isteğe bağlı) ayarlar
  expected-output.txt     standart çıktı            ┐
  expected-error.txt      derleme hatası / istisna  ├ verify-samples üretir
  expected-warnings.txt   derleyici uyarıları       ┘
```

Birden fazla dosya gereken örneklerde klasöre bir `.csproj` konur; dosyalar
`<Sample file="Student.cs">` ile gösterilir. xUnit örnekleri de bu şekildedir.

## sample.json

| Ayar | Anlamı |
|---|---|
| `"expect": "compile-error"` | Derleme hatası beklenir (Mistake'in hatalı tarafı). |
| `"expect": "exception"` | Yakalanmamış istisna beklenir. |
| `"expect": "test"` | Proje `dotnet test` ile çalıştırılır. |
| `"culture": true` | Kültür verisi açık. Örnek kültürü kodda açıkça ayarlamalı. |
| `"langVersion": "14"` | C# 12'den yeni özellik. Sayfada `<Note type="version">` ekleyin. |
| `"buildOnly": true` | Derlenir ama çalıştırılmaz (ör. internet gerektirir). |
| `"normalize": [...]` | Değişken çıktıyı sabitler: `{ "pattern": "\\d+ ms", "replace": "<süre> ms" }`. |
| `"timeoutMs": 5000` | Varsayılan 60 sn yerine. |

## Kurallar

- Varsayılan dil sürümü **C# 12** (`Directory.Build.props`). Daha yeni bir özellik
  derleme hatası verir; bilerek kullanılıyorsa `langVersion` ile açılır.
- Varsayılan kültür **invariant**: `3.5` yazılır, `3,5` değil. Kültürle ilgili
  örneklerde `"culture": true` ve kodda `new CultureInfo("tr-TR")` kullanın.
- Beklenmeyen bir derleyici uyarısı doğrulamayı başarısız yapar. Uyarı örneğin
  konusuysa `expected-warnings.txt` içinde saklanır ve sayfada gösterilir.
- `// #region ad` … `// #endregion` ile dosyanın bir kısmı gösterilebilir.

## Komutlar

```sh
npm run verify                              # hepsini doğrula
npm run verify -- --filter turler           # bir bölüm
npm run verify -- --filter turler/yeni --update   # yeni örneğin çıktısını kaydet
```

`--update` çıktıyı körü körüne kaydeder: kaydetmeden önce çıktının doğru
olduğunu mutlaka okuyun.
