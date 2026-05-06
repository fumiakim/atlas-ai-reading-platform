import React, { useState, useEffect } from 'react';
import './App.css';

const wordVisuals = {
  b01:{ e1:'✨', e2:'👁️',  bg:'#E3F2FD', ac:'#1565C0', tags:['引き付ける','魅了','注目'] },
  b02:{ e1:'🤔', e2:'❓',  bg:'#F3E5F5', ac:'#6A1B9A', tags:['疑念','懐疑','不信'] },
  b03:{ e1:'🌟', e2:'😲',  bg:'#FFFDE7', ac:'#F57F17', tags:['驚異','称賛','驚嘆'] },
  b04:{ e1:'🎭', e2:'🌫️',  bg:'#EDE7F6', ac:'#4527A0', tags:['幻想','錯覚','虚偽'] },
  b05:{ e1:'✅', e2:'🔎',  bg:'#E8F5E9', ac:'#1B5E20', tags:['確認','検証','承認'] },
  b06:{ e1:'🚀', e2:'⚙️',  bg:'#E3F2FD', ac:'#0D47A1', tags:['展開','稼働','実装'] },
  b07:{ e1:'🏗️', e2:'🧱',  bg:'#FFF3E0', ac:'#E65100', tags:['構築','作成','組立'] },
  b08:{ e1:'⚖️', e2:'🟰',  bg:'#ECEFF1', ac:'#37474F', tags:['中立','偏りなし','公平'] },
  b09:{ e1:'🔍', e2:'🔬',  bg:'#E0F7FA', ac:'#006064', tags:['調査','検討','探索'] },
  b10:{ e1:'🌱', e2:'⬆️',  bg:'#E8F5E9', ac:'#2E7D32', tags:['出現','発生','台頭'] },
  b11:{ e1:'🔒', e2:'⛓️',  bg:'#FFEBEE', ac:'#B71C1C', tags:['制限','束縛','制約'] },
  b12:{ e1:'📏', e2:'🌐',  bg:'#E3F2FD', ac:'#1565C0', tags:['規模','大きさ','範囲'] },
  b13:{ e1:'🗂️', e2:'🏷️',  bg:'#FFF3E0', ac:'#BF360C', tags:['分類','整理','グループ化'] },
  b14:{ e1:'🌊', e2:'💭',  bg:'#E0F2F1', ac:'#00695C', tags:['深い','洞察','重大'] },
  b15:{ e1:'🎪', e2:'👀',  bg:'#F3E5F5', ac:'#6A1B9A', tags:['見世物','公演','注目'] },
  b16:{ e1:'🏛️', e2:'⭐',  bg:'#FFFDE7', ac:'#F57F17', tags:['象徴','代表','有名'] },
  b17:{ e1:'🦅', e2:'🌤️',  bg:'#E1F5FE', ac:'#01579B', tags:['空中','飛行','上空'] },
  b18:{ e1:'📉', e2:'⬇️',  bg:'#FFEBEE', ac:'#C62828', tags:['劣化','悪化','低下'] },
  b19:{ e1:'⛰️', e2:'🌾',  bg:'#EFEBE9', ac:'#4E342E', tags:['地形','土地','地域'] },
  b20:{ e1:'🗺️', e2:'🚶',  bg:'#E0F7FA', ac:'#00695C', tags:['横断','越える','旅'] },
  b21:{ e1:'🔽', e2:'🌫️',  bg:'#FFF3E0', ac:'#E65100', tags:['縮小','減少','弱まる'] },
  b22:{ e1:'📦', e2:'🔄',  bg:'#EFEBE9', ac:'#5D4037', tags:['物流','管理','調整'] },
  b23:{ e1:'🏠', e2:'➡️',  bg:'#E3F2FD', ac:'#0D47A1', tags:['隣接','近接','接続'] },
  b24:{ e1:'🔲', e2:'📐',  bg:'#E0F7FA', ac:'#006064', tags:['境界','端','外周'] },
  b25:{ e1:'📡', e2:'🌊',  bg:'#FFF3E0', ac:'#E65100', tags:['拡散','伝達','広める'] },
  b26:{ e1:'⏱️', e2:'❗',  bg:'#FFEBEE', ac:'#B71C1C', tags:['時点','重大','決定的'] },
  b27:{ e1:'🏛️', e2:'🪨',  bg:'#ECEFF1', ac:'#37474F', tags:['基盤','基礎','根本'] },
  b28:{ e1:'🧩', e2:'🗃️',  bg:'#EDE7F6', ac:'#4527A0', tags:['集合','組合せ','集まり'] },
  b29:{ e1:'🌈', e2:'💎',  bg:'#FCE4EC', ac:'#880E4F', tags:['玉虫色','光輝','虹色'] },
  b30:{ e1:'🪫', e2:'📉',  bg:'#FFEBEE', ac:'#B71C1C', tags:['枯渇','使い切り','減少'] },
  i01:{ e1:'🎯', e2:'❌',  bg:'#FFF3E0', ac:'#E65100', tags:['意図せず','偶然','不注意'] },
  i02:{ e1:'🤖', e2:'❤️',  bg:'#EDE7F6', ac:'#6A1B9A', tags:['擬人化','人間的','投影'] },
  i03:{ e1:'💡', e2:'❓',  bg:'#FFFDE7', ac:'#F57F17', tags:['仮説','推測','検証待ち'] },
  i04:{ e1:'💯', e2:'🔷',  bg:'#E3F2FD', ac:'#0D47A1', tags:['自明','当然','公理'] },
  i05:{ e1:'📋', e2:'🏛️',  bg:'#E8F5E9', ac:'#1B5E20', tags:['公式化','制度化','整備'] },
  i06:{ e1:'👁️', e2:'🔎',  bg:'#E0F7FA', ac:'#006064', tags:['識別','認識','見分ける'] },
  i07:{ e1:'🏷️', e2:'📚',  bg:'#FFF3E0', ac:'#BF360C', tags:['命名法','用語体系','分野名'] },
  i08:{ e1:'📈', e2:'🐢',  bg:'#E8F5E9', ac:'#2E7D32', tags:['段階的','漸進的','少しずつ'] },
  i09:{ e1:'🔀', e2:'≠',   bg:'#EDE7F6', ac:'#4527A0', tags:['異質','相違','比較不能'] },
  i10:{ e1:'🤝', e2:'🛑',  bg:'#E3F2FD', ac:'#1565C0', tags:['介入','干渉','改善'] },
  i11:{ e1:'⚡', e2:'💰',  bg:'#FFEBEE', ac:'#B71C1C', tags:['搾取','不正利用','悪用'] },
  i12:{ e1:'⚔️', e2:'💬',  bg:'#FFEBEE', ac:'#C62828', tags:['議論','異議','反論'] },
  i13:{ e1:'🔐', e2:'©️',  bg:'#E3F2FD', ac:'#0D47A1', tags:['独占','専有','非公開'] },
  i14:{ e1:'🌐', e2:'🫂',  bg:'#E3F2FD', ac:'#1565C0', tags:['包含','網羅','囲む'] },
  i15:{ e1:'📊', e2:'🆙',  bg:'#FFF3E0', ac:'#E65100', tags:['過大','不釣合い','超過'] },
  i16:{ e1:'👤', e2:'✨',  bg:'#EDE7F6', ac:'#6A1B9A', tags:['体現','具現化','表現'] },
  i17:{ e1:'🔖', e2:'🏛️',  bg:'#FFFDE7', ac:'#F57F17', tags:['公認','承認','権威印'] },
  i18:{ e1:'👑', e2:'⬇️',  bg:'#4A148C', ac:'#CE93D8', tags:['覇権','支配','主導'] },
  i19:{ e1:'🔗', e2:'🧶',  bg:'#E0F7FA', ac:'#006064', tags:['絡み合う','連結','織込み'] },
  i20:{ e1:'📚', e2:'🗂️',  bg:'#EFEBE9', ac:'#4E342E', tags:['概要集','総覧','包括的'] },
  i21:{ e1:'🧸', e2:'🔄',  bg:'#FFFDE7', ac:'#F57F17', tags:['柔軟性','可変性','適応性'] },
  i22:{ e1:'🐠', e2:'🪟',  bg:'#E1F5FE', ac:'#01579B', tags:['重なり合う','瓦状','層状'] },
  i23:{ e1:'⚔️', e2:'🏭',  bg:'#E8F5E9', ac:'#1B5E20', tags:['軍備化','武装','軍事化'] },
  i24:{ e1:'💸', e2:'✂️',  bg:'#ECEFF1', ac:'#37474F', tags:['緊縮','削減','倹約'] },
  i25:{ e1:'🌑', e2:'🏚️',  bg:'#212121', ac:'#B0BEC5', tags:['暗黒','抑圧','不公正'] },
  i26:{ e1:'⚖️', e2:'↔️',  bg:'#EDE7F6', ac:'#6A1B9A', tags:['非対称','不均衡','偏り'] },
  i27:{ e1:'🎨', e2:'💭',  bg:'#E0F7FA', ac:'#006064', tags:['抽象化','概念化','観念'] },
  i28:{ e1:'✨', e2:'👁️',  bg:'#FFFDE7', ac:'#F9A825', tags:['顕現','表れ','具体化'] },
  i29:{ e1:'🔄', e2:'🛠️',  bg:'#E3F2FD', ac:'#0D47A1', tags:['再構成','再編成','改変'] },
  i30:{ e1:'🌳', e2:'❌',  bg:'#EFEBE9', ac:'#4E342E', tags:['根こそぎ','引き離し','追放'] },
  i31:{ e1:'📉', e2:'💧',  bg:'#FFEBEE', ac:'#B71C1C', tags:['段階的減少','枯渇','取崩し'] },
  i32:{ e1:'♾️', e2:'🔁',  bg:'#E3F2FD', ac:'#1565C0', tags:['継続','持続','永続化'] },
  i33:{ e1:'🌍', e2:'🌐',  bg:'#E3F2FD', ac:'#0D47A1', tags:['地球規模','惑星的','全球'] },
  i34:{ e1:'🏔️', e2:'📐',  bg:'#EFEBE9', ac:'#4E342E', tags:['層化','階層','地層'] },
  i35:{ e1:'💰', e2:'🚫',  bg:'#FFEBEE', ac:'#B71C1C', tags:['予算削減','撤退','資金停止'] },
  i36:{ e1:'💻', e2:'👔',  bg:'#E3F2FD', ac:'#1565C0', tags:['技術官僚','専門家支配','技術主導'] },
  i37:{ e1:'🎲', e2:'💭',  bg:'#FFF3E0', ac:'#E65100', tags:['投機的','推測的','リスク'] },
  i38:{ e1:'🍞', e2:'⬇️',  bg:'#EFEBE9', ac:'#5D4037', tags:['最低限','ぎりぎり','生存維持'] },
  i39:{ e1:'🌐', e2:'⚔️',  bg:'#E8EAF6', ac:'#283593', tags:['地政学','国際政治','地理政治'] },
  i40:{ e1:'💹', e2:'🏦',  bg:'#E8F5E9', ac:'#1B5E20', tags:['資本化','市場価値','資本活用'] },
  a01:{ e1:'🧠', e2:'📖',  bg:'#EDE7F6', ac:'#4527A0', tags:['認識論','知識理論','知の研究'] },
  a02:{ e1:'🧬', e2:'⚠️',  bg:'#FFEBEE', ac:'#B71C1C', tags:['優生学','遺伝操作','生殖管理'] },
  a03:{ e1:'👁️', e2:'🎭',  bg:'#EDE7F6', ac:'#6A1B9A', tags:['主観性','個人的視点','主観'] },
  a04:{ e1:'⚖️', e2:'🚫',  bg:'#FFEBEE', ac:'#C62828', tags:['超法規的','法外','法を超える'] },
  a05:{ e1:'🔷', e2:'💎',  bg:'#E0F7FA', ac:'#006064', tags:['物化','具体化','固定化'] },
  a06:{ e1:'🗻', e2:'📍',  bg:'#EFEBE9', ac:'#4E342E', tags:['地形','地勢','構造'] },
  a07:{ e1:'🗺️', e2:'✏️',  bg:'#E3F2FD', ac:'#1565C0', tags:['地図製作','地図学','製図'] },
  a08:{ e1:'🏴', e2:'➡️',  bg:'#1A237E', ac:'#90CAF9', tags:['植民地衝動','支配拡大','征服'] },
  a09:{ e1:'📏', e2:'💡',  bg:'#E3F2FD', ac:'#1565C0', tags:['規範的','基準設定','あるべき姿'] },
  a10:{ e1:'🧮', e2:'💡',  bg:'#E0F7FA', ac:'#006064', tags:['合理性','理性','論理的'] },
  a11:{ e1:'🎯', e2:'📌',  bg:'#EDE7F6', ac:'#6A1B9A', tags:['本質化','固定化','単純化'] },
  a12:{ e1:'👁️', e2:'⚡',  bg:'#FFFDE7', ac:'#F57F17', tags:['一応','一見','証明前'] },
  a13:{ e1:'🗺️', e2:'✝️',  bg:'#EFEBE9', ac:'#5D4037', tags:['中世地図','世界観図','宗教地図'] },
  a14:{ e1:'👥', e2:'💻',  bg:'#E3F2FD', ac:'#1565C0', tags:['社会技術的','社会×技術','相互作用'] },
  a15:{ e1:'💻', e2:'⚡',  bg:'#E8EAF6', ac:'#283593', tags:['計算集約','処理負荷','高負荷'] },
  a16:{ e1:'☢️', e2:'🔥',  bg:'#FFEBEE', ac:'#B71C1C', tags:['熱核','核融合','高温核反応'] },
  a17:{ e1:'💎', e2:'⛏️',  bg:'#E0F7FA', ac:'#006064', tags:['鉱物学','鉱石研究','鉱物科学'] },
  a18:{ e1:'⬇️', e2:'⚠️',  bg:'#FFF3E0', ac:'#E65100', tags:['不利益','損害原因','悪化要因'] },
  a19:{ e1:'🌊', e2:'🚢',  bg:'#E1F5FE', ac:'#01579B', tags:['大洋横断','海越え','越洋'] },
  a20:{ e1:'🌡️', e2:'🌍',  bg:'#E0F7FA', ac:'#006064', tags:['気候学的','気候研究','長期気候'] },
  a21:{ e1:'⛽', e2:'❌',  bg:'#FFF3E0', ac:'#BF360C', tags:['再生不可能','枯渇資源','有限'] },
  a22:{ e1:'📝', e2:'🏛️',  bg:'#E8EAF6', ac:'#283593', tags:['報告者','調査報告','任命委員'] },
  a23:{ e1:'🏢', e2:'💰',  bg:'#37474F', ac:'#B0BEC5', tags:['巨大企業','超大企業','多国籍'] },
  a24:{ e1:'⚖️', e2:'🧮',  bg:'#E3F2FD', ac:'#1565C0', tags:['論理体系','推論','計算法'] },
  a25:{ e1:'🧠', e2:'🚫',  bg:'#ECEFF1', ac:'#37474F', tags:['戦略的忘却','都合の悪い記憶','選択的忘却'] },
  a26:{ e1:'🔀', e2:'🌀',  bg:'#EDE7F6', ac:'#6A1B9A', tags:['無差別','乱雑','選択なし'] },
  a27:{ e1:'🔄', e2:'⛔',  bg:'#FFEBEE', ac:'#B71C1C', tags:['解決不能','行き詰まり','出口なし'] },
  a28:{ e1:'🔗', e2:'🌐',  bg:'#E3F2FD', ac:'#1565C0', tags:['超システム','複合システム','統合体'] },
  a29:{ e1:'👻', e2:'💨',  bg:'#ECEFF1', ac:'#546E7A', tags:['非物質的','身体なし','脱体'] },
  a30:{ e1:'🌍', e2:'📍',  bg:'#E0F7FA', ac:'#006064', tags:['地理学者','地球研究','地形専門家'] },
};

const WordVisualCard = ({ wordObj }) => {
  if (!wordObj) return null;
  const v = wordVisuals[wordObj.id] || { e1:'📝', e2:'🔤', bg:'#F5F5F5', ac:'#757575', tags:[] };
  return (
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',display:'block'}}>
      <rect width="160" height="160" fill={v.bg} rx="16"/>
      <circle cx="80" cy="80" r="56" fill={v.ac} fillOpacity="0.12"/>
      <circle cx="80" cy="80" r="44" fill={v.ac} fillOpacity="0.10"/>
      <text x="56" y="98" fontSize="54" textAnchor="middle">{v.e1}</text>
      <text x="110" y="52" fontSize="30" textAnchor="middle">{v.e2}</text>
    </svg>
  );
};

const VocabularyApp = () => {
  const [view, setView] = useState('home');
  const [screen, setScreen] = useState('home');
  const [difficulty, setDifficulty] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(null);
  const [quizMode, setQuizMode] = useState('normal');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);
  const [showOptionJapanese, setShowOptionJapanese] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [allQuizOptions, setAllQuizOptions] = useState({});
  const [speechRate, setSpeechRate] = useState(0.9);
  const [lastSelected, setLastSelected] = useState(null);
  const [selectedVocab, setSelectedVocab] = useState([]);
  const [visualModal, setVisualModal] = useState(null);

  const [scores, setScores] = useState(() => {
    try { const s = localStorage.getItem('vocab_scores'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [wordStats, setWordStats] = useState(() => {
    try { const s = localStorage.getItem('vocab_word_stats'); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });

  useEffect(() => { try { localStorage.setItem('vocab_scores', JSON.stringify(scores)); } catch {} }, [scores]);
  useEffect(() => { try { localStorage.setItem('vocab_word_stats', JSON.stringify(wordStats)); } catch {} }, [wordStats]);

  const SECTION_SIZE = 5;

  const vocabularyData = [
    { id:'b01', word:'Captivate', partOfSpeech:'verb', definition:'To attract and hold the interest or attention of someone completely', japaneseDefinition:'人の興味や注意を完全に引き付ける、魅了する', difficulty:'beginner' },
    { id:'b02', word:'Skeptical', partOfSpeech:'adjective', definition:'Having doubts about something; not easily convinced', japaneseDefinition:'疑念を持つ、簡単には納得しない、懐疑的な', difficulty:'beginner' },
    { id:'b03', word:'Marvel', partOfSpeech:'noun', definition:'A person, thing, or event that causes great wonder or admiration', japaneseDefinition:'驚嘆や称賛を引き起こす人・物・出来事、驚異', difficulty:'beginner' },
    { id:'b04', word:'Illusion', partOfSpeech:'noun', definition:'A false belief or perception that does not reflect reality', japaneseDefinition:'現実を反映しない誤った信念や認識、幻想', difficulty:'beginner' },
    { id:'b05', word:'Validate', partOfSpeech:'verb', definition:'To confirm or verify the accuracy, truth, or quality of something', japaneseDefinition:'何かの正確さ・真実性・品質を確認・検証する', difficulty:'beginner' },
    { id:'b06', word:'Deploy', partOfSpeech:'verb', definition:'To put something into use or action; to make active and available', japaneseDefinition:'リソースや技術を実際に使用・稼働させる、展開する', difficulty:'beginner' },
    { id:'b07', word:'Construct', partOfSpeech:'verb', definition:'To build or form something by assembling parts; to create systematically', japaneseDefinition:'部品を組み合わせて作る、系統立てて創造する', difficulty:'beginner' },
    { id:'b08', word:'Neutral', partOfSpeech:'adjective', definition:'Not supporting or helping either side; showing no bias or preference', japaneseDefinition:'どちらの側も支持しない、偏りや好みを示さない、中立の', difficulty:'beginner' },
    { id:'b09', word:'Probe', partOfSpeech:'verb', definition:'To investigate or examine something closely and thoroughly', japaneseDefinition:'詳しく念入りに調査・検討する', difficulty:'beginner' },
    { id:'b10', word:'Emerge', partOfSpeech:'verb', definition:'To come into existence, become visible, or rise to prominence', japaneseDefinition:'存在するようになる、可視化される、著名になる、現れる', difficulty:'beginner' },
    { id:'b11', word:'Constrained', partOfSpeech:'adjective', definition:'Restricted or limited in some way; unable to act freely', japaneseDefinition:'何らかの形で制限された、自由に行動できない', difficulty:'beginner' },
    { id:'b12', word:'Scale', partOfSpeech:'noun', definition:'The relative size, extent, or level of something; the degree of magnitude', japaneseDefinition:'何かの相対的な大きさや範囲・レベル、規模の度合い', difficulty:'beginner' },
    { id:'b13', word:'Classify', partOfSpeech:'verb', definition:'To arrange or organize things into groups based on shared characteristics', japaneseDefinition:'共通の特徴に基づいて物事をグループに分類する', difficulty:'beginner' },
    { id:'b14', word:'Profound', partOfSpeech:'adjective', definition:'Having great depth, insight, or significance; very intense or thorough', japaneseDefinition:'深い洞察や重要性を持つ、非常に強烈または徹底的な', difficulty:'beginner' },
    { id:'b15', word:'Spectacle', partOfSpeech:'noun', definition:'A visually striking display or performance attracting public attention', japaneseDefinition:'視覚的に印象的な見せ物や公演、人目を引く出来事', difficulty:'beginner' },
    { id:'b16', word:'Iconic', partOfSpeech:'adjective', definition:'Widely recognized as a symbol of something; representing an important idea or era', japaneseDefinition:'何かの象徴として広く認知された、重要な考えや時代を代表する', difficulty:'beginner' },
    { id:'b17', word:'Aerial', partOfSpeech:'adjective', definition:'Existing, happening, or operating in the air; seen or done from the air', japaneseDefinition:'空中に存在する・起こる・動作する、空中から見た・行われた', difficulty:'beginner' },
    { id:'b18', word:'Degrade', partOfSpeech:'verb', definition:'To reduce in quality, value, or strength; to make something worse over time', japaneseDefinition:'品質・価値・強度を低下させる、時間とともに悪化させる', difficulty:'beginner' },
    { id:'b19', word:'Terrain', partOfSpeech:'noun', definition:'A stretch of land with specific physical features; the physical character of a region', japaneseDefinition:'特定の物理的特徴を持つ土地、地域の地形的特性', difficulty:'beginner' },
    { id:'b20', word:'Traverse', partOfSpeech:'verb', definition:'To travel across, over, or through a place; to cross from one side to the other', japaneseDefinition:'ある場所を横断する・越える・通り抜ける、一方から他方へ渡る', difficulty:'beginner' },
    { id:'b21', word:'Diminish', partOfSpeech:'verb', definition:'To make or become less, smaller, or less important; to reduce in size or effect', japaneseDefinition:'より少なく・小さく・重要でなくする・なる、規模や影響を縮小する', difficulty:'beginner' },
    { id:'b22', word:'Logistics', partOfSpeech:'noun', definition:'The detailed coordination and management of people, resources, and processes', japaneseDefinition:'人・資源・プロセスの詳細な調整と管理、物流', difficulty:'beginner' },
    { id:'b23', word:'Adjacent', partOfSpeech:'adjective', definition:'Next to or adjoining something else; close or near to something', japaneseDefinition:'何か他のものの隣にある・接している、近接した', difficulty:'beginner' },
    { id:'b24', word:'Perimeter', partOfSpeech:'noun', definition:'The outer boundary or edge of an area; the continuous line forming the boundary', japaneseDefinition:'ある領域の外側の境界や端、境界を形成する連続した線', difficulty:'beginner' },
    { id:'b25', word:'Propagate', partOfSpeech:'verb', definition:'To spread or promote ideas, information, or beliefs widely; to transmit further', japaneseDefinition:'考え・情報・信念を広く広める・宣伝する、さらに伝達する', difficulty:'beginner' },
    { id:'b26', word:'Juncture', partOfSpeech:'noun', definition:'A particular point in time, especially one that is important or critical', japaneseDefinition:'特定の時点、特に重要または重大な時点', difficulty:'beginner' },
    { id:'b27', word:'Foundational', partOfSpeech:'adjective', definition:'Serving as a base or starting point; fundamental and necessary for something to exist', japaneseDefinition:'基盤や出発点となる、何かが存在するために根本的かつ必要な', difficulty:'beginner' },
    { id:'b28', word:'Assemblage', partOfSpeech:'noun', definition:'A collection or gathering of things or people; a group of diverse elements together', japaneseDefinition:'物や人の集まりや集合、多様な要素が一緒になったグループ', difficulty:'beginner' },
    { id:'b29', word:'Iridescent', partOfSpeech:'adjective', definition:'Showing shifting colors that change when seen from different angles, like a rainbow', japaneseDefinition:'見る角度によって変わる虹のように移り変わる色を示す、玉虫色の', difficulty:'beginner' },
    { id:'b30', word:'Depletion', partOfSpeech:'noun', definition:'The reduction of something by a large amount; the using up of a resource', japaneseDefinition:'何かの大幅な減少、資源の使い尽くし、枯渇', difficulty:'beginner' },
    { id:'i01', word:'Unintentional', partOfSpeech:'adjective', definition:'Not done on purpose; happening without deliberate intent or planning', japaneseDefinition:'意図的でない、故意ではなく起こる、意図せざる', difficulty:'intermediate' },
    { id:'i02', word:'Anthropomorphize', partOfSpeech:'verb', definition:'To attribute human characteristics, emotions, or behavior to non-human things', japaneseDefinition:'人間以外のものに人間の特性・感情・行動を帰属させる', difficulty:'intermediate' },
    { id:'i03', word:'Hypothesis', partOfSpeech:'noun', definition:'A proposed explanation for a phenomenon, subject to testing and verification', japaneseDefinition:'現象に対する暫定的な説明、検証の対象となる仮説', difficulty:'intermediate' },
    { id:'i04', word:'Axiomatic', partOfSpeech:'adjective', definition:'So obvious or widely accepted as to be self-evident; taken for granted', japaneseDefinition:'当然のことで広く受け入れられている、自明の、公理的な', difficulty:'intermediate' },
    { id:'i05', word:'Formalize', partOfSpeech:'verb', definition:'To make official, structured, or precise; to give a definite or formal form', japaneseDefinition:'公式・構造的・正確にする、明確な形式を与える', difficulty:'intermediate' },
    { id:'i06', word:'Discern', partOfSpeech:'verb', definition:'To recognize, identify, or distinguish something clearly; to perceive subtly', japaneseDefinition:'何かを明確に認識・識別する、微妙に知覚する', difficulty:'intermediate' },
    { id:'i07', word:'Nomenclature', partOfSpeech:'noun', definition:'A system of names or terms used in a particular field or discipline', japaneseDefinition:'特定の分野で使用される名前や用語の体系、命名法', difficulty:'intermediate' },
    { id:'i08', word:'Incremental', partOfSpeech:'adjective', definition:'Relating to small, gradual increases or additions rather than dramatic change', japaneseDefinition:'劇的な変化ではなく、小さく段階的な増加や追加に関する', difficulty:'intermediate' },
    { id:'i09', word:'Disparate', partOfSpeech:'adjective', definition:'Essentially different in kind; not able to be compared or related', japaneseDefinition:'本質的に種類が異なる、比較や関連付けができない', difficulty:'intermediate' },
    { id:'i10', word:'Intervention', partOfSpeech:'noun', definition:'The act of interfering to alter or improve a situation or outcome', japaneseDefinition:'状況や結果を変えたり改善するために干渉する行為、介入', difficulty:'intermediate' },
    { id:'i11', word:'Exploitative', partOfSpeech:'adjective', definition:'Treating someone unfairly in order to benefit from their work or resources', japaneseDefinition:'他者の労働や資源を不当に利用して利益を得ようとする、搾取的な', difficulty:'intermediate' },
    { id:'i12', word:'Contestable', partOfSpeech:'adjective', definition:'Open to dispute, challenge, or debate; not beyond question', japaneseDefinition:'異議・反論・議論の余地がある、疑いの余地がある', difficulty:'intermediate' },
    { id:'i13', word:'Proprietary', partOfSpeech:'adjective', definition:'Owned, controlled, or marketed by a particular company; not freely available', japaneseDefinition:'特定の企業が所有・管理・販売する、自由に利用できない、独自仕様の', difficulty:'intermediate' },
    { id:'i14', word:'Encompass', partOfSpeech:'verb', definition:'To include a wide variety of things; to surround or contain completely', japaneseDefinition:'多様なものを含む、完全に取り囲む・包含する', difficulty:'intermediate' },
    { id:'i15', word:'Inordinate', partOfSpeech:'adjective', definition:'Unusually or disproportionately large; exceeding reasonable limits', japaneseDefinition:'異常または不釣り合いに大きい、合理的な限界を超えた', difficulty:'intermediate' },
    { id:'i16', word:'Embody', partOfSpeech:'verb', definition:'To be a concrete expression of an idea or quality; to give physical form to something abstract', japaneseDefinition:'アイデアや特質を具体的に表現する、抽象的なものに物理的な形を与える、体現する', difficulty:'intermediate' },
    { id:'i17', word:'Imprimatur', partOfSpeech:'noun', definition:'Official approval or authorization; a mark indicating sanction by authority', japaneseDefinition:'公式の承認や認可、権威による認可を示す印', difficulty:'intermediate' },
    { id:'i18', word:'Hegemonic', partOfSpeech:'adjective', definition:'Relating to leadership or dominance of one group over others in society', japaneseDefinition:'社会における一集団の他集団への指導や支配に関する、覇権的な', difficulty:'intermediate' },
    { id:'i19', word:'Interlaced', partOfSpeech:'adjective', definition:'Woven or linked together in a complex or interconnected way', japaneseDefinition:'複雑または相互接続された形で織り合わされた・連結された', difficulty:'intermediate' },
    { id:'i20', word:'Compendium', partOfSpeech:'noun', definition:'A concise but comprehensive collection of information on a subject', japaneseDefinition:'ある主題に関する簡潔だが包括的な情報の集成、概要集', difficulty:'intermediate' },
    { id:'i21', word:'Malleability', partOfSpeech:'noun', definition:'The quality of being easily shaped, changed, or adapted; flexible responsiveness', japaneseDefinition:'容易に形作られる・変化する・適応できる性質、柔軟な反応性', difficulty:'intermediate' },
    { id:'i22', word:'Imbricated', partOfSpeech:'adjective', definition:'Arranged so that edges overlap in a regular pattern, like tiles or fish scales', japaneseDefinition:'タイルや魚の鱗のように縁が規則的なパターンで重なり合った', difficulty:'intermediate' },
    { id:'i23', word:'Militarization', partOfSpeech:'noun', definition:'The process of organizing or equipping for military purposes; giving a military character', japaneseDefinition:'軍事目的のために組織化または装備する過程、軍事的性格を付与すること', difficulty:'intermediate' },
    { id:'i24', word:'Austerity', partOfSpeech:'noun', definition:'Difficult economic conditions; policies of cutting government spending significantly', japaneseDefinition:'困難な経済状況、政府支出を大幅に削減する政策、緊縮財政', difficulty:'intermediate' },
    { id:'i25', word:'Dystopian', partOfSpeech:'adjective', definition:'Relating to an imagined society that is oppressive, unjust, and undesirable', japaneseDefinition:'抑圧的・不公正・望ましくない想像上の社会に関する、ディストピア的な', difficulty:'intermediate' },
    { id:'i26', word:'Asymmetry', partOfSpeech:'noun', definition:'Lack of equality or equivalence between parts; an imbalance between two sides', japaneseDefinition:'部分間の平等または等価性の欠如、二つの側面間の不均衡', difficulty:'intermediate' },
    { id:'i27', word:'Abstraction', partOfSpeech:'noun', definition:'The process of considering something independently of its concrete reality or associations', japaneseDefinition:'具体的な現実や関連から独立して何かを考えるプロセス、抽象化', difficulty:'intermediate' },
    { id:'i28', word:'Manifestation', partOfSpeech:'noun', definition:'A clear sign or display of a feeling, idea, or condition; the way something appears', japaneseDefinition:'感情・考え・状態の明確な表れや表示、何かが現れる方法、顕現', difficulty:'intermediate' },
    { id:'i29', word:'Reconfigure', partOfSpeech:'verb', definition:'To change the arrangement or structure of something; to reorganize for a new purpose', japaneseDefinition:'何かの配置や構造を変える、新しい目的のために再編成する', difficulty:'intermediate' },
    { id:'i30', word:'Deracinate', partOfSpeech:'verb', definition:"To uproot from a natural environment; to remove from one's cultural origins", japaneseDefinition:'自然な環境から根こそぎにする、文化的起源から引き離す', difficulty:'intermediate' },
    { id:'i31', word:'Drawdown', partOfSpeech:'noun', definition:'A gradual reduction in the amount or level of something; the using up of a reserve', japaneseDefinition:'何かの量またはレベルの段階的な減少、備蓄の使い切り', difficulty:'intermediate' },
    { id:'i32', word:'Perpetuate', partOfSpeech:'verb', definition:'To cause something harmful or undesirable to continue indefinitely', japaneseDefinition:'有害または望ましくないものを無期限に継続させる', difficulty:'intermediate' },
    { id:'i33', word:'Planetary', partOfSpeech:'adjective', definition:'Relating to or affecting the entire planet; on a global or worldwide scale', japaneseDefinition:'地球全体に関連する・影響する、地球規模または世界規模の', difficulty:'intermediate' },
    { id:'i34', word:'Stratification', partOfSpeech:'noun', definition:'The division of something into layers or groups with different levels of status or value', japaneseDefinition:'何かを異なる地位や価値のレベルを持つ層やグループに分けること、層化', difficulty:'intermediate' },
    { id:'i35', word:'Defunding', partOfSpeech:'noun', definition:'The act of withdrawing financial support from an institution or organization', japaneseDefinition:'機関や組織からの財政的支援を撤退する行為、予算削減', difficulty:'intermediate' },
    { id:'i36', word:'Technocratic', partOfSpeech:'adjective', definition:'Governed or managed by technical experts rather than elected representatives', japaneseDefinition:'選出された代表者ではなく技術専門家によって統治または管理される', difficulty:'intermediate' },
    { id:'i37', word:'Speculative', partOfSpeech:'adjective', definition:'Based on theory or guesswork rather than proven facts; involving financial risk', japaneseDefinition:'証明された事実ではなく理論や推測に基づく、財務的リスクを含む、投機的な', difficulty:'intermediate' },
    { id:'i38', word:'Subsistence', partOfSpeech:'noun', definition:'The action of maintaining oneself at a minimum level; barely enough to survive', japaneseDefinition:'最低限の生活を維持する行為、生き延びるためのわずかな量の生計', difficulty:'intermediate' },
    { id:'i39', word:'Geopolitical', partOfSpeech:'adjective', definition:'Relating to politics especially as influenced by geography and the relations between nations', japaneseDefinition:'特に地理と国家間の関係に影響された政治に関する、地政学的な', difficulty:'intermediate' },
    { id:'i40', word:'Capitalization', partOfSpeech:'noun', definition:"The total market value of a company's shares; the use of financial capital for investment", japaneseDefinition:'会社の株式の総市場価値、投資のための金融資本の活用、資本化', difficulty:'intermediate' },
    { id:'a01', word:'Epistemological', partOfSpeech:'adjective', definition:'Relating to the theory of knowledge and the study of how we know what we know', japaneseDefinition:'知識の理論と、知識をどのように得るかの研究に関する、認識論的な', difficulty:'advanced' },
    { id:'a02', word:'Eugenics', partOfSpeech:'noun', definition:'The practice of attempting to improve human genetics by controlling reproduction', japaneseDefinition:'生殖を管理することで人類の遺伝的性質を改善しようとする思想・実践', difficulty:'advanced' },
    { id:'a03', word:'Subjectivity', partOfSpeech:'noun', definition:'The quality of being based on personal feelings or opinions rather than external facts', japaneseDefinition:'外部の事実ではなく個人の感情や意見に基づく性質、主観性', difficulty:'advanced' },
    { id:'a04', word:'Extralegal', partOfSpeech:'adjective', definition:'Beyond the scope of law; not governed by or subject to legal authority', japaneseDefinition:'法律の範囲外の、法的権限に支配されない、超法規的な', difficulty:'advanced' },
    { id:'a05', word:'Reified', partOfSpeech:'adjective', definition:'Treated as something concrete or real when it is abstract; made into a fixed, tangible thing', japaneseDefinition:'抽象的なものを具体的・現実的なものとして扱われた、物化された', difficulty:'advanced' },
    { id:'a06', word:'Topography', partOfSpeech:'noun', definition:'The physical or conceptual features and structure of an area or system', japaneseDefinition:'地域やシステムの物理的または概念的な特徴と構造、地形', difficulty:'advanced' },
    { id:'a07', word:'Cartographic', partOfSpeech:'adjective', definition:'Relating to the art and practice of drawing or making maps', japaneseDefinition:'地図を描いたり作成する技術・実践に関する、地図製作の', difficulty:'advanced' },
    { id:'a08', word:'Colonizing impulse', partOfSpeech:'noun', definition:'The drive to extend control and ownership over territories, peoples, or systems of knowledge', japaneseDefinition:'領土・人々・知識体系への支配と所有を拡大しようとする衝動', difficulty:'advanced' },
    { id:'a09', word:'Normative', partOfSpeech:'adjective', definition:'Relating to or establishing a standard or ideal; prescribing how things ought to be', japaneseDefinition:'標準・理想を確立する、あるべき姿を規定する、規範的な', difficulty:'advanced' },
    { id:'a10', word:'Rationality', partOfSpeech:'noun', definition:'The quality of being based on reason and logic rather than emotion or impulse', japaneseDefinition:'感情や衝動ではなく理性と論理に基づく性質、合理性', difficulty:'advanced' },
    { id:'a11', word:'Essentialize', partOfSpeech:'verb', definition:'To reduce a group or concept to fixed, inherent characteristics, ignoring internal variation', japaneseDefinition:'グループや概念を固定された本質的特性に還元し、内部の多様性を無視する、本質化する', difficulty:'advanced' },
    { id:'a12', word:'Prima facie', partOfSpeech:'phrase', definition:'Based on first impression; accepted as correct until disproved by further evidence', japaneseDefinition:'一見したところ、さらなる証拠によって否定されるまで正しいと受け入れられる、一応の', difficulty:'advanced' },
    { id:'a13', word:'Mappae mundi', partOfSpeech:'noun', definition:'Medieval European maps of the world, often reflecting religious and ideological worldviews', japaneseDefinition:'中世ヨーロッパの世界地図、しばしば宗教的・イデオロギー的世界観を反映したもの', difficulty:'advanced' },
    { id:'a14', word:'Sociotechnical', partOfSpeech:'adjective', definition:'Involving the complex interaction between social systems and technical or technological systems', japaneseDefinition:'社会的システムと技術的システムの複雑な相互作用を含む、社会技術的な', difficulty:'advanced' },
    { id:'a15', word:'Computationally intensive', partOfSpeech:'phrase', definition:'Requiring a very large amount of computing power or processing resources to complete a task', japaneseDefinition:'タスクを完了するために非常に大量の計算能力または処理リソースを必要とする', difficulty:'advanced' },
    { id:'a16', word:'Thermonuclear', partOfSpeech:'adjective', definition:'Relating to nuclear reactions that occur at extremely high temperatures; involving fusion', japaneseDefinition:'非常に高温で起こる核反応に関する、核融合を含む、熱核の', difficulty:'advanced' },
    { id:'a17', word:'Mineralogy', partOfSpeech:'noun', definition:'The scientific study of minerals, including their distribution, properties, and classification', japaneseDefinition:'鉱物の分布・性質・分類を含む科学的研究、鉱物学', difficulty:'advanced' },
    { id:'a18', word:'Detriment', partOfSpeech:'noun', definition:'A cause of harm or damage; a factor that causes a situation to become worse', japaneseDefinition:'害や損害の原因、状況を悪化させる要因、不利益', difficulty:'advanced' },
    { id:'a19', word:'Transoceanic', partOfSpeech:'adjective', definition:'Crossing or spanning an ocean; relating to communication or travel across oceans', japaneseDefinition:'大洋を横断する・またがる、大洋をまたぐ通信や旅行に関する', difficulty:'advanced' },
    { id:'a20', word:'Climatological', partOfSpeech:'adjective', definition:'Relating to climatology; concerning the scientific study of climate and its long-term patterns', japaneseDefinition:'気候学に関する、気候とその長期的パターンの科学的研究に関する', difficulty:'advanced' },
    { id:'a21', word:'Nonrenewable', partOfSpeech:'adjective', definition:'Describing a resource that cannot be replaced by natural processes once used up', japaneseDefinition:'一度使い切ると自然のプロセスで補充できない資源を表す、再生不可能な', difficulty:'advanced' },
    { id:'a22', word:'Rapporteur', partOfSpeech:'noun', definition:'A person appointed to report on proceedings of a meeting or investigation to a higher authority', japaneseDefinition:'会議または調査の進行状況を上位機関に報告するために任命された人', difficulty:'advanced' },
    { id:'a23', word:'Megacorporation', partOfSpeech:'noun', definition:'An extremely large and powerful corporation with vast global reach and influence', japaneseDefinition:'広大なグローバルリーチと影響力を持つ非常に大規模で強力な企業', difficulty:'advanced' },
    { id:'a24', word:'Calculus', partOfSpeech:'noun', definition:'A system of reasoning or calculation; a method for weighing competing considerations', japaneseDefinition:'推論または計算のシステム、競合する考慮事項を検討するための方法', difficulty:'advanced' },
    { id:'a25', word:'Strategic amnesia', partOfSpeech:'phrase', definition:'The deliberate or convenient forgetting of inconvenient historical facts by institutions', japaneseDefinition:'機関による都合の悪い歴史的事実の意図的または都合のよい忘却', difficulty:'advanced' },
    { id:'a26', word:'Promiscuity', partOfSpeech:'noun', definition:'The quality of being indiscriminate or lacking selectivity in application or use', japaneseDefinition:'適用や使用において無差別または選択性を欠く性質', difficulty:'advanced' },
    { id:'a27', word:'Irresolvable', partOfSpeech:'adjective', definition:'Impossible to settle, solve, or bring to a satisfactory conclusion', japaneseDefinition:'解決・満足のいく結論に達することが不可能な、解決不能な', difficulty:'advanced' },
    { id:'a28', word:'Supersystem', partOfSpeech:'noun', definition:'A system composed of multiple interconnected systems forming a larger integrated whole', japaneseDefinition:'より大きな統合された全体を形成する複数の相互接続されたシステムで構成されるシステム', difficulty:'advanced' },
    { id:'a29', word:'Disembodied', partOfSpeech:'adjective', definition:'Separated from or existing without a physical body; lacking material or concrete form', japaneseDefinition:'物理的な身体から分離された・なしに存在する、物質的または具体的な形を欠く', difficulty:'advanced' },
    { id:'a30', word:'Geographer', partOfSpeech:'noun', definition:'A specialist in geography who studies the physical and human features of the earth', japaneseDefinition:'地球の物理的・人文的特徴を研究する地理学の専門家', difficulty:'advanced' },
  ];

  const getSections = (diff) => {
    const vocab = vocabularyData.filter(v => v.difficulty === diff);
    const sections = [];
    for (let i = 0; i < vocab.length; i += SECTION_SIZE) sections.push(vocab.slice(i, i + SECTION_SIZE));
    return sections;
  };

  const getWeakWords = (diff, count = SECTION_SIZE) => {
    const vocab = diff === 'all' ? vocabularyData : vocabularyData.filter(v => v.difficulty === diff);
    return [...vocab]
      .map(w => ({ ...w, rate: wordStats[w.id]?.total > 0 ? wordStats[w.id].correct / wordStats[w.id].total : -1 }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, count)
      .sort(() => Math.random() - 0.5);
  };

  const currentWord = selectedVocab[currentWordIndex] || {};
  const quizOptions = allQuizOptions[currentWord.id] || [];

  const buildAllOptions = (picked) => {
    const map = {};
    picked.forEach(word => {
      const options = [word.definition];
      const others = vocabularyData.filter(w => w.id !== word.id);
      while (options.length < 4) {
        const pick = others[Math.floor(Math.random() * others.length)];
        if (!options.includes(pick.definition)) options.push(pick.definition);
      }
      map[word.id] = options.sort(() => Math.random() - 0.5);
    });
    return map;
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window)) { alert('音声機能に対応していません'); return; }
    window.speechSynthesis.cancel();
    if (isSpeaking) { setIsSpeaking(false); return; }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US'; utt.rate = speechRate; utt.pitch = 1;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend   = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const handleOptionSelect = (option) => {
    if (lastSelected !== null) return;
    const newAnswers = { ...quizAnswers, [currentWord.id]: option };
    setQuizAnswers(newAnswers);
    setLastSelected(option);
    setTimeout(() => {
      setLastSelected(null);
      setShowJapanese(false);
      setShowOptionJapanese({});
      if (currentWordIndex < selectedVocab.length - 1) {
        setCurrentWordIndex(i => i + 1);
      } else {
        setWordStats(prev => {
          const updated = { ...prev };
          selectedVocab.forEach(w => {
            const isCorrect = newAnswers[w.id] === w.definition;
            updated[w.id] = { correct:(updated[w.id]?.correct||0)+(isCorrect?1:0), total:(updated[w.id]?.total||0)+1 };
          });
          return updated;
        });
        let correct = 0;
        selectedVocab.forEach(w => { if (newAnswers[w.id] === w.definition) correct++; });
        const score = Math.round((correct / selectedVocab.length) * 100);
        setScores(prev => [...prev, { score, date: new Date().toLocaleDateString(), difficulty, sectionIndex, mode: quizMode }]);
        setShowResults(true);
      }
    }, 500);
  };

  const calculateFinalScore = () => {
    let correct = 0;
    selectedVocab.forEach(w => { if (quizAnswers[w.id] === w.definition) correct++; });
    return Math.round((correct / selectedVocab.length) * 100);
  };

  const startQuiz = (section, secIdx) => {
    const shuffled = [...section].sort(() => Math.random() - 0.5);
    setSelectedVocab(shuffled); setAllQuizOptions(buildAllOptions(shuffled));
    setSectionIndex(secIdx); setQuizMode('normal');
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({}); setLastSelected(null); setScreen('quiz');
  };

  const startWeakQuiz = (diff) => {
    const weak = getWeakWords(diff);
    setSelectedVocab(weak); setAllQuizOptions(buildAllOptions(weak));
    setDifficulty(diff); setSectionIndex(null); setQuizMode('weak');
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({}); setLastSelected(null); setScreen('quiz');
  };

  const handleRetry = () => {
    if (quizMode === 'weak') { startWeakQuiz(difficulty); return; }
    const section = getSections(difficulty)[sectionIndex];
    const shuffled = [...section].sort(() => Math.random() - 0.5);
    setSelectedVocab(shuffled); setAllQuizOptions(buildAllOptions(shuffled));
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({}); setLastSelected(null);
  };

  const handleSelectDifficulty = (diff) => { setDifficulty(diff); setScreen('sections'); };
  const handleBackToSections = () => {
    setScreen(quizMode === 'weak' ? 'weak_select' : 'sections');
    setShowResults(false); setSelectedVocab([]); setCurrentWordIndex(0); setQuizAnswers({});
  };
  const handleBackToHome = () => {
    setDifficulty(null); setSectionIndex(null); setSelectedVocab([]);
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({});
    setAllQuizOptions({}); setLastSelected(null); setScreen('home');
  };

  const diffLabel = (d) => d==='beginner'?'初心者':d==='intermediate'?'中級者':d==='advanced'?'上級者':'全難易度';
  const getWordRate = (id) => { const s=wordStats[id]; if(!s||s.total===0) return null; return Math.round((s.correct/s.total)*100); };
  const clearAllData = () => { if(window.confirm('全ての学習記録を削除しますか？')){ localStorage.removeItem('vocab_scores'); localStorage.removeItem('vocab_word_stats'); setScores([]); setWordStats({}); } };

  return (
    <div className="container">
      {visualModal && (
        <div className="visual-overlay" onClick={() => setVisualModal(null)}>
          <div className="visual-modal-box" onClick={e => e.stopPropagation()}>
            <button className="visual-close-btn" onClick={() => setVisualModal(null)}>✕</button>
            <WordVisualCard wordObj={visualModal} />
            <p className="visual-definition">{visualModal.definition}</p>
            <p className="visual-jp">{visualModal.japaneseDefinition}</p>
          </div>
        </div>
      )}

      <div className="header">
        <h1>📚 Vocabulary Master</h1>
        <p>『Atlas of AI』Introduction の語彙を習得しよう</p>
      </div>
      <div className="nav">
        <button onClick={() => { setView('home'); handleBackToHome(); }} className={view==='home'?'active':''}>Home</button>
        <button onClick={() => setView('progress')} className={view==='progress'?'active':''}>Progress</button>
      </div>

      {view==='home' && screen==='home' && (
        <div className="home-section">
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-label">Total Words</div><div className="stat-value">{vocabularyData.length}</div></div>
            <div className="stat-card"><div className="stat-label">Words / Section</div><div className="stat-value">{SECTION_SIZE}</div></div>
            <div className="stat-card"><div className="stat-label">Quizzes Done</div><div className="stat-value">{scores.length}</div></div>
            {scores.length>0&&<div className="stat-card"><div className="stat-label">Average Score</div><div className="stat-value">{Math.round(scores.reduce((a,s)=>a+s.score,0)/scores.length)}%</div></div>}
          </div>
          <div className="difficulty-section">
            <h2>通常モード — 難易度を選択</h2>
            <div className="difficulty-grid">
              {[{key:'beginner',label:'初心者',desc:'基本的な語彙を習得'},{key:'intermediate',label:'中級者',desc:'より複雑な概念を学習'},{key:'advanced',label:'上級者',desc:'高度な学術用語をマスター'}].map(({key,label,desc})=>(
                <div key={key} className="difficulty-card" onClick={()=>handleSelectDifficulty(key)}>
                  <div className="difficulty-level">{label}</div>
                  <div className="difficulty-desc">{desc}</div>
                  <div className="word-count">{vocabularyData.filter(v=>v.difficulty===key).length}語 / {getSections(key).length}セクション</div>
                </div>
              ))}
            </div>
          </div>
          <div className="weak-section">
            <h2>弱点克服モード</h2>
            <p className="weak-desc">正答率が低い単語を優先して出題します。未回答の単語は最優先で出題されます。</p>
            <div className="weak-card" onClick={()=>setScreen('weak_select')}>
              <div className="weak-icon">🎯</div>
              <div><div className="weak-title">弱点克服モードを始める</div><div className="weak-sub">難易度を選んで5問に挑戦</div></div>
            </div>
          </div>
        </div>
      )}

      {view==='home' && screen==='sections' && difficulty && (
        <div className="section-select">
          <div className="section-header">
            <button className="back-link" onClick={handleBackToHome}>← 難易度選択に戻る</button>
            <h2>{diffLabel(difficulty)} — セクションを選択</h2>
            <p className="section-sub">各セクションは {SECTION_SIZE} 問。出題順はランダムです。</p>
          </div>
          <div className="section-grid">
            {getSections(difficulty).map((section, idx) => {
              const best = scores.filter(s=>s.difficulty===difficulty&&s.sectionIndex===idx&&s.mode==='normal');
              const bestScore = best.length>0?Math.max(...best.map(s=>s.score)):null;
              return (
                <div key={idx} className="section-card" onClick={()=>startQuiz(section,idx)}>
                  <div className="section-number">Section {idx+1}</div>
                  <div className="section-words">
                    {section.map(w=>{const rate=getWordRate(w.id);return(<span key={w.id} className={`section-word-tag ${rate!==null&&rate<50?'weak-tag':''}`}>{w.word}{rate!==null?` ${rate}%`:''}</span>);})}
                  </div>
                  {bestScore!==null?<div className="section-score">Best: {bestScore}%</div>:<div className="section-score new">未挑戦</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view==='home' && screen==='weak_select' && (
        <div className="section-select">
          <div className="section-header">
            <button className="back-link" onClick={handleBackToHome}>← ホームに戻る</button>
            <h2>🎯 弱点克服モード — 対象を選択</h2>
            <p className="section-sub">正答率が低い単語上位 {SECTION_SIZE} 問を自動選択します。</p>
          </div>
          <div className="difficulty-grid">
            {[{key:'all',label:'全難易度',desc:'全100語から弱点を選択'},{key:'beginner',label:'初心者',desc:'初心者30語から弱点を選択'},{key:'intermediate',label:'中級者',desc:'中級者40語から弱点を選択'},{key:'advanced',label:'上級者',desc:'上級者30語から弱点を選択'}].map(({key,label,desc})=>(
              <div key={key} className="difficulty-card weak-diff-card" onClick={()=>startWeakQuiz(key)}>
                <div className="difficulty-level">{label}</div>
                <div className="difficulty-desc">{desc}</div>
                <div className="word-count">{(()=>{const v=key==='all'?vocabularyData:vocabularyData.filter(w=>w.difficulty===key);return `解答済: ${v.filter(w=>wordStats[w.id]?.total>0).length}/${v.length}語`;})()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view==='home' && screen==='quiz' && !showResults && (
        <div className="quiz-card">
          <div className="quiz-meta">
            {quizMode==='weak'
              ?<span className="quiz-meta-label weak-meta">🎯 弱点克服 — {diffLabel(difficulty)}</span>
              :<span className="quiz-meta-label">{diffLabel(difficulty)} — Section {sectionIndex+1}</span>}
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${((currentWordIndex+1)/selectedVocab.length)*100}%`}}/></div>
          <div className="progress-text">問題 {currentWordIndex+1} / {selectedVocab.length}</div>
          <div className="quiz-content">
            <h2 className="quiz-question">次の定義に合う単語は？</h2>
            <div className="quiz-layout">
              {/* 左：定義文・ボタン・選択肢 */}
              <div className="quiz-main">
                <p className="definition-highlight">{currentWord.definition}</p>
                {showJapanese&&<div className="japanese-translation"><strong>日本語訳：</strong> {currentWord.japaneseDefinition}</div>}
                <div className="audio-button-group">
                  <button className={`audio-button ${isSpeaking?'speaking':''}`} onClick={()=>speak(currentWord.definition)}>📢 問題文を発音</button>
                  <button className={`toggle-button ${showJapanese?'active':''}`} onClick={()=>setShowJapanese(v=>!v)}>🇯🇵 日本語訳</button>
                </div>
                <div className="speed-control">
                  <label className="speed-label">発音スピード：<strong>{speechRate.toFixed(1)}x</strong></label>
                  <input type="range" min="0.5" max="1.5" step="0.1" value={speechRate} onChange={e=>setSpeechRate(parseFloat(e.target.value))} className="speed-slider"/>
                  <div className="speed-markers"><span>遅い (0.5x)</span><span>普通 (1.0x)</span><span>速い (1.5x)</span></div>
                </div>
              </div>
              {/* 右：ビジュアルカード（テスト：b01のみ） */}
              {wordVisuals[currentWord.id] && (
                <div className="quiz-visual-side">
                  <WordVisualCard wordObj={currentWord} />
                </div>
              )}
            </div>
            <div className="quiz-options">
              {quizOptions.map((option,idx)=>{
                const wordObj=vocabularyData.find(v=>v.definition===option);
                const wordLabel=wordObj?.word||'';
                const wordId=wordObj?.id||'';
                const isSelected=quizAnswers[currentWord.id]===option;
                const jpShown=showOptionJapanese[wordId];
                return(
                  <div key={idx} className="quiz-option-wrapper">
                    <div className={`quiz-option ${isSelected?'selected':''} ${lastSelected===option?'just-selected':''}`} onClick={()=>handleOptionSelect(option)}>
                      <span className="option-text">{wordLabel}</span>
                      <div className="option-buttons">
                        <button className="inline-audio-btn" onClick={e=>{e.stopPropagation();speak(wordLabel);}} title="発音">🔊</button>
                        <button className={`inline-jp-btn ${jpShown?'active':''}`} onClick={e=>{e.stopPropagation();setShowOptionJapanese(prev=>({...prev,[wordId]:!prev[wordId]}));}} title="日本語訳">🇯🇵</button>
                      </div>
                    </div>
                    {jpShown&&wordObj&&<div className="option-japanese">{wordObj.japaneseDefinition}</div>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="button-group">
            <button className="back-btn" onClick={()=>{if(currentWordIndex>0){setCurrentWordIndex(i=>i-1);setLastSelected(null);setShowJapanese(false);setShowOptionJapanese({});}}}>← 前へ</button>
          </div>
        </div>
      )}

      {view==='home' && screen==='quiz' && showResults && (
        <div className="results-card">
          <div className="results-label">{quizMode==='weak'?`🎯 弱点克服 — ${diffLabel(difficulty)}`:`${diffLabel(difficulty)} — Section ${sectionIndex+1}`}</div>
          <div className="results-score">{calculateFinalScore()}%</div>
          <div className="results-message">{calculateFinalScore()>=80?'🎉 素晴らしい！':calculateFinalScore()>=60?'👍 良くできました！':'📚 もう一度挑戦しましょう！'}</div>
          <div className="feedback-section">
            {selectedVocab.map((word,idx)=>{
              const isCorrect=quizAnswers[word.id]===word.definition;
              const rate=getWordRate(word.id);
              return(
                <div key={idx} className="feedback-item">
                  <div className={`feedback-header ${isCorrect?'correct':'incorrect'}`}>
                    <span>{isCorrect?'✓':'✗'} {word.word}</span>
                    {rate!==null&&<span className="word-rate-badge" style={{background:rate>=70?'#d4edda':rate>=40?'#fff3cd':'#f8d7da',color:rate>=70?'#155724':rate>=40?'#856404':'#721c24'}}>{rate}%</span>}
                    <button className="result-visual-btn" onClick={()=>setVisualModal(word)}>🖼️</button>
                  </div>
                  {!isCorrect&&<div className="feedback-detail">正解の定義: {word.definition}</div>}
                </div>
              );
            })}
          </div>
          <div className="button-group">
            <button onClick={handleBackToSections}>← {quizMode==='weak'?'難易度選択に戻る':'セクション選択に戻る'}</button>
            <button className="submit-button" onClick={handleRetry}>{quizMode==='weak'?'弱点克服を再挑戦':'このセクションを再挑戦'}</button>
          </div>
        </div>
      )}

      {view==='progress' && (
        <div className="progress-section">
          <h2>学習進捗</h2>
          <div className="progress-stats">
            <div className="progress-card"><div className="progress-label">完了したクイズ</div><div className="progress-value">{scores.length}</div></div>
            {scores.length>0&&<><div className="progress-card"><div className="progress-label">平均スコア</div><div className="progress-value">{Math.round(scores.reduce((a,s)=>a+s.score,0)/scores.length)}%</div></div><div className="progress-card"><div className="progress-label">最高スコア</div><div className="progress-value">{Math.max(...scores.map(s=>s.score))}%</div></div></>}
            <div className="progress-card"><div className="progress-label">解答済み単語</div><div className="progress-value">{Object.keys(wordStats).filter(id=>wordStats[id].total>0).length}/{vocabularyData.length}</div></div>
          </div>
          <div className="word-stats-section">
            <h3>単語別 正答率</h3>
            {['beginner','intermediate','advanced'].map(diff=>{
              const vocab=vocabularyData.filter(v=>v.difficulty===diff);
              const attempted=vocab.filter(w=>wordStats[w.id]?.total>0);
              if(attempted.length===0) return null;
              return(
                <div key={diff} className="diff-stats-group">
                  <h4>{diffLabel(diff)}</h4>
                  {[...attempted].sort((a,b)=>(wordStats[a.id].correct/wordStats[a.id].total)-(wordStats[b.id].correct/wordStats[b.id].total)).map(w=>{
                    const stat=wordStats[w.id];
                    const rate=Math.round((stat.correct/stat.total)*100);
                    return(
                      <div key={w.id} className="word-stat-row">
                        <span className="word-stat-name">{w.word}</span>
                        <div className="word-stat-bar-wrap"><div className="word-stat-bar" style={{width:`${rate}%`,background:rate>=70?'#28a745':rate>=40?'#ffc107':'#dc3545'}}/></div>
                        <span className="word-stat-pct">{stat.correct}/{stat.total} ({rate}%)</span>
                        <button className="stat-visual-btn" onClick={()=>setVisualModal(w)}>🖼️</button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {scores.length>0&&(
            <div className="quiz-history">
              <h3>クイズ履歴</h3>
              {[...scores].reverse().map((score,idx)=>(
                <div key={idx} className="history-item">
                  <span className="difficulty-badge">{diffLabel(score.difficulty)}</span>
                  {score.mode==='weak'?<span className="weak-badge">🎯 弱点</span>:score.sectionIndex!==null&&<span className="section-badge">Sec {score.sectionIndex+1}</span>}
                  <span>{score.date}</span>
                  <span className="score">{score.score}%</span>
                </div>
              ))}
            </div>
          )}
          <div style={{marginTop:'2rem',textAlign:'right'}}>
            <button className="clear-btn" onClick={clearAllData}>🗑 学習記録をリセット</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyApp;
