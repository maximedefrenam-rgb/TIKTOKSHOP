import timings from '../public/videos/zap-creve/timings.json';
import type {Video3DConfig} from '../src/three/Video3D';
export const config: Video3DConfig = {
  id: 'test-3d', accent: '#C2185B', pillColor: '#2EE6C8', productImage: 'videos/zap-creve/produit.png', problem: 'battery',
  voice: 'videos/zap-creve/voice.mp3', music: 'videos/zap-creve/music.wav', timings,
  shots: [
    {at: 0, text: 'CREVÉ', over: "T'ES H24", pill: 'frérot ?'},
    {at: 1.6, text: 'ZAP', pill: 'cerise noire', view: 'product'},
    {at: 3.0, text: '100 MG', pill: 'de caféine', view: 'close'},
    {at: 4.4, text: 'SUCRE', crossed: true, view: 'product'},
    {at: 5.8, text: 'DUO', pill: '36 sachets', view: 'open'},
    {at: 7.2, text: '87', pill: 'vendus', view: 'stack'},
  ],
  price: {at: 9, now: '10,16 €', old: '14,90 €', pills: ['-32 % Black Friday', 'livraison gratuite']},
  clickAt: 11,
};
