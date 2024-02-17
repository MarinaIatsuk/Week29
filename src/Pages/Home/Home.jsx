import style from "./Home.module.scss";
import data from "../../data.json";
import Line from "../../components/Line/Line";
import { useState } from "react";

const Home = () => {
  const [items, setItems] = useState(data); //добавляем хук для отрисовки нового списка после удаления и при отрисовке указываем массивом не data, a items

  const deleteItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id); //фильтр, в котором отрисовываем список без выбранного id
    setItems(updatedList);
    //console.log(id); //Проверка работоспособности функции
  };

  //функция сохранения измененных прльзоватем слов
  const saveChanges = (
    id,
    editedEnglish,
    editedTranscription,
    editedRussian
  ) => {
    const updatedList = items.map((item) => { //в этом случае в updatedList записываем измененные пользоватем данные
      if (item.id === id) { //если это тот элемент, который я редактирую, то отрисуй мне этот элемент с изменениями пользователя
        return {
          ...item, //spread-оператор. используется для создания нового объекта, который содержит все свойства объекта item, но с измененными значениями для определенных свойств (а именно, english, transcription, russian).
          english: editedEnglish,
          transcription: editedTranscription,
          russian: editedRussian,
        };
      }
      return item;
    });

    setItems(updatedList);
  };

  return (
    <>
      <div className={style.table}>
        <div className={style.table__head}>
          <div className={style.table__number}>1</div>
          <div className={style.table__english}>Слово на английском</div>
          <div className={style.table__transcription}>Транскрипция</div>
          <div className={style.table__russian}>Слово на русском</div>
          <div className={style.table__buttons}></div>
        </div>
        {items.map((item) => (
          <Line
            key={item.id}
            id={item.id}
            english={item.english}
            transcription={item.transcription}
            russian={item.russian}
            deleteItem={() => deleteItem(item.id)}
            saveChanges={saveChanges} //передали ф-цию saveChanges в компонент Line
          />
        ))}
      </div>
    </>
  );
};

export default Home;
