// "Defter ve Çini" themes for code blocks (Expressive Code), for C# and Python.
// The colors are the palette from src/styles/theme.css. Red (coral) is deliberately
// not used, because on this site it only ever marks errors.
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
				// C# puts keywords such as "new", "typeof", "is", "as" under keyword.operator.expression;
				// Python puts the word operators and/or/not/in/is under keyword.operator.logical.
				// C#'s symbolic && || ! stay plain.
				scope: [
					'keyword',
					'storage',
					'storage.type',
					'storage.modifier',
					'keyword.operator.expression',
					'keyword.operator.logical.python',
					'constant.language',
					'variable.language',
				],
				settings: { foreground: c.keyword },
			},
			{ scope: ['keyword.operator', 'punctuation'], settings: { foreground: c.fg } },
			{
				scope: ['entity.name.type', 'entity.name.class', 'entity.name.struct', 'entity.name.interface', 'entity.name.type.enum', 'support.type', 'support.class', 'storage.type.cs'],
				settings: { foreground: c.type },
			},
			{ scope: ['string', 'string.quoted', 'constant.character', 'punctuation.definition.string'], settings: { foreground: c.string } },
			{
				// Interpolation markers: C# $"{x}" braces and Python f-string {x} placeholders.
				scope: [
					'constant.character.escape',
					'punctuation.definition.interpolation',
					'punctuation.section.interpolation',
					'constant.character.format.placeholder',
				],
				settings: { foreground: c.keyword },
			},
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
	// Follows Starlight's light/dark theme switch.
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
