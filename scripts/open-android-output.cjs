/**
 * Opens Android build output folder (Windows: Explorer, macOS: open, Linux: xdg-open).
 * Usage: node scripts/open-android-output.cjs apk|aab
 */
const { spawn } = require('child_process');
const path = require('path');

const kind = (process.argv[2] || 'apk').toLowerCase();
const rel =
  kind === 'aab'
    ? ['android', 'app', 'build', 'outputs', 'bundle', 'release']
    : ['android', 'app', 'build', 'outputs', 'apk', 'release'];
const dir = path.join(__dirname, '..', ...rel);

const platform = process.platform;
if (platform === 'win32') {
  spawn('cmd', ['/c', 'start', '', dir], { detached: true, stdio: 'ignore' });
} else if (platform === 'darwin') {
  spawn('open', [dir], { detached: true, stdio: 'ignore' });
} else {
  spawn('xdg-open', [dir], { detached: true, stdio: 'ignore' });
}
