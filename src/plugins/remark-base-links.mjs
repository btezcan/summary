// MDX içindeki kök-göreli bağlantılara ("/turler/") site tabanını ekler.
// GitHub Pages siteyi "/<repo>/" altında sunduğu için, bu olmadan içerikteki
// bağlantılar yanlış adrese gider. Starlight'ın kendi menüsü bunu zaten yapıyor;
// bu eklenti yalnızca yazılan içerik içindir.

/** @param {{ base: string }} options */
export default function remarkBaseLinks({ base }) {
	const prefix = base.replace(/\/+$/, '');
	return (tree) => {
		if (!prefix) return;
		walk(tree, (node) => {
			if (
				(node.type === 'link' || node.type === 'definition') &&
				typeof node.url === 'string' &&
				node.url.startsWith('/') &&
				!node.url.startsWith('//') &&
				node.url !== prefix &&
				!node.url.startsWith(prefix + '/')
			) {
				node.url = prefix + node.url;
			}
		});
	};
}

function walk(node, visit) {
	visit(node);
	if (Array.isArray(node.children)) for (const child of node.children) walk(child, visit);
}
