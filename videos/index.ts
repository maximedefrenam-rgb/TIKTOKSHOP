/** Registre des vidéos : ajouter une ligne par nouvelle vidéo. */
import type {VideoConfig} from '../src/types';
import {config as demo} from './demo-modele/config';
import {config as creatineCitron} from './creatine-ostrovit-citron/config';
import {config as zapCerise} from './zap-cerise-noire-duo/config';
import {config as vitaveaAutobronzant} from './vitavea-autobronzant/config';
import {config as creatineBraquage} from './creatine-ostrovit-braquage/config';
import {config as zapSnus} from './zap-pas-du-snus/config';
import {config as vitaveaPromo} from './vitavea-promo/config';
import {config as novomaDonne} from './novoma-donne/config';
import {config as novomaSquat} from './novoma-squat/config';
import {config as zapCreve} from './zap-creve/config';
import {config as lashileFleurs} from './lashile-fleurs/config';
import {config as lashileBaddies} from './lashile-baddies/config';
import {config as medicubePointsNoirs} from './medicube-points-noirs/config';
import {config as medicubePromo} from './medicube-promo/config';
import {config as karacareCasquette} from './karacare-casquette/config';
import {config as karacareFilles} from './karacare-filles/config';

export const VIDEOS: VideoConfig[] = [demo, creatineCitron, zapCerise, vitaveaAutobronzant, creatineBraquage, zapSnus, vitaveaPromo, novomaDonne, novomaSquat, zapCreve, lashileFleurs, lashileBaddies, medicubePointsNoirs, medicubePromo, karacareCasquette, karacareFilles];
