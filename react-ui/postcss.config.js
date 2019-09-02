const {CssColors, CssSizes, CssTypography, CssAnimations} = require('@domo/bits-react');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('postcss-preset-env')({
      autoprefixer: { 
        grid: true 
      },
      features: {
        'custom-properties': {
          //usable as var(--colorDomoBlue)
          variables: Object.assign({}, CssColors, CssSizes, CssTypography, CssAnimations),
          preserve: false,
          warnings: true,
          noValueNotifications: 'error',
        },
      },
    }),
    isProduction && require('cssnano')({preset: 'default'}),
  ].filter(Boolean),
};