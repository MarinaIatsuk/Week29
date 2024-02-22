import Loading from "../components/Loading/Loading";
import { createContext, useEffect, useState } from "react";
import GET from "../Services/GET";


export const WordsContext = createContext();

export function WordsContextComponent({ children }) {
  const [dataServer, setDataServer] = useState(false);

  const value = { dataServer, setDataServer };

  useEffect(() => {
    getWordsServer();
  }); //сделала его componentDidUpdate, чтобы обновлялся каждый раз, когда обновляется апи (при добавлении слов, например)

  async function getWordsServer() {
    const usersServer = await GET.getWords();
    setDataServer(usersServer);
  }

  if (!dataServer) {
    return (

<Loading/>
    );
  }

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
}
