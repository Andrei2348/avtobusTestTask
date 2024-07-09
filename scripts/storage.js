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

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Ошибка удаления данных из localStorage', error);
    }
  }

  // Проверить, существует ли элемент в localStorage
  static hasItem(key) {
    if(localStorage.getItem(key) === null){
        this.setItem(key)
    };
  }

  // Очистить все данные из localStorage
  // static clear() {
  //   try {
  //     localStorage.clear();
  //   } catch (error) {
  //     console.error('Ошибка очистки localStorage', error);
  //   }
  // }

  // // Получить все ключи из localStorage
  // static getAllKeys() {
  //   try {
  //     return Object.keys(localStorage);
  //   } catch (error) {
  //     console.error('Ошибка получения всех ключей localStorage', error);
  //     return [];
  //   }
  // }
}

// Примеры использования:

// Установка элемента
//   LocalStorageUtil.setItem('username', 'JohnDoe');

// Получение элемента
//   const username = LocalStorageUtil.getItem('username');
//   console.log(username); // Output: JohnDoe

// Проверка существования элемента
//   const hasUsername = LocalStorageUtil.hasItem('username');
//   console.log(hasUsername); // Output: true

// Получение всех ключей
//   const allKeys = LocalStorageUtil.getAllKeys();
//   console.log(allKeys); // Output: ['username']

// Удаление элемента
//   LocalStorageUtil.removeItem('username');

// Очистка всех данных
//   LocalStorageUtil.clear();
