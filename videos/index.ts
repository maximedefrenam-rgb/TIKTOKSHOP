/** Registre des vidéos : ajouter une ligne par nouvelle vidéo. */
import type {VideoConfig} from '../src/types';
import {config as demo} from './demo-modele/config';
import {config as creatineCitron} from './creatine-ostrovit-citron/config';
import {config as zapCerise} from './zap-cerise-noire-duo/config';
import {config as vitaveaAutobronzant} from './vitavea-autobronzant/config';
import {config as creatineBraquage} from './creatine-ostrovit-braquage/config';
import {config as zapSnus} from './zap-pas-du-snus/config';
import {config as vitaveaPromo} from './vitavea-promo/config';

export const VIDEOS: VideoConfig[] = [demo, creatineCitron, zapCerise, vitaveaAutobronzant, creatineBraquage, zapSnus, vitaveaPromo];
