import {mkdirSync, writeFileSync} from 'node:fs';
import {SPECS} from '../videos/variantes/lot8-specs';
import {sayOf} from '../src/lib/blocks';
let total = 0;
for (const [id, s] of Object.entries(SPECS)) {
  const t = sayOf(s.blocks);
  total += t.length;
  mkdirSync(`videos/${id}`, {recursive: true});
  mkdirSync(`public/videos/${id}`, {recursive: true});
  writeFileSync(`videos/${id}/voix.txt`, t + '\n');
}
console.log(Object.keys(SPECS).length, 'vidéos,', total, 'caractères');
