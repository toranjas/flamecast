import { Colors, extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  /**
   * Application will start with this theme. Options are: 'light', 'dark'
   */
  initialColorMode: 'dark',
  /**
   * Will give control to OS to determine if dark or light
   */
  useSystemColorMode: false
};

const colors: Colors = {
  gray: {
    '50': '#F1F2F3',
    '100': '#D9DBDE',
    '200': '#C0C4C9',
    '300': '#A7ACB3',
    '400': '#8F959E',
    '500': '#767E89',
    '600': '#5F656D',
    '700': '#474B52',
    '800': '#2F3237',
    '900': '#18191B'
  }
};

// Extend the theme
const theme = extendTheme({
  config,
  colors,
});

export default theme;
