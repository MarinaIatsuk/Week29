
import React, { useState } from 'react';
import style from './Cards.module.scss';
const Cards = ({ id, english, transcription, russian, addWord}) => {
    const [translation, setTranslation] = useState(false);

    function showTranslation() {
        setTranslation(!translation);
    }

//прим для меня: в onClick нельзя поместить две функции отдельно, но можно одну функцию, в которой их две:
    return (
        <React.Fragment>
       <div className={style.card} onClick={() => { addWord(); showTranslation(); }}> 
            <div className={style.card__word}>{english}</div>
            <div className={style.card__transcription}>{transcription}</div>
            {translation ? <div className={style.card__translation}>{russian}</div> :
                <div className={style.card__button}>Нажмите, чтобы проверить себя</div>}
        </div>
        </React.Fragment>
    );
};

export default Cards;
