export type Word = {word: string; start: number; end: number};
export type Timings = {words: Word[]; durationSec: number};

export type SfxName = 'whoosh' | 'impact' | 'pop' | 'tick' | 'ding' | 'riser';
export type SfxCue = {name: SfxName; at: number; volume?: number};

export type Color = 'accent' | 'white' | 'alert';

/** Mot-clé ou chiffre animé, calé sur la voix (temps en secondes, absolus). */
export type Keyword = {
  text: string;
  at: number;
  /** disparition ; par défaut : apparition du mot-clé suivant de la scène, sinon fin de scène */
  until?: number;
  color?: Color;
  /** taille en px (défaut 150) */
  size?: number;
  /** petit texte en Inter Bold au lieu d'Anton */
  small?: boolean;
  /** secousse caméra + boom */
  impact?: boolean;
  /** position verticale du centre (px depuis le haut). Défaut : zone haute de la scène */
  y?: number;
  /** reste affiché (empilé) au lieu d'être remplacé par le suivant */
  stack?: boolean;
};

type SceneBase = {
  from: number;
  to: number;
  keywords?: Keyword[];
  /** transition d'entrée (défaut : alterne whip / zoom) */
  transition?: 'whip' | 'zoom' | 'none';
};

export type Scene =
  | (SceneBase & {kind: 'hook'})
  | (SceneBase & {
      kind: 'price';
      /** prix affiché, ex. 29.9 */
      price: number;
      doses: number;
      priceAt: number;
      dividerAt: number;
      resultAt: number;
      /** libellé sous le résultat, défaut « LA DOSE » */
      unitLabel?: string;
    })
  | (SceneBase & {kind: 'myth'; statement: string; crossAt: number; verdict?: string})
  | (SceneBase & {
      kind: 'cutaway';
      openAt: number;
      items: {label: string; sub?: string; at: number}[];
    })
  | (SceneBase & {
      kind: 'compare';
      title?: string;
      at: number;
      rows: {label: string; value: number; display: string; highlight?: boolean}[];
    })
  | (SceneBase & {kind: 'benefit'})
  | (SceneBase & {kind: 'cta'; text?: string; arrowAt?: number})
  /** calculatrice poids ÷ dose = nb de doses, puis le sachet s'ouvre et les doses en jaillissent (produit en coupe) */
  | (SceneBase & {
      kind: 'doses';
      weight: number; dose: number; price: number; count: number;
      weightAt: number; priceAt: number; divideAt: number; resultAt: number;
      hideCalcAt?: number;
    })
  /** coupe peau / gras / muscle : l'eau entre dans les fibres, le gras est barré, mot épelé syllabe par syllabe */
  | (SceneBase & {
      kind: 'muscle';
      waterAt: number; inMuscleAt: number; fatCrossAt: number;
      syllables: {text: string; at: number}[];
      syllablesUntil?: number;
    })
  /** jauge de performance + haltères + flocon de neige optionnel */
  | (SceneBase & {kind: 'power'; fillFrom: number; fillTo: number; dumbbells: number[]; snowAt?: number})
  /** défilé des goûts (uniquement des emballages dont on a la photo) */
  | (SceneBase & {kind: 'flavors'; images: string[]; spreadAt: number});

/** Réactions du présentateur. */
export type CharacterAction = 'point' | 'present' | 'shock' | 'faint' | 'slam' | 'hop';
export type CharacterCue = {action: CharacterAction; at: number; duration?: number};

export type CharacterConfig = {
  cues: CharacterCue[];
  /** couleur de la veste (défaut magenta #FF2E88) */
  jacket?: string;
  /** scènes (index) où il est caché pour laisser toute la place au produit */
  hiddenInScenes?: number[];
};

export type VideoConfig = {
  /** identifiant = nom du dossier videos/<nom> (lettres, chiffres, tirets) */
  id: string;
  version: number;
  format: 'prix-choc' | 'idee-recue' | 'en-coupe' | 'comparatif';
  accent: string;
  /** chemins relatifs à public/ */
  productImage: string;
  voice: string;
  music: string;
  timings: Timings;
  scenes: Scene[];
  /** effets ajoutés à la main (en plus des effets automatiques) */
  sfx?: SfxCue[];
  autoSfx?: boolean;
  /** le présentateur (absent = vidéo sans personnage) */
  character?: CharacterConfig;
};
