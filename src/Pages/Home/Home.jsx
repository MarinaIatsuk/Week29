import style from "./Home.module.scss";
//import data from "../../data.json";
import Line from "../../components/Line/Line";
import { useState, useContext } from "react";
import { WordsContext } from "../../context/wordsContext";

const Home = () => {
  //достаем данные из wordsContext
  const { dataServer, setDataServer } = useContext(WordsContext);

  //const [items, setItems] = useState(dataServer); //добавляем хук для отрисовки нового списка после удаления и при отрисовке указываем массивом не data, a items

  const deleteItem = async (id) => {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
        method: "POST",
      }); //сходили в АПИ для удаления выбранного элемента
      const updatedList = dataServer.filter((item) => item.id !== id); //фильтр, в котором отрисовываем список без выбранного id
      setDataServer(updatedList); //обновили список
    } catch (error) {
      console.error(error);
    }
  };

  //функция сохранения измененных прльзоватем слов
  const saveChanges = async (
    id,
    editedEnglish,
    editedTranscription,
    editedRussian
  ) => {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, //сходили в апи, чтобы поменять данные
        body: JSON.stringify({
          // JSON.stringify для преобразования данных в формат JSON
          english: editedEnglish,
          transcription: editedTranscription,
          russian: editedRussian,
        }),
      });

      const updatedList = dataServer.map((item) => {
        //в этом случае в updatedList записываем измененные пользоватем данные
        if (item.id === id) {
          //если это тот элемент, который я редактирую, то отрисуй мне этот элемент с изменениями пользователя
          return {
            ...item, //spread-оператор. используется для создания нового объекта, который содержит все свойства объекта item, но с измененными значениями для определенных свойств (а именно, english, transcription, russian).
            english: editedEnglish,
            transcription: editedTranscription,
            russian: editedRussian,
          };
        }
        return item;
      });

      setDataServer(updatedList);
    } catch (e) {
      console.error(e);
    }
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
        {dataServer.map((item) => (
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
