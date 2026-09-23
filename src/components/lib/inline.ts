// A tiny formatter for short text written as data (quiz options, table cells):
// supports `code` and **bold**; everything else is escaped.

function escapeHtml(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function inline(text: string): string {
	return text
		.split(/(`[^`]+`)/)
		.map((part) =>
			part.startsWith('`') && part.endsWith('`') && part.length > 1
				? `<code>${escapeHtml(part.slice(1, -1))}</code>`
				: escapeHtml(part).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
		)
		.join('');
}

/** Builds an internal link that respects the site base ("/" or "/repo/"). */
export function withBase(slug: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
	const clean = slug.replace(/^\/+|\/+$/g, '');
	return clean ? `${base}/${clean}/` : `${base}/`;
}
