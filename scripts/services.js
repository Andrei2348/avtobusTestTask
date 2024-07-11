import LocalStorageUtil from './storage.js';
import { renderCategory, renderAllUsers, renderCategoryForUser } from './render.js';

const personData = document.getElementById('profileData');
const personPhone = document.getElementById('profilePhone');
const personCategory = document.querySelector('.aside__input-hidden');
const savePerson = document.getElementById('save__person');
const addCategoryButton = document.getElementById('add__category');
const saveCategoryButton = document.getElementById('save__category');
let categoryName = '';
let createdUser = {};

const checkCategories = () => {
  if (document.querySelectorAll('.accordion-content').length > 0) {
    document.querySelectorAll('.accordion-content').forEach((element, index) => {
      if (!element.hasChildNodes()) {
        document.querySelectorAll('.accordion__button')[index].disabled = true;
        document.querySelectorAll('.accordion__button')[index].classList.add('empty');
      } else {
        document.querySelectorAll('.accordion__button')[index].disabled = false;
        document.querySelectorAll('.accordion__button')[index].classList.remove('empty');
      }
    });
  }
};

const deleteUser = (id, users) => {
  document.querySelector(`[data-user-id="${id}"]`).remove();
  const filteredArray = filterUsersById(users, id);
  LocalStorageUtil.setItem('users', filteredArray);
  renderAllUsers();
};

function filterUsersById(users, id) {
  return users.filter((item) => item.id !== Number(id));
}

const closeAside = (index) => {
  document.querySelectorAll('.aside')[index].classList.remove('active');
  renderAllUsers();
};

// Удаление пользователей по удаляемой категории
const sortUsersByDeletedCategory = (idToRemove) => {
  const users = LocalStorageUtil.getItem('users');
  const newUsers = users.filter((item) => Number(item.category) !== idToRemove);
  LocalStorageUtil.setItem('users', newUsers);
};

const deleteCategory = (element, categories) => {
  const idToRemove = Number(element.getAttribute('data-id'));
  document.querySelector(`[data-parent-id="${idToRemove}"]`).remove();
  const filteredArray = categories.filter((item) => item.id !== idToRemove);
  LocalStorageUtil.setItem('categories', filteredArray);
  sortUsersByDeletedCategory(idToRemove);
  renderCategory();
};

function filterUsersByCategory(users, category) {
  return users.filter((item) => item.category == category.id);
}

const openAsideUsers = (user = {}) => {
  renderCategoryForUser();
  document.getElementById('aside__add-user').classList.add('active');
  cleanInputFormUser(user);
};

// Функция заполнения\очистки формы пользователя
function cleanInputFormUser(user) {
  let categoryName = 'Выберите группу';
  if (JSON.stringify(user) === '{}') {
    user = {
      fullName: '',
      phone: '',
      category: '',
    };
  } else {
    const categories = LocalStorageUtil.getItem('categories');
    categoryName = categories.find(cat => cat.id === Number(user.category)).category;
    createdUser = user;
  }
  document.getElementById('profileData').value = user.fullName;
  document.getElementById('profilePhone').value = user.phone;
  document.getElementById('profileCategory').innerText = categoryName;
  document.querySelector('.aside__input-hidden').value = user.category;
  createUser();
}

function createUser() {
  // Маска для телефона
  personPhone.addEventListener('input', function (event) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.startsWith('7')) {
      input = input.substring(1);
    }
    let formattedInput = '+7';

    if (input.length > 0) {
      formattedInput += ' (' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedInput += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formattedInput += '-' + input.substring(8, 10);
    }

    event.target.value = formattedInput.substring(0, 18);
    createdUser.phone = event.target.value;
  });

  personPhone.addEventListener('keydown', function (event) {
    // Если пользователь нажимает BACKSPACE или DELETE, удаляем последний символ
    if (event.key === 'Backspace' || event.key === 'Delete') {
      let input = event.target.value.replace(/\D/g, '');
      if (input.startsWith('7')) {
        input = input.substring(1);
      }
      event.target.value = formatPhone(input.substring(0, input.length - 1));
      event.preventDefault();
    }
  });

  function formatPhone(input) {
    let formattedInput = '+7';
    if (input.length > 0) {
      formattedInput += ' (' + input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedInput += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formattedInput += '-' + input.substring(8, 10);
    }
    return formattedInput.substring(0, 18);
  }
  // ==========================================

  personData.addEventListener('input', () => {
    createdUser.fullName = personData.value;
  });

  savePerson.onclick = function () {
    createdUser.category = personCategory.value;
    const usersArray = LocalStorageUtil.getItem('users');
    if (createdUser.fullName && createdUser.fullName.trim().split(/\s+/).length >= 3 && createdUser.phone.length === 18 && createdUser.category !== '') {
      if (!createdUser.hasOwnProperty('id')) {
        let lastId = 0;
        if (usersArray.length > 0) {
          lastId = usersArray.at(-1).id + 1;
        }
        createdUser.id = lastId;
      }
      // Проверяем, существует ли пользователь с данным id
      if (!usersArray.some((user) => Number(user.id) === Number(createdUser.id))) {
        LocalStorageUtil.setItem('users', [...usersArray, createdUser]);
      } else {
        // Если объект с таким id уже существует:
        const index = usersArray.findIndex((item) => item.id === createdUser.id);
        const updatedArray = [...usersArray];
        updatedArray[index] = createdUser;
        LocalStorageUtil.setItem('users', updatedArray);
      }
      createdUser = {};
      closeAside(1);
    }
  };
}

// Работа с категориями
function createCategory(value) {
  let lastId = 0;
  let categoriesArray = LocalStorageUtil.getItem('categories');
  if (categoriesArray.length > 0) {
    lastId = categoriesArray.at(-1).id + 1;
  }
  let category = {
    id: lastId,
    category: value,
  };
  return [...categoriesArray, category];
}

function categoryService() {
  addCategoryButton.onclick = function () {
    addCategoryButton.disabled = true;
    const newCategories = createCategory('');
    renderCategory(newCategories);
    const inputs = document.querySelectorAll('.aside__category-name');
    inputs[inputs.length - 1].readOnly = false;
    inputs[inputs.length - 1].addEventListener('input', function (e) {
      categoryName = e.target.value;
      categoryName ? (saveCategoryButton.disabled = false) : (saveCategoryButton.disabled = true);
    });

    saveCategoryButton.onclick = function () {
      addCategoryButton.disabled = false;
      saveCategoryButton.disabled = true;
      LocalStorageUtil.setItem('categories', createCategory(categoryName));
      // renderCategory(LocalStorageUtil.getItem('categories'));
      closeAside(0);
    };
  };
}

const closeCategories = () => {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach((header) => {
    const content = header.nextElementSibling;
    content.style.maxHeight = null;
    header.classList.remove('active');
  });
  document.querySelectorAll('.accordion-content').forEach((item) => {
    item.style.maxHeight = null;
  });
};

export { checkCategories, deleteUser, closeAside, deleteCategory, filterUsersByCategory, openAsideUsers, categoryService, closeCategories };
