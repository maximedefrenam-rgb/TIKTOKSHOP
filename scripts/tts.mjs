/**
 * Génère une prise de voix + le timing de chaque mot.
 *   node scripts/tts.mjs --video <nom> --take 1 [--fallback] [--stability 0.5]
 * Texte lu dans videos/<nom>/voix.txt (balises [excited] etc. ; retirées automatiquement en mode secours).
 * Sorties : public/videos/<nom>/voix-prise<n>.mp3 et timings-prise<n>.json
 */
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {ROOT, arg, flag, brandVoice, tts, stripTags, alignmentToWords, audioDuration, FALLBACK_SETTINGS} from './lib/common.mjs';

const video = arg('video');
const take = arg('take', '1');
if (!video) throw new Error('--video <nom> requis');
const v = brandVoice();
if (!v.voiceId) throw new Error('Aucune voix choisie : remplir VOICE.voiceId dans src/brand.ts (voir scripts/voix-tests.mjs)');

const fallback = flag('fallback');
let text = readFileSync(path.join(ROOT, 'videos', video, 'voix.txt'), 'utf8').trim();
const model = fallback ? v.fallbackModel : v.model;
if (fallback) text = stripTags(text);
const settings = fallback ? FALLBACK_SETTINGS : {stability: parseFloat(arg('stability', '0.5'))};

console.log(`Voix ${v.voiceName || v.voiceId} · modèle ${model} · ${text.length} caractères (≈ crédits consommés)`);
const {audio, alignment} = await tts({text, voiceId: v.voiceId, model, withTimestamps: true, settings});

const dir = path.join(ROOT, 'public', 'videos', video);
mkdirSync(dir, {recursive: true});
const mp3 = path.join(dir, `voix-prise${take}.mp3`);
writeFileSync(mp3, audio);
const durationSec = +audioDuration(mp3).toFixed(3);
const words = alignment ? alignmentToWords(alignment) : [];
writeFileSync(path.join(dir, `timings-prise${take}.json`), JSON.stringify({words, durationSec, model}, null, 1));
console.log(`-> ${path.relative(ROOT, mp3)} (${durationSec}s, ${words.length} mots horodatés)`);
if (!words.length) console.log('Pas de timestamps : lancer python3 scripts/transcribe.py --video ' + video + ' --take ' + take);
