import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Lit ELEVENLABS_API_KEY (variable d'environnement, sinon .env) sans jamais l'afficher. */
export const apiKey = () => {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const p = path.join(ROOT, '.env');
  if (!existsSync(p)) throw new Error('.env introuvable (copier .env.example et y mettre ELEVENLABS_API_KEY)');
  const m = readFileSync(p, 'utf8').match(/^\s*ELEVENLABS_API_KEY\s*=\s*"?([^"\n\r]+)"?/m);
  if (!m) throw new Error('ELEVENLABS_API_KEY absente de .env');
  return m[1].trim();
};

/** Lit VOICE depuis src/brand.ts. */
export const brandVoice = () => {
  const all = readFileSync(path.join(ROOT, 'src/brand.ts'), 'utf8');
  // ne lire que le bloc `export const VOICE = {` (et pas VOICE_3D)
  const src = all.slice(all.indexOf('export const VOICE = {'));
  const get = (k) => (src.match(new RegExp(`${k}:\\s*'([^']*)'`)) || [])[1] || '';
  return {voiceId: get('voiceId'), voiceName: get('voiceName'), model: get('model'), fallbackModel: get('fallbackModel')};
};

export const FALLBACK_SETTINGS = {stability: 0.3, similarity_boost: 0.75, style: 0.5, speed: 1.05};

export const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};
export const flag = (name) => process.argv.includes(`--${name}`);

export const audioDuration = (file) =>
  parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());

export const stripTags = (text) => text.replace(/\[[^\]]*\]\s*/g, '');

/** Appel TTS ElevenLabs ; withTimestamps → {audio: Buffer, alignment} */
export const tts = async ({text, voiceId, model, withTimestamps = false, settings}) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}${withTimestamps ? '/with-timestamps' : ''}?output_format=mp3_44100_128`;
  const body = {text, model_id: model};
  if (settings) body.voice_settings = settings;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'xi-api-key': apiKey(), 'Content-Type': 'application/json', Accept: withTimestamps ? 'application/json' : 'audio/mpeg'},
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status} : ${(await res.text()).slice(0, 400)}`);
  if (!withTimestamps) return {audio: Buffer.from(await res.arrayBuffer())};
  const j = await res.json();
  return {audio: Buffer.from(j.audio_base64, 'base64'), alignment: j.alignment || j.normalized_alignment};
};

/** Caractères alignés → mots (en ignorant les balises [excited] etc.). */
export const alignmentToWords = (al) => {
  const words = [];
  let cur = null, inTag = false;
  al.characters.forEach((ch, i) => {
    if (ch === '[') inTag = true;
    if (inTag) { if (ch === ']') inTag = false; return; }
    if (/\s/.test(ch)) { if (cur) words.push(cur); cur = null; return; }
    if (!cur) cur = {word: '', start: al.character_start_times_seconds[i], end: 0};
    cur.word += ch;
    cur.end = al.character_end_times_seconds[i];
  });
  if (cur) words.push(cur);
  return words
    .map((w) => ({...w, word: w.word.replace(/^[«"“(.…,!?;:]+|[»"”).…,!?;:]+$/g, '')}))
    .filter((w) => w.word.length > 0)
    .map((w) => ({word: w.word, start: +w.start.toFixed(3), end: +w.end.toFixed(3)}));
};
