> **ÉCARTÉ le 26/11/2026** : l'utilisateur est revenu au format 2D du début (voir CLAUDE.md). Gardé pour mémoire.

# Méthode — format « T'es H24 fatigué frérot ? » (nouvelle stratégie, 25/11/2026)

> **26/11/2026 — décision utilisateur : visuel « MIX ».** L'utilisateur préfère le GRAPHISME 2D du début
> (fond noir + halo d'accent, Anton à contour sombre, produit qui flotte avec reflet, présentateur cartoon, voix SIMON
> énergique) avec la STRUCTURE ci-dessous (objet problème plein cadre en image 0, plan ~1,1 s, mot géant + pastille,
> prix suspense, objet retourné, CLIQUE tenu 3 s, boucle). Modèle : `src/mix/VideoMix.tsx`, configs `videosmix/`
> (même `build3d`). Voix Simon (défaut, sans `--voice-id`), `tighten.py --tempo` ~1,3 pour ~4 mots/s.
> Le rendu three.js (`src/three/`) reste disponible mais n'est plus le défaut.


Remplace le format motion design 2D (plusieurs vidéos restreintes). Référence visuelle : `produits/_refs-3d/ref-1.mov` et `ref-2.mov`.

## Entrée (envoyée depuis le téléphone)
- Un enregistrement d'écran de la fiche TikTok Shop (+ une photo du produit si possible) → `produits/_recs/`.
- Relever : prix (et prix barré / promo réelle), livraison, note + nombre d'avis, ventes, contenu, mentions de l'emballage / de la fiche.

## Format à respecter
- **15 à 19 s**, voix off seule **Kenzy** (`VOICE_3D` dans `src/brand.ts`, `--voice-id xclXfpLYbMIBNgiHTm8S`) :
  un pote qui parle au spectateur en « tu », **« frérot » dans l'accroche**, 55 à 70 mots, ~4 mots/s
  (`tighten.py --tempo` calculé pour atteindre ~3,8–4 mots/s).
- **Image 0** : le problème en un seul objet 3D plein cadre (`problem` : `battery` batterie vide rouge, `clock` réveil,
  `tag` étiquette prix, `check` croix rouge). À la fin (prix), le même objet retourné (batterie verte, réveil vert…).
- **Studio** : fond noir/bleu nuit, sol sombre brillant (reflet), lignes de lumière horizontales, podium à liseré lumineux,
  une seule couleur d'accent prise sur l'emballage.
- **Un plan toutes les ~1,1 s**, chacun en mouvement (poussée, travelling, contre-plongée, plongée ; vues `product`, `close`,
  `open`, `stack`, `problem`).
- **En haut de chaque plan** : mot-clé géant (Montserrat 900, blanc ; chiffres dans l'accent) + petite pastille de 2–3 mots.
  Pas de sous-titres karaoké.
- **Produit** avec sa vraie étiquette (image détourée de la fiche), gros dans la moitié basse.
- 2–3 arguments chiffrés de la fiche (un par plan), puis note et ventes. Croix rouge (`crossed`) seulement sur ce que
  la fiche dit qu'il n'a pas (sucre, gélatine, gluten, parfum artificiel…).
- **Fin** : « LE PRIX ? » → prix géant + pastilles promo + bouton orange « AJOUTE AU PANIER » + objet retourné
  (tenu ≥ 1,5 s) → « CLIQUE sur le panier » tenu 3 s → les 4 dernières images reviennent sur l'image 0 (boucle).
- **Le présentateur cartoon reste sur le côté** (demande utilisateur, originalité), petit, en bas à gauche, jamais sur le produit.

## Honnêteté (vidéos restreintes avant)
- Uniquement des faits de la fiche / de l'emballage, mots de la marque attribués (« selon la marque », « dans leur étude »,
  conditions de l'étude dans la pastille).
- Allégations UE (créatine, magnésium, vitamine D, biotine/zinc) au mot près. Jamais de mots tabac (voir CLAUDE.md).
- Description TikTok : jamais de classement.

## Technique
- Modèle : `src/three/Video3D.tsx` + `src/three/Studio3D.tsx` (three.js via @remotion/three, rendu `angle`).
- Une vidéo = une entrée `build3d(...)` dans `videos3d/<produit>.ts` (plans calés sur les mots : chaque mot repère est
  cherché APRÈS le plan précédent → plus de piège des mots répétés ; garde-fous si ordre incohérent).
- Voix : `npm run tts -- --video <id> --take 1 --voice-id xclXfpLYbMIBNgiHTm8S` (une seule génération ; si un mot sonne faux,
  `scripts/patch_intro.py`). Lire le solde avant (`npm run eleven:test`).
- Musique : `scripts/gen_music.py` (code, 0 crédit) à la durée exacte.
- Rendu : `node scripts/render.mjs <id>` (~2 min par vidéo), contrôle clignotement / son, planche comparée aux réfs.
- Livraison : `out/<Produit>-<Angle>-3D.mp4` + légende, envoyés dans le chat (pas de Bureau : tout se fait depuis le téléphone).
