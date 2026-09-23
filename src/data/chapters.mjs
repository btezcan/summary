// Bölüm listesi: kenar çubuğu (astro.config.mjs) ve ana sayfadaki ilerleme
// listesi bu tek kaynaktan üretilir. Yeni bölüm eklerken yalnızca burayı güncelle.

/**
 * @typedef {{ slug: string, label: string }} Chapter
 * @typedef {{ label: string, chapters: Chapter[] }} ChapterGroup
 */

/** @type {ChapterGroup[]} */
export const chapterGroups = [
	{
		label: 'Temeller',
		chapters: [
			{ slug: 'baslarken', label: 'Başlarken' },
			{ slug: 'turler', label: 'Türler ve Değişkenler' },
			{ slug: 'operatorler', label: 'Operatörler' },
			{ slug: 'stringler', label: 'Stringler' },
			{ slug: 'kontrol-akisi', label: 'Kontrol Akışı' },
			{ slug: 'metotlar', label: 'Metotlar' },
			{ slug: 'koleksiyonlar', label: 'Diziler ve Koleksiyonlar' },
		],
	},
	{
		label: 'Nesneler',
		chapters: [
			{ slug: 'siniflar', label: 'Sınıflar ve Nesneler' },
			{ slug: 'record-struct-enum', label: 'Record, Struct, Enum' },
			{ slug: 'kalitim', label: 'Kalıtım ve Çok Biçimlilik' },
		],
	},
	{
		label: 'Modern C#',
		chapters: [
			{ slug: 'null-guvenligi', label: 'Null Güvenliği' },
			{ slug: 'hatalar', label: 'Hatalar (Exceptions)' },
			{ slug: 'generics-lambda', label: 'Generics, Delegate ve Lambda' },
			{ slug: 'linq', label: 'LINQ' },
			{ slug: 'dosyalar', label: 'Dosyalar ve using' },
			{ slug: 'async', label: 'async / await' },
		],
	},
	{
		label: 'Araçlar ve Pratik',
		chapters: [
			{ slug: 'hata-ayiklama-test', label: 'Hata Ayıklama ve Test' },
			{ slug: 'yapay-zeka', label: 'Yapay Zekâ ile Öğrenmek' },
		],
	},
];

/** Kenar çubuğunda ayrı durur; ilerleme listesine girmez. */
export const extraPages = [
	{ slug: 'ekler', label: 'Ekler' },
	{ slug: 'kopya-kagidi', label: 'Kopya Kâğıdı' },
];

/** Bölüm numarası (1'den başlar), içerik belgesindeki numaralandırmayla aynı. */
export const allChapters = chapterGroups
	.flatMap((g) => g.chapters)
	.map((c, i) => ({ ...c, number: i + 1 }));
