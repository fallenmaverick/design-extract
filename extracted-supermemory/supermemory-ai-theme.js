// React Theme — extracted from https://supermemory.ai
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '38': string;
    '40': string;
    '44': string;
    '47': string;
    '52': string;
    '56': string;
    '72': string;
    '193.939': string;
    '81.92': string;
    '79.36': string;
    '58.88': string;
    '45.056': string;
 *   };
 *   space: {
    '1': string;
    '28': string;
    '32': string;
    '36': string;
    '40': string;
    '44': string;
    '48': string;
    '56': string;
    '64': string;
    '72': string;
    '75': string;
    '80': string;
    '96': string;
    '108': string;
    '121': string;
    '140': string;
 *   };
 *   radii: {
    xs: string;
    sm: string;
    md: string;
    xl: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    xs: string;
    md: string;
    lg: string;
    xl: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#f5f9ff",
    "secondary": "#0562ef",
    "accent": "#e4effd",
    "background": "#f5f9ff",
    "foreground": "#000000",
    "neutral50": "#888e94",
    "neutral100": "#000000",
    "neutral200": "#6b7480",
    "neutral300": "#3a4554",
    "neutral400": "#13191f"
  },
  "fonts": {
    "body": "'ui-sans-serif', sans-serif",
    "mono": "'DM Mono', monospace"
  },
  "fontSizes": {
    "38": "38px",
    "40": "40px",
    "44": "44px",
    "47": "47px",
    "52": "52px",
    "56": "56px",
    "72": "72px",
    "193.939": "193.939px",
    "81.92": "81.92px",
    "79.36": "79.36px",
    "58.88": "58.88px",
    "45.056": "45.056px"
  },
  "space": {
    "1": "1px",
    "28": "28px",
    "32": "32px",
    "36": "36px",
    "40": "40px",
    "44": "44px",
    "48": "48px",
    "56": "56px",
    "64": "64px",
    "72": "72px",
    "75": "75px",
    "80": "80px",
    "96": "96px",
    "108": "108px",
    "121": "121px",
    "140": "140px"
  },
  "radii": {
    "xs": "1px",
    "sm": "5px",
    "md": "10px",
    "xl": "19px",
    "full": "999px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.18) 0px 1px 0px 0px inset, rgba(5, 16, 40, 0.18) 0px 2px 8px 0px",
    "xs": "rgba(255, 255, 255, 0.4) 0px 1px 0px 0px",
    "md": "rgba(5, 98, 239, 0.45) 0px 4px 10px -3px",
    "lg": "rgba(118, 193, 255, 0.6) 0px 2px 30px -2px inset, rgba(0, 0, 0, 0.2) 0px 9px 17px 5px",
    "xl": "rgba(11, 16, 21, 0.28) 0px 32px 64px -24px, rgba(11, 16, 21, 0.1) 0px 8px 16px -4px, rgba(11, 16, 21, 0.04) 0px 0px 0px 1px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#f5f9ff",
      "light": "hsl(216, 100%, 95%)",
      "dark": "hsl(216, 100%, 83%)"
    },
    "secondary": {
      "main": "#0562ef",
      "light": "hsl(216, 96%, 63%)",
      "dark": "hsl(216, 96%, 33%)"
    },
    "background": {
      "default": "#f5f9ff",
      "paper": "#e9f2ff"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#0b1015"
    }
  },
  "typography": {
    "fontFamily": "'ui-sans-serif', sans-serif",
    "h1": {
      "fontSize": "56px",
      "fontWeight": "500",
      "lineHeight": "58.8px"
    }
  },
  "shape": {
    "borderRadius": 10
  },
  "shadows": [
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(11, 16, 21, 0.03) 0px 1px 0px 0px",
    "rgb(250, 250, 250) 0px 0px 0px 1.5px, rgba(11, 16, 21, 0.1) 0px 0px 0px 2.5px",
    "color(srgb 0.313726 0.25098 0.815686 / 0.4) 0px 0px 0px 1px"
  ]
};

export default theme;
