import { useCallback, useEffect, useRef, useState } from "react";
import { RADIO_1 } from './constants';

function useGame() {
	const [choosenTime, setChoosenTime] = useState(Number(RADIO_1));
	const [text, setText] = useState('');
	const [time, setTime] = useState(choosenTime);
	const [isStarted, setIsStarted] = useState(false);
	const [count, setCount] = useState(0);
	const textareaRef = useRef(null);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChoosenTime(Number(event.target.value));
		setTime(Number(event.target.value));

		(textareaRef.current as unknown as HTMLTextAreaElement).focus();
		setText("");
	};

	const startGame = () => {
		setIsStarted(true);
		setTime(choosenTime);
		setCount(0);
		setText("");
		(textareaRef.current as unknown as HTMLTextAreaElement).disabled = false; //! добавляем эту строку, т.к. setIsStarted не срабатывает мгновенно
		(textareaRef.current as unknown as HTMLTextAreaElement).focus();
	};

	const endGame = useCallback(() => {
		setIsStarted(false);
		const arr = text.trim().split(" ");
		const filteredArr = arr.filter(word => word.length > 1); //! считаю слова только длиннее одного символа
		console.log(arr.length, filteredArr.length);
		setCount(filteredArr.length);
	}, [text]);

	useEffect(() => {
		// let id: NodeJS.Timeout;
		// if ((time > 0) && isStarted) {
		let id = setTimeout(() => {
			if ((time > 0) && isStarted) {
				setTime(time => time - 1)
			} else if (time === 0) {
				endGame();
			};
		}, 1000);

		return () => {
			clearTimeout(id);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time, isStarted])

	return { text, time, isStarted, count, textareaRef, handleChange, startGame, handleRadioChange, choosenTime };
}

export default useGame;
