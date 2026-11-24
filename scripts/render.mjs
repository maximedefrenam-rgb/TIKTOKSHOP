/**
 * Rendu final + images de contrôle.
 *   node scripts/render.mjs <nom>   → out/<nom>-v<version>.mp4 (H.264) et out/frames/<nom>-*.png
 * La version est lue dans videos/<nom>/config.ts.
 */
import {readFileSync, mkdirSync, renameSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {ROOT, audioDuration} from './lib/common.mjs';

const video = process.argv[2];
if (!video) throw new Error('usage : node scripts/render.mjs <nom>');
const cfg = readFileSync(path.join(ROOT, 'videos', video, 'config.ts'), 'utf8');
const version = (cfg.match(/version:\s*(\d+)/) || [])[1] || '1';
const out = path.join(ROOT, 'out', `${video}-v${version}.mp4`);
execFileSync('npx', ['remotion', 'render', 'src/index.ts', video, out, '--codec=h264', '--crf=18'], {cwd: ROOT, stdio: 'inherit'});

// limiteur audio : évite la saturation quand un impact tombe sur la voix (image copiée telle quelle)
const tmp = out.replace(/\.mp4$/, '.tmp.mp4');
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', out, '-c:v', 'copy', '-af', 'alimiter=limit=0.89:attack=2:release=60:level=disabled',
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', tmp]);
renameSync(tmp, out);

const d = audioDuration(out);
const frames = path.join(ROOT, 'out', 'frames');
mkdirSync(frames, {recursive: true});
const points = {'0.5s': 0.5, '5s': 5, milieu: d / 2, '3-4': d * 0.75, fin: d - 0.1};
for (const [name, t] of Object.entries(points)) {
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', String(t), '-i', out, '-frames:v', '1', path.join(frames, `${video}-${name}.png`)]);
}
console.log(`-> ${path.relative(ROOT, out)} (${d.toFixed(2)}s) + images de contrôle dans out/frames/`);
