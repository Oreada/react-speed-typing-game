import React from 'react';
import useGame from './useGame';
import { RADIO_1, RADIO_2, RADIO_3 } from './constants';

function App() {
  const { text, time, isStarted, count, textareaRef, handleChange, startGame, handleRadioChange, choosenTime } = useGame();

  return (
    <div className='main-box'>
      <h1>How fast do you type?</h1>

      <div className='radiobuttons'>
        <input
          type="radio"
          name="timeForGame"
          id={RADIO_1}
          value={RADIO_1}
          checked={choosenTime === Number(RADIO_1)}
          onChange={handleRadioChange}
        />
        <label htmlFor={RADIO_1}>{RADIO_1}</label>
        <input
          type="radio"
          name="timeForGame"
          id={RADIO_2}
          value={RADIO_2}
          checked={choosenTime === Number(RADIO_2)}
          onChange={handleRadioChange}
        />
        <label htmlFor={RADIO_2}>{RADIO_2}</label>
        <input
          type="radio"
          name="timeForGame"
          id={RADIO_3}
          value={RADIO_3}
          checked={choosenTime === Number(RADIO_3)}
          onChange={handleRadioChange}
        />
        <label htmlFor={RADIO_3}>{RADIO_3}</label>
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        disabled={!isStarted}
      />
      <h2>Time remaining: {time}</h2>
      <button onClick={startGame}>Start</button>
      <h2>Word count: {count}</h2>
    </div>
  );
}

export default App;
