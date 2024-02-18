import Cards from '../../components/Cards/Cards';
import React, { useState } from 'react';
import style from './Games.module.scss';
import { useContext } from 'react';
import { WordsContext } from '../../context/wordsContext';

export default function Games() {


const {dataServer,setDataServer}=useContext(WordsContext);//достаем данные из wordsContext

const [currentIndex, setCurrentIndex] = useState(0); //хук для индексов, чтобы можно было перелистывать карточки
    function goToPreviousCard() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function goToNextCard() {
        if (currentIndex < dataServer.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const [learnedWords, setCount] = useState(0);
    const addWord=()=>{
        setCount(learnedWords+1);
    }

return (
    <div className={style.wrapper}>
        <div className={style.cards}>
            <button onClick={goToPreviousCard} className={style.cards__button}>←</button>
                <Cards
                    key={dataServer[currentIndex].id}
                    english={dataServer[currentIndex].english}
                    transcription={dataServer[currentIndex].transcription}
                    russian={dataServer[currentIndex].russian}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    addWord={()=>addWord()}
                />
            <button onClick={goToNextCard} className={style.cards__button}>→</button>
            </div>
            <div className={style.cards__counter}>Изучено  {learnedWords}  слов </div>
            </div>
    )
}
