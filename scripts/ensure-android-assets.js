/**
 * Ensures legacy `react-native bundle` output dirs exist.
 */
const fs = require('fs');
const path = require('path');

const assets = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'assets');
fs.mkdirSync(assets, { recursive: true });
