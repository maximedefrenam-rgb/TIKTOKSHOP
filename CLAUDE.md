# Projet : vidéos TikTok Shop en motion design — nutrition sportive

Compte TikTok qui vend des produits de nutrition sportive (créatine, whey, pré-workout…) via l'affiliation TikTok Shop.
Vidéos 100 % motion design (Remotion), voix off ElevenLabs, sons et musique générés par code.
Public : 18–30 ans qui font de la muscu.

## Le présentateur (personnage principal)
Animateur de téléachat cartoon, présent dans chaque vidéo. Composant : `src/components/Character.tsx`.

- **Look** : cartoon 2D flat, contours épais, clairement fictif, jamais réaliste. Veste à paillettes flashy
  (magenta `#FF2E88` par défaut, réglable via `character.jacket`), chemise ouverte, chaîne en or,
  banane gominée brillante, sourire immense avec dents qui brillent (petite étincelle), micro rétro à la main.
- **Caractère** : surexcité, en fait des tonnes. Réactions exagérées : yeux qui sortent des orbites,
  s'évanouit de bonheur, frappe le sol. (Pas de chute à la renverse : abandonné.)
- **Parole** : TUTOIEMENT, pour viser directement le spectateur. Énergie de présentateur de téléachat jouée en parodie,
  mais il parle comme un pote de salle qui s'y connaît : direct, drôle, un peu trash (quelques gros mots légers),
  écarts familiers pour l'humour (« pas dans le bide ! »). Jamais « vendeur de tapis » au premier degré.
- **Réactions disponibles** (`character.cues`, calées sur un mot) : `shock` (yeux exorbités),
  `faint` (s'évanouit, cœurs), `slam` (frappe le sol, secousse + boom), `point` (montre le produit),
  `present` (présente), `hop` (petit saut). Bruitages automatiques. La bouche bouge sur les mots de la voix.
- Placé en bas à gauche ; le produit est alors décalé à droite. `hiddenInScenes` pour le cacher sur une scène.
- Voix : Simon (jeune, hyper énergique), voir section ElevenLabs.

## Déroulé pour chaque nouvelle vidéo
Dossier fourni : `produits/<nom>/` avec photo(s) packshot, `infos.md` (nom exact, prix, poids, doses, goûts, commission,
livraison, mentions de l'emballage), parfois `script.md` validé.

1. Lire `infos.md`.
2. Sans script validé : proposer 2 scripts et 2 accroches différentes. **Attendre le choix.**
3. Générer la voix (2 prises) et laisser choisir : `npm run tts -- --video <nom> --take 1` puis `--take 2`,
   puis `npm run take -- <nom> <n>`.
4. Timing de chaque mot (endpoint « with timestamps », sinon `scripts/transcribe.py` faster-whisper small fr).
5. Musique : `npm run music -- --video <nom>` (sons : bibliothèque `public/sfx/` déjà prête).
6. Construire `videos/<nom>/config.ts` à partir du modèle et l'ajouter à `videos/index.ts`.
7. Aperçu `npx remotion studio` et **attendre l'accord**.
8. Rendu final `npm run render -- <nom>` puis vérifier soi-même les images clés (0,5 s, ~5 s, milieu, 3/4, fin) dans `out/frames/`.
9. Légende TikTok prête à coller.
10. Ajouter une ligne dans `suivi.md`.

## Règles d'écriture des scripts
- 25 à 35 s, soit ~75 à 95 mots (jusqu'à 40 s accepté par l'utilisateur pour la créatine n°1).
- Toujours passer les prises dans `python3 scripts/tighten.py --video <nom> --take <n>` (débit rapide par défaut :
  silences et respirations max 0,10 s, tempo ×1,18). Il raccourcit les silences
  (rires et souffles conservés) et accélère légèrement, sans régénérer (0 crédit). Originaux gardés en `*-brut.*`.
- 5 temps : accroche (0–2 s) → problème ou prix (2–8 s) → explication animée (8–20 s) → bénéfice autorisé (20–28 s)
  → appel à l'action vers le panier orange (28 s–fin).
- Accroche choc dans les 2 premières secondes : chiffre fort ou idée reçue à casser.
- Phrases courtes, langage parlé, tutoiement.
- **Retour utilisateur après la vidéo n°1** : parler PLUS VITE et PLUS DIRECT. Le bénéfice doit être compris tout de suite,
  sans détour. Oser des punchlines trash qui interpellent le spectateur, du style « arrête d'avoir un putain de … »
  (gros mots assumés, c'est ce qui marche sur TikTok). Peu de « ... » (ils créent de longs silences).
- **Retour utilisateur (vidéo n°2)** : les arguments qui VENDENT (prix, promo, livraison gratuite) le plus tôt possible.
  Accroches de stupéfaction façon « WHAT THE FUCK ?! Qui a validé ce prix ?! » (esprit « le stagiaire s'est trompé »),
  mais sans affirmer une fausse erreur de prix ni un faux stock limité. Achat impulsif : promo réelle, prix barré, prix par dose.
- **PAS d'humour noir** (essayé sur créatine / ZAP / autobronzant : jugé nul par l'utilisateur). Ce qui marche pour lui :
  l'interpellation trash directe (« blanc comme un CUL », « arrête de … putain »), la stupéfaction sur le prix (« wsh / WTF,
  qui a validé ce prix ?! »), les situations du quotidien exagérées (« Maldives / Guingamp », « garde ton fric pour ton poulet-riz »).
  Garde-fou : une punchline ne doit jamais suggérer un effet non autorisé (ex. pour la créatine, pas de promesse
  de prise de muscle ou de perte de gras ; pour les protéines, « masse musculaire » est autorisé).

## Allégations (règles UE compléments alimentaires)
Seules les allégations santé autorisées par l'UE :
- Protéines : « contribuent à augmenter la masse musculaire » / « contribuent au maintien de la masse musculaire ».
- Créatine (3 g/jour) : « augmente la performance physique lors d'exercices courts et intenses répétés ».
- Tout autre produit / ingrédient : uniquement l'allégation écrite sur l'emballage ou la fiche, sinon demander.
- Caféine (sachets ZAP…) : « énergie » AUTORISÉ par l'utilisateur, ton pub (« l'énergie qui monte », « dans ta zone ») —
  c'est le nom du produit (« sachets énergétiques / energy pouches ») ; jamais « illimitée » ni promesse chiffrée. Sinon des faits
  (mg par dose, comparaison chiffrée avec un expresso ≈ 80 mg selon l'EFSA) et des moments d'usage. Jamais d'incitation
  à la nuit blanche ou à enchaîner les doses. Mention à l'écran : « Contient de la caféine (… mg). Déconseillé aux enfants
  et aux femmes enceintes ou allaitantes » (à aligner sur le verso de l'emballage).
- **Mots interdits TikTok (vidéo ZAP « C'est pas du snus » restreinte)** : jamais « snus », « nicotine », « tabac »,
  « cigarette », « vape », même pour dire « ce n'est PAS du… » ni « zéro nicotine ». Pour les sachets de caféine : angle prix,
  comparaison avec un expresso, moments d'usage. « Sous la lèvre » est autorisé (validé par l'utilisateur).
- Les réactions du personnage ne doivent jamais suggérer un effet non autorisé.

## ElevenLabs
- Clé : variable d'environnement `ELEVENLABS_API_KEY` (sinon `.env`). Ne jamais l'écrire dans le code ni l'afficher.
  `.env` est dans `.gitignore`. La clé n'a pas la permission `user_read` (solde non consultable).
- Dans l'environnement cloud, Node doit passer par le proxy : utiliser les commandes `npm run` (elles ajoutent `NODE_USE_ENV_PROXY=1`).
- Modèle par défaut `eleven_v3` avec balises d'émotion : `[excited]`, `[enthusiastic]`, `[laughs]`, `[serious]`.
- Secours `eleven_multilingual_v2` (stability 0.30, similarity 0.75, style 0.50, speed 1.05) : `--fallback`, balises retirées.
- Voix du compte : **Simon** (« Cheerful, Energetic and Rapid », jeune, parisien, hyper énergique),
  `voiceId` `mvhJVdVoTWVUtL4keT7W`, enregistré dans `src/brand.ts`. Toujours réutiliser cette voix.
- Nombres en lettres, MAJUSCULES sur les mots à appuyer, « ... » pour les pauses.
- **Jamais d'argot de 2–4 lettres en MAJUSCULES** (« WSH » a été épelé W-S-H) : écrire « wesh », « wtf » → « ouatte-de-fuck »
  si besoin ; les MAJUSCULES seulement sur des mots normaux. Pour corriger un mot sans tout régénérer :
  `scripts/patch_intro.py` (remplace le début de la voix par un extrait de quelques caractères).
- **ÉMOTION MAXIMALE, collée au script** : une balise d'émotion à chaque changement d'intention (quasiment chaque phrase),
  choisie selon ce qui se passe : `[excited]`, `[enthusiastic]`, `[shouting]` (prix choc, CTA), `[gasps]` / `[amazed]` (révélation),
  `[laughs]` / `[chuckles]` (vanne), `[sarcastic]` (idée reçue cassée), `[whispers]` (confidence, « entre nous... »),
  `[serious]` (allégation autorisée, dite avec aplomb), `[mischievously]`. Ponctuation expressive (« ?! », « ... »),
  interjections parlées (« Attends... », « Nan mais ALLÔ ! »). Les réactions du personnage tombent sur les mêmes mots.
- **Pas de blancs entre les phrases** (retour vidéo n°2) : enchaîner les phrases avec des virgules plutôt que des points,
  pas de « ... » ; balises qui changent le TON (`[excited]`, `[shouting]`, `[sarcastic]`, `[mischievously]`) plutôt que
  celles qui ajoutent un BRUIT (`[laughs]`, `[gasps]`, `[sighs]` : 1 seule par vidéo maximum, ils créent ~0,3–0,6 s de trou).
  `tighten.py` raccourcit aussi les respirations entre les mots (blanc max 0,10 s).
- Prises : la prise 1 en stabilité 0 (« Creative », émotion maximale), la prise 2 en 0.5 (« Natural », plus fiable) ;
  l'utilisateur choisit.
- Économiser les crédits : pas de régénération sans raison. Budget outils total ~50 €/mois.

## Direction artistique (identique partout)
- Fond noir `#0B0B0F`, léger dégradé radial de l'accent au centre, grain subtil.
- Accent = couleur dominante de l'emballage (défaut jaune `#FFD60A`). Texte blanc. Croix/alertes rouge `#FF3B30`.
- Polices : Anton (titres, chiffres), Inter Bold (petits textes) via @remotion/google-fonts.
- Animations énergiques en `spring()` avec léger dépassement, secousse caméra sur les impacts,
  transitions whip pan / zoom traversant de 6 à 10 images.
- Produit JAMAIS immobile : flottement, rotateY entre -12° et 12°, reflet qui le balaie, ombre douce.
- Aucune animation en boucle visible. Pas de sous-titres complets : mots-clés et chiffres calés sur la voix.
- Signature : au moins un « produit en coupe » par vidéo (scène `cutaway`).

## Formats
1. Prix choc (prix par dose). 2. Idée reçue. 3. Produit en coupe. 4. Comparatif (vs moyenne, sans nommer de concurrent).

## Règles TikTok Shop
- Produit visible dans les 2 premières secondes et dans la majorité des scènes.
- Ne jamais déformer, recolorer ni modifier l'emballage ; ne jamais inventer un emballage (autre goût…) sans photo.
- Le texte à l'écran ne promet jamais plus que la voix.
- Aucun texte important dans les 250 px du bas ni les 150 px de droite.

## Sons et musique
- Effets : `public/sfx/` (whoosh, impact, pop, tick, ding, riser) générés par `scripts/gen_sfx.py`, réutilisés partout.
- Musique : nouvelle par vidéo, électro 120–130 BPM, tonalité / rythme variés (seed), durée = vidéo, fondu final.
- Mixage : voix 1 ; musique ~0,12 baissée à 0,07 quand la voix parle ; effets 0,3–0,6.

## Organisation technique
- Remotion TypeScript, 1080x1920, 30 fps, durée = voix + 0,5 s.
- Modèle : `src/templates/ShopVideo.tsx` ; scènes : `src/components/Scenes.tsx` ; identité : `src/brand.ts`.
- Types de scènes : `hook`, `price`, `myth`, `cutaway`, `compare`, `benefit`, `cta` (Scenes.tsx) et
  `doses` (calculatrice + sachet qui s'ouvre et libère les doses = produit en coupe), `muscle` (coupe peau/gras/muscle,
  eau dans les fibres, mot épelé), `power` (jauge + haltères + flocon), `flavors` (défilé des goûts photographiés),
  `deal` (badge promo, prix barré + tampon, nouveau prix), `usage` (salle / manette puis canette barrée) (Scenes2.tsx).
  `productScale` dans la config pour les emballages larges (boîte ronde : 0.74).
  Exemple complet : `videos/creatine-ostrovit-citron/config.ts`.
- Rendu en `concurrency 1` (remotion.config.ts) : en parallèle, Chrome faisait clignoter l'image du produit.
  Un rendu de 40 s prend ~5 min. Le script de rendu ajoute un limiteur audio (pas de saturation sur les impacts).
- Config par vidéo : `videos/<nom>/config.ts` (exemple complet : `videos/demo-modele/`, démo interne à ne jamais publier).
- Médias par vidéo : `public/videos/<nom>/` (produit, voice.mp3, timings.json, music.wav).
- Rendus : `out/<nom>-v<n>.mp4` en H.264.
- Photo sans fond transparent : détourer avec `scripts/detoure.py` (rembg), en gardant l'original.

## Livrables
1. `out/<nom>-v<n>.mp4`.
2. `out/<nom>-legende.txt` : description < 150 caractères + 3 à 5 hashtags (#creatine, #muscu, #tiktokshop…).
3. Rappel : cocher « contenu généré par IA » et rattacher le produit au moment de publier.

## Suivi
`suivi.md` : date, produit, format, accroche, version. Colonnes vues / ventes / remarques laissées vides.
