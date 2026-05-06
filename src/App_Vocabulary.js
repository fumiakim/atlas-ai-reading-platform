import React, { useState } from 'react';
import './App.css';

const VocabularyPlatform = () => {
  const [view, setView] = useState('home');
  const [mode, setMode] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [category, setCategory] = useState('all');
  const [scores, setScores] = useState([]);

  // 語彙データベース
  const vocabularyData = [
    // Atlas of AI 学術用語
    {
      id: 'acad-1',
      word: 'Extractivism',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'The practice of exploiting natural resources or labor for economic gain, often in colonial contexts',
      japaneseDefinition: '自然資源や労働力を搾取的に採掘・採取する経済体制',
      example: 'Data extraction by tech companies resembles historical extractivism.',
      difficulty: 'advanced',
      relatedWords: ['extraction', 'exploit', 'colonialism']
    },
    {
      id: 'acad-2',
      word: 'Data Colonialism',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'The practice of appropriating personal data from individuals and communities for profit, similar to colonial resource extraction',
      japaneseDefinition: '個人やコミュニティのデータを搾取的に採取し利益を得る行為。歴史的な植民地主義に類似',
      example: 'Crawford argues that data collection by tech firms constitutes data colonialism.',
      difficulty: 'advanced',
      relatedWords: ['exploitation', 'imperialism', 'appropriation']
    },
    {
      id: 'acad-3',
      word: 'Epistemology',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'The study of knowledge; the nature and scope of what can be known and how knowledge is justified',
      japaneseDefinition: '知識論。何が知識であるか、どのように知識が正当化されるかを研究する分野',
      example: 'The book examines the epistemology of AI systems.',
      difficulty: 'advanced',
      relatedWords: ['knowledge', 'philosophy', 'theory']
    },
    {
      id: 'acad-4',
      word: 'Surveillance Capitalism',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'An economic system based on collecting and selling personal data about users for profit',
      japaneseDefinition: 'ユーザーの個人データを収集・販売して利益を得る経済体制',
      example: 'Google and Facebook operate within a model of surveillance capitalism.',
      difficulty: 'advanced',
      relatedWords: ['surveillance', 'monitoring', 'capitalism']
    },
    {
      id: 'acad-5',
      word: 'Algorithmic Bias',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'Systematic discrimination embedded in algorithms, often reflecting biases in training data or design',
      japaneseDefinition: 'アルゴリズムに組み込まれた系統的な差別。訓練データや設計に反映されたバイアス',
      example: 'Hiring algorithms can exhibit algorithmic bias against certain demographics.',
      difficulty: 'advanced',
      relatedWords: ['discrimination', 'bias', 'fairness']
    },
    {
      id: 'acad-6',
      word: 'Infrastructure',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'The fundamental systems and facilities needed for operation; the underlying structure or framework',
      japaneseDefinition: 'システムが機能するために必要な基本的な設備やシステム。基盤となる構造',
      example: 'Data centers form the infrastructure of cloud computing.',
      difficulty: 'intermediate',
      relatedWords: ['foundation', 'framework', 'system']
    },
    {
      id: 'acad-7',
      word: 'Transparency',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'Openness and clarity; the quality of being clear, understandable, and open to scrutiny',
      japaneseDefinition: '透明性。明確で理解しやすく、検証可能である特性',
      example: 'Tech companies lack transparency in their AI algorithms.',
      difficulty: 'intermediate',
      relatedWords: ['clarity', 'openness', 'accountability']
    },
    {
      id: 'acad-8',
      word: 'Accountability',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'The responsibility to explain and justify actions; answerability for conduct and decisions',
      japaneseDefinition: '行動や決定について説明・正当化する責任。行為の責任性',
      example: 'AI systems deployed in criminal justice must have clear accountability.',
      difficulty: 'intermediate',
      relatedWords: ['responsibility', 'liability', 'duty']
    },
    {
      id: 'acad-9',
      word: 'Predictive Policing',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'The use of algorithms and data analysis to predict where crimes will occur and deploy police accordingly',
      japaneseDefinition: 'アルゴリズムとデータ分析を使用して犯罪が起こる場所を予測し、警察を配置すること',
      example: 'Predictive policing systems have been shown to perpetuate existing biases.',
      difficulty: 'advanced',
      relatedWords: ['prediction', 'automation', 'enforcement']
    },
    {
      id: 'acad-10',
      word: 'Feedback Loop',
      category: 'academic',
      partOfSpeech: 'noun',
      definition: 'A process in which the output of a system becomes the input, creating a cycle that reinforces itself',
      japaneseDefinition: 'システムの出力が入力となる反復的なプロセス。初期の傾向を自己強化する循環',
      example: 'Algorithmic bias creates feedback loops that strengthen initial prejudices.',
      difficulty: 'intermediate',
      relatedWords: ['cycle', 'reinforcement', 'self-perpetuating']
    },

    // 一般的な重要な語彙
    {
      id: 'gen-1',
      word: 'Exploit',
      category: 'general',
      partOfSpeech: 'verb',
      definition: 'To use unfairly or take advantage of for one\'s own benefit, especially in a way that harms others',
      japaneseDefinition: '不当に利用する、搾取する。特に自分の利益のために他者を傷つける方法で',
      example: 'Companies exploit workers by paying low wages.',
      difficulty: 'intermediate',
      relatedWords: ['abuse', 'misuse', 'take advantage']
    },
    {
      id: 'gen-2',
      word: 'Imperialism',
      category: 'general',
      partOfSpeech: 'noun',
      definition: 'The policy of extending a country\'s power and influence through colonization or military force',
      japaneseDefinition: '植民地化や軍事力を通じて国家の権力と影響力を拡大する政策',
      example: 'Modern data practices mirror historical imperialism.',
      difficulty: 'advanced',
      relatedWords: ['colonialism', 'expansion', 'domination']
    },
    {
      id: 'gen-3',
      word: 'Appropriation',
      category: 'general',
      partOfSpeech: 'noun',
      definition: 'The action of taking something for one\'s own use, especially without permission',
      japaneseDefinition: '何かを許可なく自分のために奪うこと。不当な所有',
      example: 'The appropriation of indigenous knowledge by corporations is a concern.',
      difficulty: 'intermediate',
      relatedWords: ['seizure', 'taking', 'confiscation']
    },
    {
      id: 'gen-4',
      word: 'Commodify',
      category: 'general',
      partOfSpeech: 'verb',
      definition: 'To treat something as a commodity; to reduce something to a product that can be bought and sold',
      japaneseDefinition: '何かを商品として扱う。売買可能な製品に還元する',
      example: 'Tech companies commodify personal data.',
      difficulty: 'advanced',
      relatedWords: ['commercialize', 'monetize', 'marketize']
    },
    {
      id: 'gen-5',
      word: 'Manifest',
      category: 'general',
      partOfSpeech: 'verb',
      definition: 'To display or show clearly; to demonstrate or reveal',
      japaneseDefinition: '明らかに示す、表現する。明確に示す',
      example: 'The effects of AI inequality manifest in society.',
      difficulty: 'intermediate',
      relatedWords: ['display', 'show', 'reveal']
    },
    {
      id: 'gen-6',
      word: 'Perpetuate',
      category: 'general',
      partOfSpeech: 'verb',
      definition: 'To cause something to continue or be prolonged; to make something persist',
      japaneseDefinition: '何かを継続させる、延長させる。存続させ続ける',
      example: 'Biased algorithms perpetuate discrimination.',
      difficulty: 'intermediate',
      relatedWords: ['continue', 'prolong', 'maintain']
    },
    {
      id: 'gen-7',
      word: 'Scrutiny',
      category: 'general',
      partOfSpeech: 'noun',
      definition: 'Close and careful examination; detailed inspection or investigation',
      japaneseDefinition: '詳細で慎重な検査。注意深い調査や検証',
      example: 'AI systems require public scrutiny and oversight.',
      difficulty: 'intermediate',
      relatedWords: ['examination', 'inspection', 'investigation']
    },
    {
      id: 'gen-8',
      word: 'Opaque',
      category: 'general',
      partOfSpeech: 'adjective',
      definition: 'Not transparent or clear; difficult to understand or see through; unclear in meaning',
      japaneseDefinition: '透明でない、不透明。理解しにくい、見通しが悪い',
      example: 'The workings of AI algorithms are often opaque.',
      difficulty: 'intermediate',
      relatedWords: ['unclear', 'murky', 'obscure']
    },
    {
      id: 'gen-9',
      word: 'Manifest Destiny',
      category: 'general',
      partOfSpeech: 'noun',
      definition: 'A belief that expansion or dominance is justified and inevitable',
      japaneseDefinition: '拡大や支配が正当で不可避であるという信念。帝国主義的思想',
      example: 'Tech companies operate under a form of manifest destiny.',
      difficulty: 'advanced',
      relatedWords: ['inevitability', 'dominance', 'expansion']
    },
    {
      id: 'gen-10',
      word: 'Complicit',
      category: 'general',
      partOfSpeech: 'adjective',
      definition: 'Involved in or helping to cause something bad or illegal; implicitly involved in wrongdoing',
      japaneseDefinition: '悪行や違法行為に関わる、協力する。間接的に加担している',
      example: 'Users may be complicit in data extraction by accepting terms of service.',
      difficulty: 'intermediate',
      relatedWords: ['involved', 'complicit', 'party to']
    }
  ];

  // フィルター処理
  const getFilteredVocabulary = () => {
    if (category === 'all') return vocabularyData;
    return vocabularyData.filter(v => v.category === category);
  };

  const filteredVocab = getFilteredVocabulary();
  const currentWord = filteredVocab[currentWordIndex] || {};

  // クイズ用：4択問題を生成
  const generateQuizOptions = (correctWord, allWords) => {
    const options = [correctWord.definition];
    const otherWords = allWords.filter(w => w.id !== correctWord.id);
    
    while (options.length < 4) {
      const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
      if (!options.includes(randomWord.definition)) {
        options.push(randomWord.definition);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const quizOptions = currentWord.id ? generateQuizOptions(currentWord, filteredVocab) : [];

  // スコア計算
  const calculateQuizScore = () => {
    let correct = 0;
    filteredVocab.forEach((word, idx) => {
      if (quizAnswers[word.id] === word.definition) {
        correct++;
      }
    });
    return Math.round((correct / filteredVocab.length) * 100);
  };

  // リセット関数
  const handleReset = () => {
    setCurrentWordIndex(0);
    setQuizAnswers({});
    setShowResults(false);
    setMode(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>📚 Atlas of AI Vocabulary Master</h1>
        <p>『Atlas of AI』の学術用語と英語語彙を習得しよう</p>
      </div>

      <div className="nav">
        <button 
          onClick={() => { setView('home'); handleReset(); }}
          className={view === 'home' ? 'active' : ''}
        >
          Home
        </button>
        <button 
          onClick={() => { setView('learning'); handleReset(); }}
          className={view === 'learning' ? 'active' : ''}
        >
          Learning
        </button>
        <button 
          onClick={() => { setView('progress'); }}
          className={view === 'progress' ? 'active' : ''}
        >
          Progress
        </button>
      </div>

      {view === 'home' && (
        <div className="home-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Vocabulary</div>
              <div className="stat-value">{vocabularyData.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Academic Terms</div>
              <div className="stat-value">{vocabularyData.filter(v => v.category === 'academic').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">General Words</div>
              <div className="stat-value">{vocabularyData.filter(v => v.category === 'general').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Quizzes Done</div>
              <div className="stat-value">{scores.length}</div>
            </div>
          </div>

          <div className="welcome-section">
            <h2>学習を始めましょう</h2>
            <p>コンテキスト学習と語彙クイズの組み合わせで、『Atlas of AI』の重要な用語と一般的な英語語彙を習得します。</p>
            <button 
              className="start-button"
              onClick={() => setView('learning')}
            >
              学習を開始 →
            </button>
          </div>
        </div>
      )}

      {view === 'learning' && !mode && (
        <div className="learning-mode-section">
          <h2>学習モードを選択</h2>
          <div className="mode-grid">
            <div className="mode-card" onClick={() => setMode('context')}>
              <div className="mode-icon">📖</div>
              <div className="mode-title">コンテキスト学習</div>
              <div className="mode-desc">語彙を文脈と共に学習します。定義、例文、日本語訳で理解を深めます。</div>
            </div>
            <div className="mode-card" onClick={() => setMode('quiz')}>
              <div className="mode-icon">✏️</div>
              <div className="mode-title">語彙クイズ</div>
              <div className="mode-desc">単語の定義から正解を選ぶクイズです。習得度をテストできます。</div>
            </div>
          </div>

          <h3>カテゴリ選択</h3>
          <div className="category-buttons">
            <button 
              onClick={() => setCategory('all')}
              className={category === 'all' ? 'active' : ''}
            >
              すべて (20)
            </button>
            <button 
              onClick={() => setCategory('academic')}
              className={category === 'academic' ? 'active' : ''}
            >
              学術用語 (10)
            </button>
            <button 
              onClick={() => setCategory('general')}
              className={category === 'general' ? 'active' : ''}
            >
              一般語彙 (10)
            </button>
          </div>
        </div>
      )}

      {view === 'learning' && mode === 'context' && !showResults && (
        <div className="learning-card">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentWordIndex + 1) / filteredVocab.length) * 100}%` }}></div>
          </div>
          <div className="progress-text">{currentWordIndex + 1} / {filteredVocab.length}</div>

          <div className="context-content">
            <h2 className="vocab-word">{currentWord.word}</h2>
            <div className="word-info">
              <span className="pos">{currentWord.partOfSpeech}</span>
              <span className="difficulty">{currentWord.difficulty}</span>
            </div>

            <div className="definition-section">
              <h3>定義（英語）</h3>
              <p className="definition">{currentWord.definition}</p>

              <h3>日本語訳</h3>
              <p className="japanese">{currentWord.japaneseDefinition}</p>

              <h3>例文</h3>
              <p className="example">"{currentWord.example}"</p>

              <h3>関連語</h3>
              <div className="related-words">
                {currentWord.relatedWords && currentWord.relatedWords.map((word, idx) => (
                  <span key={idx} className="tag">{word}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="button-group">
            <button onClick={() => currentWordIndex > 0 && setCurrentWordIndex(currentWordIndex - 1)}>← 前へ</button>
            {currentWordIndex < filteredVocab.length - 1 ? (
              <button onClick={() => setCurrentWordIndex(currentWordIndex + 1)}>次へ →</button>
            ) : (
              <button className="submit-button" onClick={() => { setMode(null); setCurrentWordIndex(0); }}>完了</button>
            )}
          </div>
        </div>
      )}

      {view === 'learning' && mode === 'quiz' && !showResults && (
        <div className="quiz-card">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentWordIndex + 1) / filteredVocab.length) * 100}%` }}></div>
          </div>
          <div className="progress-text">問題 {currentWordIndex + 1} / {filteredVocab.length}</div>

          <div className="quiz-content">
            <h2 className="quiz-question">次の定義に合う単語は？</h2>
            <p className="definition-highlight">{currentWord.definition}</p>

            <div className="quiz-options">
              {quizOptions.map((option, idx) => (
                <button
                  key={idx}
                  className={`quiz-option ${quizAnswers[currentWord.id] === option ? 'selected' : ''}`}
                  onClick={() => setQuizAnswers({
                    ...quizAnswers,
                    [currentWord.id]: option
                  })}
                >
                  <span className="option-text">{vocabularyData.find(v => v.definition === option)?.word}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button onClick={() => currentWordIndex > 0 && setCurrentWordIndex(currentWordIndex - 1)}>← 前へ</button>
            {currentWordIndex < filteredVocab.length - 1 ? (
              <button onClick={() => setCurrentWordIndex(currentWordIndex + 1)}>次へ →</button>
            ) : (
              <button className="submit-button" onClick={() => { setShowResults(true); setScores([...scores, { score: calculateQuizScore(), date: new Date().toLocaleDateString() }]); }}>提出</button>
            )}
          </div>
        </div>
      )}

      {view === 'learning' && mode === 'quiz' && showResults && (
        <div className="results-card">
          <div className="results-score">{calculateQuizScore()}%</div>
          <div className="results-message">
            {calculateQuizScore() >= 80 ? '🎉 素晴らしい！' : calculateQuizScore() >= 60 ? '👍 良くできました！' : '📚 もう一度挑戦しましょう！'}
          </div>

          <div className="feedback-section">
            {filteredVocab.map((word, idx) => {
              const isCorrect = quizAnswers[word.id] === word.definition;
              return (
                <div key={idx} className="feedback-item">
                  <div className={`feedback-header ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓' : '✗'} {word.word}
                  </div>
                  {!isCorrect && (
                    <div className="feedback-detail">
                      正解: {word.definition}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="button-group">
            <button onClick={() => { setMode(null); handleReset(); }}>← モード選択に戻る</button>
            <button className="submit-button" onClick={() => { setCurrentWordIndex(0); setQuizAnswers({}); setShowResults(false); }}>もう一度挑戦</button>
          </div>
        </div>
      )}

      {view === 'progress' && (
        <div className="progress-section">
          <h2>学習進捗</h2>
          <div className="progress-stats">
            <div className="progress-card">
              <div className="progress-label">完了したクイズ</div>
              <div className="progress-value">{scores.length}</div>
            </div>
            {scores.length > 0 && (
              <>
                <div className="progress-card">
                  <div className="progress-label">平均スコア</div>
                  <div className="progress-value">{Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length)}%</div>
                </div>
                <div className="progress-card">
                  <div className="progress-label">最高スコア</div>
                  <div className="progress-value">{Math.max(...scores.map(s => s.score))}%</div>
                </div>
              </>
            )}
          </div>

          {scores.length > 0 && (
            <div className="quiz-history">
              <h3>クイズ履歴</h3>
              {scores.map((score, idx) => (
                <div key={idx} className="history-item">
                  <span>{scores.length - idx}回目</span>
                  <span>{score.date}</span>
                  <span className="score">{score.score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VocabularyPlatform;
