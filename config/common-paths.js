const path = require('path');

module.exports = {
    outputPath: path.resolve(__dirname, '../', 'docs'),
    root: path.resolve(__dirname),
    template: './src/index.html',
    favicon: './src/favicon.ico',
};