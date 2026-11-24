import {loadFont as loadAnton} from '@remotion/google-fonts/Anton';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';

const anton = loadAnton('normal', {weights: ['400'], subsets: ['latin', 'latin-ext']});
const inter = loadInter('normal', {weights: ['700', '900'], subsets: ['latin', 'latin-ext']});

/** Identité fixe du compte — identique sur toutes les vidéos. */
export const BRAND = {
  colors: {
    bg: '#0B0B0F',
    accentDefault: '#FFD60A',
    text: '#FFFFFF',
    alert: '#FF3B30',
    muted: '#3A3A46',
    cart: '#FE6A1A', // orange « panier » TikTok Shop
  },
  fonts: {
    title: anton.fontFamily, // titres, chiffres
    body: inter.fontFamily, // petits textes (Inter Bold)
  },
  video: {width: 1080, height: 1920, fps: 30, tailSec: 0.5},
  /** Zones que l'interface TikTok recouvre : aucun texte important dedans. */
  safe: {top: 150, bottom: 250, right: 150, left: 70},
  mix: {voice: 1, music: 0.12, musicDucked: 0.07, sfxMin: 0.3, sfxMax: 0.6},
  /** Transitions : 6 à 10 images maximum. */
  transitionFrames: 8,
} as const;

/**
 * Voix ElevenLabs du compte. Rempli une seule fois après le test des 4 voix,
 * puis toujours réutilisé (les scripts Node lisent cette valeur par regex).
 */
export const VOICE = {
  voiceId: '',
  voiceName: '',
  model: 'eleven_v3',
  fallbackModel: 'eleven_multilingual_v2',
  fallbackSettings: {stability: 0.3, similarity_boost: 0.75, style: 0.5, speed: 1.05},
} as const;

/** Centre horizontal de la zone de sécurité (le texte est centré ici, pas à 540). */
export const SAFE_CX = BRAND.safe.left + (BRAND.video.width - BRAND.safe.left - BRAND.safe.right) / 2;
export const SAFE_W = BRAND.video.width - BRAND.safe.left - BRAND.safe.right;
export const SAFE_BOTTOM_Y = BRAND.video.height - BRAND.safe.bottom;
