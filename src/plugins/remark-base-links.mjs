// Adds the site base to root-relative links in MDX ("/types/" → "/<repo>/types/").
// GitHub Pages serves the site under "/<repo>/", so without this, links written in
// content would point to the wrong address. Starlight's own navigation already does
// this; the plugin is only for links in written content.

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
