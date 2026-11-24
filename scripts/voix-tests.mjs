/**
 * Choix de la voix du compte (une seule fois).
 *   node scripts/voix-tests.mjs --search [--query "energetic"]   liste des voix françaises de la bibliothèque
 *   node scripts/voix-tests.mjs --add <public_owner_id>:<voice_id>  ajoute une voix partagée au compte
 *   node scripts/voix-tests.mjs --generate id1,id2,id3,id4 --text "accroche"   → voix-tests/<n>-<id>.mp3
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {ROOT, arg, flag, apiKey, tts} from './lib/common.mjs';

const headers = () => ({'xi-api-key': apiKey()});

if (flag('search')) {
  const q = new URLSearchParams({language: 'fr', page_size: '40', sort: 'trending'});
  if (arg('query')) q.set('search', arg('query'));
  const res = await fetch(`https://api.elevenlabs.io/v1/shared-voices?${q}`, {headers: headers()});
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const {voices} = await res.json();
  for (const v of voices) {
    console.log([v.name, `${v.public_owner_id}:${v.voice_id}`, v.gender, v.age, v.accent, v.use_case, v.descriptive, (v.description || '').slice(0, 90)].join(' | '));
  }
} else if (arg('add')) {
  const [owner, id] = arg('add').split(':');
  const res = await fetch(`https://api.elevenlabs.io/v1/voices/add/${owner}/${id}`, {
    method: 'POST', headers: {...headers(), 'Content-Type': 'application/json'}, body: JSON.stringify({new_name: arg('name', id)}),
  });
  console.log(res.status, await res.text());
} else if (arg('generate')) {
  const text = arg('text');
  if (!text) throw new Error('--text requis');
  const dir = path.join(ROOT, 'voix-tests');
  mkdirSync(dir, {recursive: true});
  const ids = arg('generate').split(',');
  for (const [i, id] of ids.entries()) {
    const {audio} = await tts({text, voiceId: id, model: arg('model', 'eleven_v3'), settings: {stability: 0.5}});
    const out = path.join(dir, `${i + 1}-${id}.mp3`);
    writeFileSync(out, audio);
    console.log('->', path.relative(ROOT, out));
  }
} else {
  console.log('Voir l\'en-tête du fichier pour l\'usage.');
}
