/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(216, 100%, 97%)',
            '100': 'hsl(216, 100%, 94%)',
            '200': 'hsl(216, 100%, 86%)',
            '300': 'hsl(216, 100%, 76%)',
            '400': 'hsl(216, 100%, 64%)',
            '500': 'hsl(216, 100%, 50%)',
            '600': 'hsl(216, 100%, 40%)',
            '700': 'hsl(216, 100%, 32%)',
            '800': 'hsl(216, 100%, 24%)',
            '900': 'hsl(216, 100%, 16%)',
            '950': 'hsl(216, 100%, 10%)',
            DEFAULT: '#f5f9ff'
        },
        secondary: {
            '50': 'hsl(216, 96%, 97%)',
            '100': 'hsl(216, 96%, 94%)',
            '200': 'hsl(216, 96%, 86%)',
            '300': 'hsl(216, 96%, 76%)',
            '400': 'hsl(216, 96%, 64%)',
            '500': 'hsl(216, 96%, 50%)',
            '600': 'hsl(216, 96%, 40%)',
            '700': 'hsl(216, 96%, 32%)',
            '800': 'hsl(216, 96%, 24%)',
            '900': 'hsl(216, 96%, 16%)',
            '950': 'hsl(216, 96%, 10%)',
            DEFAULT: '#0562ef'
        },
        accent: {
            '50': 'hsl(214, 86%, 97%)',
            '100': 'hsl(214, 86%, 94%)',
            '200': 'hsl(214, 86%, 86%)',
            '300': 'hsl(214, 86%, 76%)',
            '400': 'hsl(214, 86%, 64%)',
            '500': 'hsl(214, 86%, 50%)',
            '600': 'hsl(214, 86%, 40%)',
            '700': 'hsl(214, 86%, 32%)',
            '800': 'hsl(214, 86%, 24%)',
            '900': 'hsl(214, 86%, 16%)',
            '950': 'hsl(214, 86%, 10%)',
            DEFAULT: '#e4effd'
        },
        'neutral-50': '#888e94',
        'neutral-100': '#000000',
        'neutral-200': '#6b7480',
        'neutral-300': '#3a4554',
        'neutral-400': '#13191f',
        background: '#f5f9ff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'DM Sans',
            'sans-serif'
        ],
        heading: [
            'Space Grotesk',
            'sans-serif'
        ],
        mono: [
            'DM Mono',
            'sans-serif'
        ],
        body: [
            'ui-sans-serif',
            'sans-serif'
        ]
    },
    fontSize: {
        '32': [
            '32px',
            {
                lineHeight: '33.92px',
                letterSpacing: '-1.12px'
            }
        ],
        '36': [
            '36px',
            {
                lineHeight: '39.6px',
                letterSpacing: '-1.44px'
            }
        ],
        '38': [
            '38px',
            {
                lineHeight: '39.9px',
                letterSpacing: '-1.52px'
            }
        ],
        '40': [
            '40px',
            {
                lineHeight: '52px',
                letterSpacing: '-1.6px'
            }
        ],
        '44': [
            '44px',
            {
                lineHeight: '44.88px',
                letterSpacing: '-1.76px'
            }
        ],
        '47': [
            '47px',
            {
                lineHeight: '47.94px',
                letterSpacing: '-1.88px'
            }
        ],
        '52': [
            '52px',
            {
                lineHeight: '52px',
                letterSpacing: '-1.82px'
            }
        ],
        '56': [
            '56px',
            {
                lineHeight: '58.8px',
                letterSpacing: '-2.24px'
            }
        ],
        '72': [
            '72px',
            {
                lineHeight: '74.88px',
                letterSpacing: '-4.176px'
            }
        ],
        '193.939': [
            '193.939px',
            {
                lineHeight: '290.909px'
            }
        ],
        '81.92': [
            '81.92px',
            {
                lineHeight: '73.728px',
                letterSpacing: '-3.2768px'
            }
        ],
        '79.36': [
            '79.36px',
            {
                lineHeight: '79.36px',
                letterSpacing: '-3.1744px'
            }
        ],
        '58.88': [
            '58.88px',
            {
                lineHeight: '64.768px',
                letterSpacing: '-2.0608px'
            }
        ],
        '45.056': [
            '45.056px',
            {
                lineHeight: '40.5504px',
                letterSpacing: '-0.90112px'
            }
        ],
        '28.16': [
            '28.16px',
            {
                lineHeight: '29.568px',
                letterSpacing: '-0.5632px'
            }
        ]
    },
    spacing: {
        '14': '28px',
        '16': '32px',
        '18': '36px',
        '20': '40px',
        '22': '44px',
        '24': '48px',
        '28': '56px',
        '32': '64px',
        '36': '72px',
        '40': '80px',
        '48': '96px',
        '54': '108px',
        '70': '140px',
        '1px': '1px',
        '75px': '75px',
        '121px': '121px',
        '143px': '143px',
        '177px': '177px',
        '183px': '183px'
    },
    borderRadius: {
        xs: '1px',
        sm: '5px',
        md: '10px',
        xl: '19px',
        full: '999px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.18) 0px 1px 0px 0px inset, rgba(5, 16, 40, 0.18) 0px 2px 8px 0px',
        xs: 'rgba(255, 255, 255, 0.4) 0px 1px 0px 0px',
        md: 'rgba(5, 98, 239, 0.45) 0px 4px 10px -3px',
        lg: 'rgba(118, 193, 255, 0.6) 0px 2px 30px -2px inset, rgba(0, 0, 0, 0.2) 0px 9px 17px 5px',
        xl: 'rgba(11, 16, 21, 0.28) 0px 32px 64px -24px, rgba(11, 16, 21, 0.1) 0px 8px 16px -4px, rgba(11, 16, 21, 0.04) 0px 0px 0px 1px'
    },
    screens: {
        '1920px': '1920px'
    },
    transitionDuration: {
        '0': '0s',
        '60': '0.06s',
        '120': '0.12s',
        '150': '0.15s',
        '160': '0.16s',
        '180': '0.18s',
        '200': '0.2s',
        '220': '0.22s',
        '240': '0.24s',
        '250': '0.25s',
        '280': '0.28s',
        '300': '0.3s',
        '320': '0.32s',
        '360': '0.36s',
        '500': '0.5s',
        '520': '0.52s',
        '600': '0.6s',
        '700': '0.7s',
        '720': '0.72s',
        '800': '0.8s',
        '1800': '1.8s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0, 0, 0.2, 1)',
        linear: 'linear'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '100%'
    }
},
  },
};
