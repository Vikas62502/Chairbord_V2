/**
 * Fixes common Windows/Android Gradle failures:
 * - MalformedJsonException during externalNativeBuildClean (bad .cxx metadata)
 * - mergeReleaseNativeLibs "Unexpected lock protocol" (corrupt Gradle build-cache locks)
 *
 * Stops Gradle daemons first, clears global Gradle *build-cache* dirs, then project caches.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const androidDir = path.join(root, 'android');
const appDir = path.join(androidDir, 'app');

const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
spawnSync(gradlew, ['--stop'], {
  cwd: androidDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

const gradleCaches = path.join(os.homedir(), '.gradle', 'caches');
if (fs.existsSync(gradleCaches)) {
  let entries = [];
  try {
    entries = fs.readdirSync(gradleCaches, { withFileTypes: true });
  } catch {
    entries = [];
  }
  for (const e of entries) {
    if (
      e.isDirectory() &&
      (e.name.startsWith('build-cache-') || e.name.startsWith('transforms-'))
    ) {
      const target = path.join(gradleCaches, e.name);
      try {
        fs.rmSync(target, { recursive: true, force: true });
        console.log('[android-wipe-build] removed global', target);
      } catch (err) {
        console.warn('[android-wipe-build] could not remove', target, String(err && err.message));
      }
    }
  }
}

const targets = [
  path.join(androidDir, '.gradle-user-home'),
  path.join(androidDir, '.gradle'),
  path.join(androidDir, 'build'),
  path.join(appDir, '.cxx'),
  path.join(appDir, 'build'),
];

for (const target of targets) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log('[android-wipe-build] removed', path.relative(root, target));
  }
}

console.log('[android-wipe-build] done (daemons stopped, Gradle build-caches + project dirs cleared)');
