/** Valide une prise : node scripts/choose-take.mjs <nom> <n>  → voice.mp3 + timings.json */
import {copyFileSync} from 'node:fs';
import path from 'node:path';
import {ROOT} from './lib/common.mjs';

const [video, take] = process.argv.slice(2);
if (!video || !take) throw new Error('usage : node scripts/choose-take.mjs <nom> <n>');
const dir = path.join(ROOT, 'public', 'videos', video);
copyFileSync(path.join(dir, `voix-prise${take}.mp3`), path.join(dir, 'voice.mp3'));
copyFileSync(path.join(dir, `timings-prise${take}.json`), path.join(dir, 'timings.json'));
console.log(`Prise ${take} retenue pour ${video}`);
