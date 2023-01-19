import React from 'react';
import useGame from './useGame';

//* TODO: Сделать варианты выбора времени
function App() {
  const { text, time, isStarted, count, textareaRef, handleChange, startGame } = useGame();

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        disabled={!isStarted}
      />
      <h4>Time remaining: {time}</h4>
      <button onClick={startGame}>Start</button>
      <h2>Word count: {count}</h2>
    </div>
  );
}

export default App;
