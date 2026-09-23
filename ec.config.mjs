// Kod blokları (Expressive Code) için "Defter ve Çini" temaları.
// Renkler src/styles/theme.css ile aynı palettedir; kırmızı (mercan) bilerek
// kullanılmaz, çünkü sitede yalnızca hataları işaret eder.
import { defineEcConfig, ExpressiveCodeTheme } from '@astrojs/starlight/expressive-code';

/** @param {{ name: string, type: 'light' | 'dark', c: Record<string, string> }} p */
function makeTheme({ name, type, c }) {
	return new ExpressiveCodeTheme({
		name,
		type,
		colors: {
			'editor.background': c.bg,
			'editor.foreground': c.fg,
			'editor.selectionBackground': c.selection,
			'editorLineNumber.foreground': c.comment,
			'titleBar.border': c.border,
			'tab.activeBackground': c.bg,
			'tab.activeForeground': c.fg,
			'editorGroupHeader.tabsBackground': c.tabBar,
			'focusBorder': c.keyword,
		},
		tokenColors: [
			{ scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
			{
				// "new", "typeof", "is", "as" gibi anahtar kelimeler C# dilbilgisinde keyword.operator.expression altında.
				scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.expression', 'constant.language', 'variable.language'],
				settings: { foreground: c.keyword },
			},
			{ scope: ['keyword.operator', 'punctuation'], settings: { foreground: c.fg } },
			{
				scope: ['entity.name.type', 'entity.name.class', 'entity.name.struct', 'entity.name.interface', 'entity.name.type.enum', 'support.type', 'support.class', 'storage.type.cs'],
				settings: { foreground: c.type },
			},
			{ scope: ['string', 'string.quoted', 'constant.character', 'punctuation.definition.string'], settings: { foreground: c.string } },
			{ scope: ['constant.character.escape', 'punctuation.definition.interpolation', 'punctuation.section.interpolation'], settings: { foreground: c.keyword } },
			{ scope: ['constant.numeric'], settings: { foreground: c.number } },
			{ scope: ['entity.name.function', 'support.function'], settings: { foreground: c.fg, fontStyle: 'bold' } },
			{ scope: ['variable', 'variable.other', 'entity.name.variable'], settings: { foreground: c.fg } },
		],
	});
}

const light = makeTheme({
	name: 'defter-light',
	type: 'light',
	c: {
		bg: '#F0EBDF',
		fg: '#1C2230',
		tabBar: '#E7E1D3',
		border: '#D9D2C3',
		selection: '#D6DFF0',
		comment: '#6B604C',
		keyword: '#1E4FA3',
		type: '#0C6E67',
		string: '#8A4B0F',
		number: '#7A3E9D',
	},
});

const dark = makeTheme({
	name: 'defter-dark',
	type: 'dark',
	c: {
		bg: '#0F1216',
		fg: '#E8E4DA',
		tabBar: '#1A1D23',
		border: '#2C3037',
		selection: '#26344F',
		comment: '#B3A78F',
		keyword: '#8FB3F5',
		type: '#5CCBBE',
		string: '#E3B27A',
		number: '#C9A0E8',
	},
});

export default defineEcConfig({
	themes: [dark, light],
	// Starlight'ın açık/koyu tema düğmesiyle eşleşir.
	useStarlightDarkModeSwitch: true,
	useStarlightUiThemeColors: false,
	styleOverrides: {
		borderRadius: '0.375rem',
		borderColor: ({ theme }) => theme.colors['titleBar.border'],
		codeFontFamily: "'JetBrains Mono Variable', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
		codeFontSize: '0.9rem',
		codeLineHeight: '1.65',
		codePaddingBlock: '1rem',
		codePaddingInline: '1.25rem',
		uiFontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif",
		frames: {
			shadowColor: 'transparent',
			frameBoxShadowCssValue: 'none',
			editorActiveTabIndicatorTopColor: ({ theme }) => theme.colors['focusBorder'],
			editorActiveTabBorderColor: 'transparent',
			editorTabBarBorderBottomColor: ({ theme }) => theme.colors['titleBar.border'],
			inlineButtonBorder: ({ theme }) => theme.colors['titleBar.border'],
		},
	},
});
