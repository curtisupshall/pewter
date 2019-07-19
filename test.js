const Palette = require('./lib/Palette.js').default;
const rgb = require('./lib/RGB.js').default;

//const { dictionary } = require('./lib/dictionary.js')
const color = new rgb(199,172,125);

const pewter = new Palette();

console.log(pewter.getNames([color]));