// import * as variables from '../styles/_colors.scss'

// TODO: these values should come from the sass file as unique source of truth, importing the sass file (colors.scss) directly
export const primitive = {
  gray50: '#FBFBFB',
  gray100: '#EFEFEF',
  gray200: '#DADADA',
  gray300: '#C6C6C6',
  gray400: '#AFAFB1',
  gray500: '#99989D',
  gray600: '#838289',
  gray700: '#2E2E2E',
  gray800: '#212121',
  gray900: '#151515',
  gray950: '#050505',
  purple500: '#8152EE',
  purple700: '#6A4BB2'
}

export const sassVariables = {}

const semantic = {
  light: {
    // TODO: placheholder primitives to be replaced
    '--text-color-primary': primitive.gray50,
    '--text-color-secondary': primitive.gray200,
    '--text-color-teriary': primitive.gray600,
    '--text-color-inactive': primitive.gray500,

    '--background-color-primary': primitive.gray950,
    '--background-color-secondary': primitive.gray900,
    '--background-color-tertiary': primitive.gray800,
    '--background-color-fourth': primitive.gray500,

    '--border-color-primary': primitive.gray700,
    '--border-color-secondary': primitive.gray900,
    '--border-color-inactive': primitive.gray400,

    '--icon-color-primary': primitive.gray50,
    '--icon-color-secondary': primitive.gray200,
    '--icon-color-tertiary': primitive.gray600,
    '--icon-color-inactive': primitive.gray500,
    '--icon-color-accent': primitive.purple500
  },
  dark: {
    '--text-color-primary': primitive.gray50,
    '--text-color-secondary': primitive.gray200,
    '--text-color-teriary': primitive.gray600,
    '--text-color-inactive': primitive.gray500,

    '--background-color-primary': primitive.gray950,
    '--background-color-secondary': primitive.gray900,
    '--background-color-tertiary': primitive.gray800,
    '--background-color-fourth': primitive.gray500,

    '--border-color-primary': primitive.gray700,
    '--border-color-secondary': primitive.gray900,
    '--border-color-inactive': primitive.gray400,

    '--icon-color-primary': primitive.gray50,
    '--icon-color-secondary': primitive.gray200,
    '--icon-color-tertiary': primitive.gray600,
    '--icon-color-inactive': primitive.gray500,
    // TODO: check the primitive to use for accent
    '--icon-color-accent': primitive.purple500
  },
  system: {}
}

export default semantic
