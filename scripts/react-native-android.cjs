/**
 * Run `react-native` CLI with project-local GRADLE_USER_HOME (see scripts/gradle.cjs).
 */
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const androidDir = path.join(root, 'android');
const gradleUserHome = path.join(androidDir, '.gradle-user-home');
fs.mkdirSync(gradleUserHome, { recursive: true });

const cmd = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
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

const args = process.argv.slice(2);
const result = spawnSync('npx', ['react-native', ...args], {
  cwd: root,
  stdio: 'inherit',
  shell: win,
  env,
});

const code = result.status;
process.exit(typeof code === 'number' ? code : 1);
