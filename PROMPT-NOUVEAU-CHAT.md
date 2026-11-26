Projet TikTok Shop (vidéos d'affiliation). Tout le travail est sur la branche `claude/funny-fermat-b82n67`
du dépôt maximedefrenam-rgb/TIKTOKSHOP : fais `git fetch origin claude/funny-fermat-b82n67 && git checkout claude/funny-fermat-b82n67`,
puis lis `CLAUDE.md` en entier (toutes les règles y sont) et `suivi.md` (vidéos déjà faites).

Résumé des règles :
- FORMAT : motion design 2D « du début » (Remotion, `src/templates/ShopVideo.tsx`, scènes `src/components/Scenes.tsx` +
  `Scenes2.tsx`, exemple `videos/creatine-ostrovit-citron/config.ts` ; variantes rapides via `src/lib/variant.ts` +
  `videos/variantes/*.ts`). Fond noir + halo de la couleur du paquet, police Anton, produit qui flotte, présentateur cartoon
  en bas à gauche, scène « produit en coupe », prix barré, panier orange. Le format 3D et le « mix » sont écartés.
- PRODUIT VISIBLE DÈS LA PREMIÈRE IMAGE.
- VOIX : ElevenLabs, voix Simon (par défaut), modèle eleven_v3, tutoiement, ton pote de salle énergique, émotion maximale,
  aucun blanc (`scripts/tighten.py`). Clé dans la variable ELEVENLABS_API_KEY (ne jamais l'afficher) ; commandes `npm run`
  (proxy). Lire le solde avant (`npm run eleven:test`), économiser les crédits (une prise suffit en général).
- SCRIPTS : accroche qui interpelle dès la 1re seconde (« wesh / arrête de… putain / qui a validé ce prix ?! »),
  arguments de vente (prix, promo, livraison) tôt, ~20–30 s. Pas d'humour noir.
- HONNÊTETÉ (des vidéos ont été restreintes) : uniquement les faits de la fiche ; affirmations de la marque attribuées
  (« selon la marque », conditions d'une étude à l'écran) ; allégations UE au mot près (créatine 3 g, protéines, magnésium,
  vitamine D…) ; jamais « snus / nicotine / tabac / cigarette / vape » ; jamais promettre de soigner (calvitie…).
- LIVRAISON : je veux tout d'un coup (script + voix + vidéo + légende) ; vérifie toi-même les images clés avant de livrer ;
  légende < 150 caractères + 3–5 hashtags, JAMAIS de classement (« n°1 », « 4e au classement ») dans la description ;
  ligne dans `suivi.md` ; commit + push ; envoie les vidéos dans le chat. Rappel : cocher « contenu généré par IA ».
- ENTRÉE : je t'envoie des captures d'écran de la fiche TikTok Shop (haut de fiche, note/ventes, photos du carrousel,
  composition, verso) + une photo du produit si possible.

Produits déjà faits (captures et produits détourés dans `produits/` et `public/videos/`) : créatine OstroVit, ZAP cerise
noire, Vitavea autobronzant, Novoma collagène, Lashilé Good Hair, Medicube toner pads, Karacare Hair Boost,
Nuclever Cortisol Manager.

Attends mes instructions pour la suite.
