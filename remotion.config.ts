import {existsSync} from 'node:fs';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setOverwriteOutput(true);

// Environnement cloud : utilise le Chromium déjà installé (sinon Remotion télécharge le sien).
const localChromium = '/opt/pw-browsers/chromium';
if (existsSync(localChromium)) Config.setBrowserExecutable(localChromium);

// Rendu image par image : en parallèle, Chrome lâche parfois l'image du produit (sachet qui clignote).
// Plus lent, mais aucune image sans produit.
Config.setConcurrency(1);
