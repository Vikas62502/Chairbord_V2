/**
 * Run Gradle from /android with:
 * - Project-local GRADLE_USER_HOME (avoids corrupted %USERPROFILE%\.gradle caches on Windows)
 * - Daemons stopped (default home first, then isolated home) so file locks are released
 * - --no-daemon so each release build uses a fresh process (slower, fewer stale locks)
 *
 * Usage: node scripts/gradle.cjs assembleRelease --no-build-cache
 */
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const androidDir = path.join(root, 'android');
const gradleUserHome = path.join(androidDir, '.gradle-user-home');
fs.mkdirSync(gradleUserHome, { recursive: true });

const cmd = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const userArgs = process.argv.slice(2);
const win = process.platform === 'win32';

spawnSync(cmd, ['--stop'], {
  cwd: androidDir,
  stdio: 'inherit',
  shell: win,
});

const env = {
  ...process.env,
  GRADLE_USER_HOME: gradleUserHome,
};

spawnSync(cmd, ['--stop'], {
  cwd: androidDir,
  stdio: 'inherit',
  shell: win,
  env,
});

const finalArgs = [...userArgs];
if (!finalArgs.includes('--no-daemon')) {
  finalArgs.push('--no-daemon');
}

const result = spawnSync(cmd, finalArgs, {
  cwd: androidDir,
  stdio: 'inherit',
  shell: win,
  env,
});

const code = result.status;
process.exit(typeof code === 'number' ? code : 1);
