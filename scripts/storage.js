export default class LocalStorageUtil {
  static setItem(key, value = []) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Ошибка сохранения данных в localStorage', error);
    }
  }

  static getItem(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Ошибка получения данных из localStorage', error);
      return null;
    }
  }

  // Проверка, существует ли элемент в localStorage
  static hasItem(key) {
    if (localStorage.getItem(key) === null) {
      this.setItem(key);
    }
  }
}
