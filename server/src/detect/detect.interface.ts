/* eslint-disable @typescript-eslint/no-empty-interface */

export interface CotohaParsingResponse {
  result: ParsingResult[];
  status: number;
  message: string;
}

export interface ParsingResult {
  chunk_info: ChunkInfo;
  tokens: Token[];
}

export interface ChunkInfo {
  id: number;
  head: number;
  dep: string;
  chunk_head: number;
  chunk_func: number;
  links: Link[];
  predicate: string[];
}

export interface Link {
  link: number;
  label: LinkLabel;
}

export type LinkLabel =
  | 'agent'
  // An entity that causes intentional act
  // 私がうどんを食べる。
  | 'agentnonvoluntary'
  // Agent that causes non intentional act
  // 森が自然の大切さを教えてくれた。
  | 'coagent'
  // Subject that acts together with agent
  // 太郎は花子と結婚した。
  | 'aobject'
  // Object that has an attribute
  // 花がきれい。
  | 'object'
  // Object affected by action and change
  // 私がうどんを食べる。
  | 'implement'
  // Means and instruments used for intentional act
  // バットでたたく。
  | 'source'
  // Subject of the event or first position of object
  // プレゼントを友達からもらった。
  | 'material'
  // Material or component
  // ビーズでアクセサリーを作る。
  | 'goal'
  // Subject of the event or last position of object
  // 東京に行く。
  | 'beneficiary'
  // Destination of benefit and disadvantage
  // 友達にプレゼントをあげる。
  | 'place'
  // Place where the event happens
  // 公園で遊ぶ。
  | 'scene'
  // Scene where event happens
  // ドラマで演じる。
  | 'manner'
  // How to act and change
  // 和やかにする。
  | 'time'
  // Time when the event occurs
  // 7時に起きる。
  | 'timefrom'
  // Time when the event starts
  // 朝から晩まで働く。
  | 'timeto'
  // Time when the event ends
  // 朝から晩まで働く。
  | 'basis'
  // Standard crtiteria
  // アメリカと比べて
  | 'unit'
  // Unit
  // 100グラム単位で売っている。
  | 'fromto'
  // Range
  // 4巻まで発売されています。
  | 'purpose'
  // Purpose
  // 遊びに出かける
  | 'condition'
  // Condition for circumstances.
  // 雨なので家に帰った。
  | 'adjectivals'
  // Adjectivals
  // 可愛い姪。
  | 'adverbials'
  // Adverbials
  | 'other';
// Other

export interface Token {
  id: number;
  form: string;
  kana: string;
  lemma: string;
  pos: string;
  features: string[];
  dependency_labels?: DependencyLabel[];
  attributes: Attributes;
}

export interface Attributes {}

export interface DependencyLabel {
  token_id: number;
  label: string;
}
