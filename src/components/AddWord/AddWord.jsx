
import React, { useState,useContext, useEffect  } from 'react';

import style from "./AddWord.module.scss";



export default function AddWord() {


  const [englishValue, setEnglishValue] = useState('');
  const [transcriptionValue, setTranscriptionValue] = useState('');
  const [russianValue, setRussianValue] = useState('');


  const isLatin = (text) => /^[a-zA-Z\s]+$/.test(text);
  const isCyrillic = (text) => /^[а-яА-Я\s]+$/.test(text);

  const sendWord =async() => {

   

    if (
      englishValue.trim() === "" ||
      transcriptionValue.trim() === "" ||
      russianValue.trim() === ""
    ) {
      alert("Пожалуйста, заполните все поля перед сохранением.");
      return;
    }
    if (!isLatin(englishValue) || !isLatin(transcriptionValue)) {
      alert("Выделенное поле должно содержать только латинские буквы");
      return;
    }

    if (!isCyrillic(russianValue)) {
      alert("Выделенное поле должно содержать только кириллицу");
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
  // setEnglishValue('');
  // setTranscriptionValue('');
  // setRussianValue('');
  //location.reload() //так себе мера. Пока временная
}

  return (
    <div className={style.table__add}>
      <input
         className={`${style.table__english} ${isLatin(englishValue) ? '' : style.invalid}`}
        onChange={(e) => setEnglishValue(e.target.value)}
      />
      <input 
       className={`${style.table__transcription} ${isLatin(transcriptionValue) ? '' : style.invalid}`}
      onChange={(e) => setTranscriptionValue(e.target.value)}/>
      <input 
      className={`${style.table__russian} ${isCyrillic(russianValue) ? '' : style.invalid}`}
      onChange={(e) => setRussianValue(e.target.value)}/>
      <div 
      className={style.table__buttons}>
        <button onClick={sendWord}>Добавить слово</button>
      </div>
    </div>
  );
}
