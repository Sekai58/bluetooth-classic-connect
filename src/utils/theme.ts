// import {fontSizes, spacing, lineHeight, fontWeight} from './sizes';

const darkColors = {
  primary: '#3775EF',
  primary100: '#F0F5FE',
  white: '#FFFFFF',
  white200: '#FDFDFD',
  white500: '#FAFAFA',
  black: '#000000',
  black50: '#324355',
  black100: '#1D242D',
  veryDark: '#15202B',
  bgBlack: '#08161C',
  danger: '#FD5F72',
  success: '#0CAE4A',
  gray200: '#989898',
  gray100: '#B9B9B9',
  gray300: '#686868',
  gray400: '#4B4B4B',
  gray500: '#0A161D',
  gray50: '#E9E9E9',
  gray600: '#E4E4E4',
  gray700: '#1C1C1C',
  grayLight: '#F5F5F5',
  blue50: '#EEEFFC',
  blue100: '#CCCDF7',
  blue600: '#0c4a6e',
  brightBlue: '#19F3FF',
  blue300: '#00ACF0',
  black300: '#1E1E1E',
  gray: '#888888',
  rippleColor: 'rgba(25,243,255,0.1)',
  grayRipple: 'rgba(255,255,255,0.1)',
};

const lightColors = {
  primary: '#3775EF',
  primary100: '#F0F5FE',
  white: '#FFFFFF',
  white200: '#FDFDFD',
  white500: '#FAFAFA',
  black: '#000000',
  black50: '#324355',
  black100: '#1D242D',
  veryDark: '#15202B',
  bgBlack: '#08161C',
  danger: '#FD5F72',
  success: '#0CAE4A',
  gray200: '#989898',
  gray100: '#B9B9B9',
  gray300: '#686868',
  gray400: '#4B4B4B',
  gray500: '#0A161D',
  gray50: '#E9E9E9',
  gray600: '#E4E4E4',
  gray700: '#1C1C1C',
  grayLight: '#F5F5F5',
  blue50: '#EEEFFC',
  blue100: '#CCCDF7',
  blue600: '#0c4a6e',
  brightBlue: '#19F3FF',
  blue300: '#00ACF0',
  black300: '#1E1E1E',
  gray: '#888888',
  rippleColor: 'rgba(25,243,255,0.1)',
  grayRipple: 'rgba(255,255,255,0.1)',
};

export const createTheme = (isDarkMode: boolean) => {
  const theme = {
    colors: isDarkMode ? darkColors : lightColors,
  };

  return theme;
};

export const theme = createTheme(false);
