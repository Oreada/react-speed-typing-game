import React, { useEffect, useRef, useState } from 'react';

//* TODO: Сделать варианты выбора времени
function App() {
  const TIME_FOR_GAME = 10;
  const [text, setText] = useState('');
  const [time, setTime] = useState(TIME_FOR_GAME);
  const [isStarted, setIsStarted] = useState(false);
  const [count, setCount] = useState(0);
  const textareaRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const startGame = () => {
    setIsStarted(true);
    setTime(TIME_FOR_GAME);
    setCount(0);
    setText("");
    (textareaRef.current as unknown as HTMLTextAreaElement).disabled = false; //! добавляем эту строку, т.к. setIsStarted не срабатывает мгновенно
    (textareaRef.current as unknown as HTMLTextAreaElement).focus();
  };

  const endGame = () => {
    setIsStarted(false);
    const arr = text.trim().split(" ");
    const filteredArr = arr.filter(word => word.length > 2); //! считаю слова только больше двух символов
    console.log(arr.length, filteredArr.length);
    setCount(filteredArr.length);
  };

  useEffect(() => {
    let id: NodeJS.Timeout;
    if ((time > 0) && isStarted) {
      id = setTimeout(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (time === 0) {
      endGame();
    };

    return () => clearTimeout(id);
  }, [time, isStarted])

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
