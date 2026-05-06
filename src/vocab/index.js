// ════════════════════════════════════════
//  語彙インデックス
//  新規語彙を追加する場合:
//    1. vocab_vol2.js を新規作成
//    2. 下記に import と spread を追記するだけでOK
//    3. vocab_vol1.js は変更しない
// ════════════════════════════════════════

import { vocabWords_vol1, vocabVisuals_vol1 } from './vocab_vol1';
// 将来の追加例:
// import { vocabWords_vol2, vocabVisuals_vol2 } from './vocab_vol2';

export const vocabularyData = [
  ...vocabWords_vol1,
  // ...vocabWords_vol2,
];

export const wordVisuals = {
  ...vocabVisuals_vol1,
  // ...vocabVisuals_vol2,
};
