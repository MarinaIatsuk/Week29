
import React, { useState } from 'react';
import { WordsContext,useContext, useEffect } from "../../context/wordsContext";
import style from "./AddWord.module.scss";



export default function AddWord() {
  const { dataServer, setDataServer } = useContext(WordsContext);

  const [englishValue, setEnglishValue] = useState('');
  const [transcriptionValue, setTranscriptionValue] = useState('');
  const [russianValue, setRussianValue] = useState('');


  const sendWord =async() => {
    if (
      englishValue.trim() === "" ||
      transcriptionValue.trim() === "" ||
      russianValue.trim() === ""
    ) {
      alert("Пожалуйста, заполните все поля перед сохранением.");
      return;
    }
    const newWord={
      "english":englishValue,
      "transcription":`[${transcriptionValue}]`,
      "russian":russianValue,
    }
    try {
      await fetch(`/api/words/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(newWord),
      })
        .then((data) => {
          console.log("Данные успешно изменены:", data);
        });
  }catch (e) {
    console.error(e);
  }
  useEffect(()=>{
    
  })
  location.reload() //так себе мера. Пока временная
}

  return (
    <div className={style.table__add}>
      <div className={style.table__number}></div>
      <input
        className={style.table__english}
        onChange={(e) => setEnglishValue(e.target.value)}
      />
      <input className={style.table__transcription} 
      onChange={(e) => setTranscriptionValue(e.target.value)}/>
      <input className={style.table__russian} 
      onChange={(e) => setRussianValue(e.target.value)}/>
      <div className={style.table__buttons}>
        <button onClick={sendWord}>Добавить слово</button>
      </div>
    </div>
  );
}
