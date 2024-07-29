import { create } from '@storybook/theming/create'

export default create({
  base: 'light',
  brandTitle: 'Orama UI Components Library',
  brandUrl: 'https://askorama.ai',
  brandImage: 'https://website-assets.oramasearch.com/orama-when-light.svg',
  brandTarget: '_self',
  //
  colorPrimary: '#151515',
  colorSecondary: '#8152ee',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#151515',
  barSelectedColor: '#8152ee',
  barHoverColor: '#432d77',
  barBg: '#fbfbfb',
})
