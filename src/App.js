import React, { useState } from 'react';
import './App.css';

const ReadingPlatform = () => {
  const [view, setView] = useState('dashboard');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({ level1: [], level2: [], level3: [] });

  const questions = {
    level1: [
      {
        id: '1-1',
        text: 'The book uses the metaphor of an "atlas" to understand artificial intelligence. What does "atlas" mean?',
        type: 'multiple',
        options: ['A professional athlete', 'A book of maps', 'An ancient god', 'A computer engineer'],
        correct: 1,
        explanation: 'Crawford uses "atlas" as a metaphor—like a map book that shows multiple scales and perspectives—to understand AI through multiple lenses: environmental, labor, and political.'
      },
      {
        id: '1-2',
        text: 'According to the text, lithium mining in Nevada is unrelated to artificial intelligence development.',
        type: 'truefalse',
        correct: false,
        explanation: 'False. Chapter 1 "Earth" discusses how Nevada\'s lithium mining directly supports AI battery and semiconductor production.'
      },
      {
        id: '1-3',
        text: 'In the sentence "Data labeling requires enormous amounts of human work," what is the main verb?',
        type: 'short',
        correct: 'requires',
        explanation: 'The verb "requires" shows that data labeling depends heavily on human labor—a key point in the Labor chapter.'
      }
    ],
    level2: [
      {
        id: '2-1',
        text: 'Why does Crawford open with the "Clever Hans" horse story in the introduction?',
        type: 'essay',
        correct: 'metaphor, intelligence, systems, hidden',
        explanation: 'The horse appeared intelligent but actually relied on unconscious signals. Crawford uses this to warn that AI appears intelligent but depends on hidden infrastructure (mining, labor, data).'
      },
      {
        id: '2-2',
        text: 'Data extraction by tech companies can be understood as:',
        type: 'multiple',
        options: ['Simple data collection', 'Exploitative resource extraction', 'Neutral technical process', 'User empowerment'],
        correct: 1,
        explanation: 'Crawford argues data collection is "data colonialism"—exploitative extraction of personal resources by tech corporations.'
      }
    ],
    level3: [
      {
        id: '3-1',
        text: 'Analyze Crawford\'s distinction between "AI as problematic technology" vs "AI as power system." Which view is hers and why does it matter?',
        type: 'essay',
        correct: 'power, structure, reform, inequality, fundamental',
        explanation: 'Crawford advocates for viewing AI as a power system that concentrates wealth and reproduces inequality. This matters because it demands structural change, not just ethical guidelines.'
      }
    ]
  };

  const calculateScore = (level) => {
    const levelQuestions = questions[level];
    let correct = 0;
    levelQuestions.forEach((q) => {
      const answer = userAnswers[q.id];
      if (!answer) return;
      
      if (q.type === 'multiple' || q.type === 'truefalse') {
        if (answer === q.correct) correct++;
      } else if (q.type === 'short') {
        if (answer.toLowerCase().trim() === q.correct.toLowerCase().trim()) correct++;
      } else if (q.type === 'essay') {
        const keywords = q.correct.split(', ');
        const matchCount = keywords.filter(kw => answer.toLowerCase().includes(kw.toLowerCase())).length;
        if (matchCount >= Math.ceil(keywords.length * 0.6)) correct++;
      }
    });
    return Math.round((correct / levelQuestions.length) * 100);
  };

  const handleSubmitLevel = () => {
    const score = calculateScore(selectedLevel);
    setScores(prev => ({
      ...prev,
      [selectedLevel]: [...prev[selectedLevel], { score, date: new Date().toLocaleDateString() }]
    }));
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleStartLevel = (level) => {
    setSelectedLevel(level);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const allScores = [...scores.level1, ...scores.level2, ...scores.level3];
  const avgScore = allScores.length > 0 
    ? Math.round(allScores.reduce((sum, s) => sum + s.score, 0) / allScores.length)
    : 0;

  return (
    <div className="container">
      <div className="header">
        <h1>Atlas of AI: Reading Platform</h1>
        <p>English comprehension exercises based on Kate Crawford's "Atlas of AI"</p>
      </div>

      <div className="nav">
        <button 
          onClick={() => setView('dashboard')}
          className={view === 'dashboard' ? 'active' : ''}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setView('practice')}
          className={view === 'practice' ? 'active' : ''}
        >
          Practice
        </button>
      </div>

      {view === 'dashboard' && (
        <>
          <div className="metrics">
            <div className="metric-card">
              <div className="metric-label">Total Score</div>
              <div className="metric-value">{avgScore}%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Questions Completed</div>
              <div className="metric-value">{allScores.length}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Level 1 Attempts</div>
              <div className="metric-value">{scores.level1.length}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Level 2 Attempts</div>
              <div className="metric-value">{scores.level2.length}</div>
            </div>
          </div>

          <div className="progress-section">
            <h2>Your Progress</h2>
            <div className="level-grid">
              <div className="level-card">
                <div className="level-title">Level 1: Beginner</div>
                <div className="level-desc">Vocabulary, basic comprehension</div>
                <div className="level-stats">
                  {scores.level1.length > 0 
                    ? `Best: ${Math.max(...scores.level1.map(s => s.score))}%`
                    : 'No attempts yet'
                  }
                </div>
              </div>
              <div className="level-card">
                <div className="level-title">Level 2: Intermediate</div>
                <div className="level-desc">Analysis, inference, synthesis</div>
                <div className="level-stats">
                  {scores.level2.length > 0 
                    ? `Best: ${Math.max(...scores.level2.map(s => s.score))}%`
                    : 'No attempts yet'
                  }
                </div>
              </div>
              <div className="level-card">
                <div className="level-title">Level 3: Advanced</div>
                <div className="level-desc">Critical thinking, synthesis</div>
                <div className="level-stats">Coming soon</div>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'practice' && !selectedLevel && (
        <div className="practice-section">
          <h2>Select a Level</h2>
          <div className="level-grid">
            <div className="level-card clickable" onClick={() => handleStartLevel('level1')}>
              <div className="level-title">Level 1: Beginner</div>
              <div className="level-desc">Build foundational reading skills with vocabulary and comprehension questions</div>
              <button className="start-btn">Start Level</button>
            </div>
            <div className="level-card clickable" onClick={() => handleStartLevel('level2')}>
              <div className="level-title">Level 2: Intermediate</div>
              <div className="level-desc">Develop analytical skills through inference and context-based questions</div>
              <button className="start-btn">Start Level</button>
            </div>
            <div className="level-card clickable" onClick={() => handleStartLevel('level3')}>
              <div className="level-title">Level 3: Advanced</div>
              <div className="level-desc">Master critical thinking with complex analysis and synthesis exercises</div>
              <button className="start-btn">Start Level</button>
            </div>
          </div>
        </div>
      )}

      {selectedLevel && !showResults && (
        <div className="question-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / questions[selectedLevel].length) * 100}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} of {questions[selectedLevel].length}
          </div>

          <div className="question-text">{questions[selectedLevel][currentQuestion].text}</div>

          {questions[selectedLevel][currentQuestion].type === 'multiple' && (
            <div className="options">
              {questions[selectedLevel][currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-button ${userAnswers[questions[selectedLevel][currentQuestion].id] === idx ? 'selected' : ''}`}
                  onClick={() => setUserAnswers({
                    ...userAnswers,
                    [questions[selectedLevel][currentQuestion].id]: idx
                  })}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[selectedLevel][currentQuestion].type === 'truefalse' && (
            <div className="options">
              <button
                className={`option-button ${userAnswers[questions[selectedLevel][currentQuestion].id] === true ? 'selected' : ''}`}
                onClick={() => setUserAnswers({
                  ...userAnswers,
                  [questions[selectedLevel][currentQuestion].id]: true
                })}
              >
                True
              </button>
              <button
                className={`option-button ${userAnswers[questions[selectedLevel][currentQuestion].id] === false ? 'selected' : ''}`}
                onClick={() => setUserAnswers({
                  ...userAnswers,
                  [questions[selectedLevel][currentQuestion].id]: false
                })}
              >
                False
              </button>
            </div>
          )}

          {(questions[selectedLevel][currentQuestion].type === 'short' || questions[selectedLevel][currentQuestion].type === 'essay') && (
            <textarea
              value={userAnswers[questions[selectedLevel][currentQuestion].id] || ''}
              onChange={(e) => setUserAnswers({
                ...userAnswers,
                [questions[selectedLevel][currentQuestion].id]: e.target.value
              })}
              placeholder="Enter your answer here..."
            />
          )}

          <div className="button-group">
            <button onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}>← Back</button>
            {currentQuestion < questions[selectedLevel].length - 1 ? (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next →</button>
            ) : (
              <button className="submit-button" onClick={handleSubmitLevel}>Submit Answers</button>
            )}
          </div>
        </div>
      )}

      {showResults && (
        <div className="results">
          <div className="results-score">{calculateScore(selectedLevel)}%</div>
          <div className="results-message">
            {calculateScore(selectedLevel) >= 80 ? '🎉 Excellent work!' : calculateScore(selectedLevel) >= 60 ? '👍 Good effort!' : '📚 Keep practicing!'}
          </div>
          
          <div className="feedback-section">
            {questions[selectedLevel].map((q, idx) => {
              const isCorrect = selectedLevel === 'level1' || selectedLevel === 'level2' ? 
                (q.type === 'multiple' || q.type === 'truefalse' ? userAnswers[q.id] === q.correct : true) :
                true;
              return (
                <div key={idx} className="feedback-item">
                  <div className={`feedback-header ${isCorrect ? 'correct' : 'incorrect'}`}>
                    Q{idx + 1}: {isCorrect ? '✓' : '○'} {q.text}
                  </div>
                  <div className="feedback">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="button-group">
            <button onClick={handleReset}>← Back to Levels</button>
            <button className="submit-button" onClick={() => handleStartLevel(selectedLevel)}>Retry Level</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingPlatform;
