import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { vocabularyData, wordVisuals } from './vocab';

// ── SVG ビジュアルカード ──────────────────────
const WordVisualCard = ({ wordObj }) => {
  if (!wordObj) return null;
  const v = wordVisuals[wordObj.id] || { e1:'📝', e2:'🔤', bg:'#F5F5F5', ac:'#757575' };
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

// ── アプリ本体 ────────────────────────────────
const VocabularyApp = () => {
  const [view, setView]                       = useState('home');
  const [screen, setScreen]                   = useState('home');
  const [difficulty, setDifficulty]           = useState(null);
  const [sectionIndex, setSectionIndex]       = useState(null);
  const [quizMode, setQuizMode]               = useState('normal');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [quizAnswers, setQuizAnswers]         = useState({});
  const [showResults, setShowResults]         = useState(false);
  const [showJapanese, setShowJapanese]       = useState(false);
  const [showOptionJapanese, setShowOptionJapanese] = useState({});
  const [isSpeaking, setIsSpeaking]           = useState(false);
  const [allQuizOptions, setAllQuizOptions]   = useState({});
  const [speechRate, setSpeechRate]           = useState(0.9);
  const [lastSelected, setLastSelected]       = useState(null);
  const [selectedVocab, setSelectedVocab]     = useState([]);
  const [visualModal, setVisualModal]         = useState(null);

  // speechRate を ref で保持（useEffect 内のクロージャ対策）
  const speechRateRef = useRef(speechRate);
  useEffect(() => { speechRateRef.current = speechRate; }, [speechRate]);

  // ── localStorage ──
  const [scores, setScores] = useState(() => {
    try { const s = localStorage.getItem('vocab_scores'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [wordStats, setWordStats] = useState(() => {
    try { const s = localStorage.getItem('vocab_word_stats'); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  useEffect(() => { try { localStorage.setItem('vocab_scores',     JSON.stringify(scores));    } catch {} }, [scores]);
  useEffect(() => { try { localStorage.setItem('vocab_word_stats', JSON.stringify(wordStats)); } catch {} }, [wordStats]);

  const SECTION_SIZE = 5;

  // ── 音声再生（共通） ──────────────────────────
  const speakText = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = 'en-US';
    utt.rate  = speechRateRef.current;
    utt.pitch = 1;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend   = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utt);
  }, []);

  // ── 問題表示時に定義文を自動再生 ──────────────
  const currentWord = selectedVocab[currentWordIndex] || {};
  useEffect(() => {
    if (screen === 'quiz' && !showResults && currentWord.definition) {
      const timer = setTimeout(() => speakText(currentWord.definition), 400);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWordIndex, screen, showResults]);

  // ── 手動発音ボタン ──────────────────────────
  const handleSpeak = (text) => {
    window.speechSynthesis.cancel();
    if (isSpeaking) { setIsSpeaking(false); return; }
    speakText(text);
  };

  const quizOptions = allQuizOptions[currentWord.id] || [];

  // ── セクション生成 ──────────────────────────
  const getSections = (diff) => {
    const vocab = vocabularyData.filter(v => v.difficulty === diff);
    const sections = [];
    for (let i = 0; i < vocab.length; i += SECTION_SIZE) sections.push(vocab.slice(i, i + SECTION_SIZE));
    return sections;
  };

  // ── 弱点単語取得 ──────────────────────────
  const getWeakWords = (diff, count = SECTION_SIZE) => {
    const vocab = diff === 'all' ? vocabularyData : vocabularyData.filter(v => v.difficulty === diff);
    return [...vocab]
      .map(w => ({ ...w, rate: wordStats[w.id]?.total > 0 ? wordStats[w.id].correct / wordStats[w.id].total : -1 }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, count)
      .sort(() => Math.random() - 0.5);
  };

  // ── 選択肢生成 ──────────────────────────
  const buildAllOptions = (picked) => {
    const map = {};
    picked.forEach(word => {
      const options = [word.definition];
      const others  = vocabularyData.filter(w => w.id !== word.id);
      while (options.length < 4) {
        const pick = others[Math.floor(Math.random() * others.length)];
        if (!options.includes(pick.definition)) options.push(pick.definition);
      }
      map[word.id] = options.sort(() => Math.random() - 0.5);
    });
    return map;
  };

  // ── 選択肢クリック → 選んだ単語を発音 → 次へ ──
  const handleOptionSelect = (option) => {
    if (lastSelected !== null) return;
    const newAnswers = { ...quizAnswers, [currentWord.id]: option };
    setQuizAnswers(newAnswers);
    setLastSelected(option);

    // 選択された単語を即座に発音
    const selectedWord = vocabularyData.find(v => v.definition === option);
    if (selectedWord) speakText(selectedWord.word);

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
            updated[w.id] = {
              correct: (updated[w.id]?.correct || 0) + (isCorrect ? 1 : 0),
              total:   (updated[w.id]?.total   || 0) + 1
            };
          });
          return updated;
        });
        let correct = 0;
        selectedVocab.forEach(w => { if (newAnswers[w.id] === w.definition) correct++; });
        const score = Math.round((correct / selectedVocab.length) * 100);
        setScores(prev => [...prev, { score, date: new Date().toLocaleDateString(), difficulty, sectionIndex, mode: quizMode }]);
        setShowResults(true);
      }
    }, 1400); // 発音と次問自動再生が重ならないよう少し長めに
  };

  const calculateFinalScore = () => {
    let correct = 0;
    selectedVocab.forEach(w => { if (quizAnswers[w.id] === w.definition) correct++; });
    return Math.round((correct / selectedVocab.length) * 100);
  };

  // ── クイズ開始 ──────────────────────────
  const startQuiz = (section, secIdx) => {
    window.speechSynthesis.cancel();
    const shuffled = [...section].sort(() => Math.random() - 0.5);
    setSelectedVocab(shuffled); setAllQuizOptions(buildAllOptions(shuffled));
    setSectionIndex(secIdx); setQuizMode('normal');
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({}); setLastSelected(null);
    setScreen('quiz');
  };

  const startWeakQuiz = (diff) => {
    window.speechSynthesis.cancel();
    const weak = getWeakWords(diff);
    setSelectedVocab(weak); setAllQuizOptions(buildAllOptions(weak));
    setDifficulty(diff); setSectionIndex(null); setQuizMode('weak');
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({}); setLastSelected(null);
    setScreen('quiz');
  };

  const handleRetry = () => {
    window.speechSynthesis.cancel();
    if (quizMode === 'weak') { startWeakQuiz(difficulty); return; }
    const section = getSections(difficulty)[sectionIndex];
    const shuffled = [...section].sort(() => Math.random() - 0.5);
    setSelectedVocab(shuffled); setAllQuizOptions(buildAllOptions(shuffled));
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({}); setLastSelected(null);
  };

  const handleSelectDifficulty = (diff) => { setDifficulty(diff); setScreen('sections'); };

  const handleBackToSections = () => {
    window.speechSynthesis.cancel();
    setScreen(quizMode === 'weak' ? 'weak_select' : 'sections');
    setShowResults(false); setSelectedVocab([]); setCurrentWordIndex(0); setQuizAnswers({});
  };

  const handleBackToHome = () => {
    window.speechSynthesis.cancel();
    setDifficulty(null); setSectionIndex(null); setSelectedVocab([]);
    setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false);
    setShowJapanese(false); setShowOptionJapanese({});
    setAllQuizOptions({}); setLastSelected(null); setScreen('home');
  };

  const diffLabel  = (d) => d==='beginner'?'初心者':d==='intermediate'?'中級者':d==='advanced'?'上級者':'全難易度';
  const getWordRate = (id) => { const s=wordStats[id]; if(!s||s.total===0) return null; return Math.round((s.correct/s.total)*100); };
  const clearAllData = () => {
    if (window.confirm('全ての学習記録を削除しますか？')) {
      localStorage.removeItem('vocab_scores'); localStorage.removeItem('vocab_word_stats');
      setScores([]); setWordStats({});
    }
  };

  return (
    <div className="container">
      {/* ── ビジュアルモーダル ── */}
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

      {/* ══ ホーム ══ */}
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

      {/* ══ セクション選択 ══ */}
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

      {/* ══ 弱点克服難易度選択 ══ */}
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

      {/* ══ クイズ ══ */}
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
              {/* 左：定義文・ボタン・スライダー */}
              <div className="quiz-main">
                <p className="definition-highlight">{currentWord.definition}</p>
                {showJapanese&&<div className="japanese-translation"><strong>日本語訳：</strong> {currentWord.japaneseDefinition}</div>}
                <div className="audio-button-group">
                  <button className={`audio-button ${isSpeaking?'speaking':''}`} onClick={()=>handleSpeak(currentWord.definition)}>📢 問題文を発音</button>
                  <button className={`toggle-button ${showJapanese?'active':''}`} onClick={()=>setShowJapanese(v=>!v)}>🇯🇵 日本語訳</button>
                </div>
                <div className="speed-control">
                  <label className="speed-label">発音スピード：<strong>{speechRate.toFixed(1)}x</strong></label>
                  <input type="range" min="0.5" max="1.5" step="0.1" value={speechRate} onChange={e=>setSpeechRate(parseFloat(e.target.value))} className="speed-slider"/>
                  <div className="speed-markers"><span>遅い (0.5x)</span><span>普通 (1.0x)</span><span>速い (1.5x)</span></div>
                </div>
              </div>
              {/* 右：ビジュアルカード（全語対応） */}
              {wordVisuals[currentWord.id] && (
                <div className="quiz-visual-side">
                  <WordVisualCard wordObj={currentWord} />
                </div>
              )}
            </div>

            <div className="quiz-options">
              {quizOptions.map((option,idx)=>{
                const wordObj = vocabularyData.find(v=>v.definition===option);
                const wordLabel = wordObj?.word||'';
                const wordId    = wordObj?.id||'';
                const isSelected = quizAnswers[currentWord.id]===option;
                const jpShown    = showOptionJapanese[wordId];
                return(
                  <div key={idx} className="quiz-option-wrapper">
                    <div className={`quiz-option ${isSelected?'selected':''} ${lastSelected===option?'just-selected':''}`} onClick={()=>handleOptionSelect(option)}>
                      <span className="option-text">{wordLabel}</span>
                      <div className="option-buttons">
                        <button className="inline-audio-btn" onClick={e=>{e.stopPropagation();handleSpeak(wordLabel);}} title="発音">🔊</button>
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
            <button className="back-btn" onClick={()=>{if(currentWordIndex>0){window.speechSynthesis.cancel();setCurrentWordIndex(i=>i-1);setLastSelected(null);setShowJapanese(false);setShowOptionJapanese({});}}}>← 前へ</button>
          </div>
        </div>
      )}

      {/* ══ 結果 ══ */}
      {view==='home' && screen==='quiz' && showResults && (
        <div className="results-card">
          <div className="results-label">{quizMode==='weak'?`🎯 弱点克服 — ${diffLabel(difficulty)}`:`${diffLabel(difficulty)} — Section ${sectionIndex+1}`}</div>
          <div className="results-score">{calculateFinalScore()}%</div>
          <div className="results-message">{calculateFinalScore()>=80?'🎉 素晴らしい！':calculateFinalScore()>=60?'👍 良くできました！':'📚 もう一度挑戦しましょう！'}</div>
          <div className="feedback-section">
            {selectedVocab.map((word,idx)=>{
              const isCorrect = quizAnswers[word.id]===word.definition;
              const rate = getWordRate(word.id);
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

      {/* ══ 進捗 ══ */}
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
              const vocab = vocabularyData.filter(v=>v.difficulty===diff);
              const attempted = vocab.filter(w=>wordStats[w.id]?.total>0);
              if(attempted.length===0) return null;
              return(
                <div key={diff} className="diff-stats-group">
                  <h4>{diffLabel(diff)}</h4>
                  {[...attempted].sort((a,b)=>(wordStats[a.id].correct/wordStats[a.id].total)-(wordStats[b.id].correct/wordStats[b.id].total)).map(w=>{
                    const stat = wordStats[w.id];
                    const rate = Math.round((stat.correct/stat.total)*100);
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
