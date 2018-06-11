const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, '../src/styles/');

const files = fs.readdirSync(stylesDir);
// console.log(files);
module.exports = files;