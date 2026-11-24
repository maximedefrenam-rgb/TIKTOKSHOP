/**
 * Vérifie la connexion ElevenLabs sans jamais afficher la clé.
 *   npm run eleven:test          → infos du compte si la clé a la permission user_read (0 crédit)
 *   npm run eleven:test -- --tts → + synthèse de « Salut ! » (~7 caractères) dans voix-tests/test-connexion.mp3
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {ROOT, apiKey, flag, tts, audioDuration} from './lib/common.mjs';

const DEFAULT_VOICE = {voice_id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George (voix standard ElevenLabs)'};
const key = apiKey();

const res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {headers: {'xi-api-key': key}});
if (res.ok) {
  const s = await res.json();
  console.log(`Clé valide · offre ${s.tier} · ${s.character_count}/${s.character_limit} caractères utilisés`);
} else {
  const body = await res.text();
  if (body.includes('missing_permissions')) console.log('Clé reconnue (sans permission « user_read » : solde de crédits non consultable).');
  else { console.error(`Échec : HTTP ${res.status} — ${body.slice(0, 200)}`); process.exit(1); }
}

if (flag('tts')) {
  const {audio} = await tts({text: 'Salut !', voiceId: DEFAULT_VOICE.voice_id, model: 'eleven_multilingual_v2'});
  const dir = path.join(ROOT, 'voix-tests');
  mkdirSync(dir, {recursive: true});
  const out = path.join(dir, 'test-connexion.mp3');
  writeFileSync(out, audio);
  console.log(`Synthèse OK (${DEFAULT_VOICE.name}) → voix-tests/test-connexion.mp3 (${audioDuration(out).toFixed(2)}s)`);
}
