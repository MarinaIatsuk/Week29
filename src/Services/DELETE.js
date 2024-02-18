class DELETE {
  static async deleteWord(id) {
    try {
      await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
        method: "POST",
      });
      const updatedList = dataServer.filter((item) => item.id !== id);
      setDataServer(updatedList);
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
export default DELETE;
