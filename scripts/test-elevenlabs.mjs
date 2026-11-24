/**
 * Vérifie la connexion ElevenLabs sans jamais afficher la clé.
 *   node scripts/test-elevenlabs.mjs          → infos du compte (0 crédit)
 *   node scripts/test-elevenlabs.mjs --tts    → + synthèse de « Salut ! » (~7 caractères) dans voix-tests/test-connexion.mp3
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {ROOT, apiKey, flag, tts, audioDuration} from './lib/common.mjs';

const key = apiKey();
const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {headers: {'xi-api-key': key}});
if (!res.ok) {
  console.error(`Échec : HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`);
  process.exit(1);
}
const s = await res.json();
console.log(`Connexion OK · offre ${s.tier} · ${s.character_count}/${s.character_limit} caractères utilisés`);

if (flag('tts')) {
  const vres = await fetch('https://api.elevenlabs.io/v1/voices', {headers: {'xi-api-key': key}});
  const {voices} = await vres.json();
  const v = voices[0];
  const {audio} = await tts({text: 'Salut !', voiceId: v.voice_id, model: 'eleven_multilingual_v2'});
  const dir = path.join(ROOT, 'voix-tests');
  mkdirSync(dir, {recursive: true});
  const out = path.join(dir, 'test-connexion.mp3');
  writeFileSync(out, audio);
  console.log(`Synthèse OK (voix « ${v.name} ») → voix-tests/test-connexion.mp3 (${audioDuration(out).toFixed(2)}s)`);
}
