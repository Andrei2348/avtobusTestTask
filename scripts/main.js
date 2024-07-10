import LocalStorageUtil from './storage.js';
import { renderCategory, renderCategoryForUser, renderAllUsers } from './render.js';

document.addEventListener('DOMContentLoaded', function () {
  const categoriesList = document.getElementById('groups__list');
  const addUserForm = document.getElementById('add__user');
  const asideCloseButton = document.querySelectorAll('.aside__close-button');
  const savePerson = document.getElementById('save__person');
  const personData = document.getElementById('profileData');
  const personPhone = document.getElementById('profilePhone');
  const personCategory = document.getElementById('profileCategory');
  const addCategoryButton = document.getElementById('add__category');
  const saveCategoryButton = document.getElementById('save__category');

  let fullName,
    phone,
    categoryName,
    selectedCategory = '';

  // Проверяем существование записей в localStorage и, если
  // записей нет, создаем
  LocalStorageUtil.hasItem('categories');
  LocalStorageUtil.hasItem('users');
  renderAllUsers()

  // Открытие и закрытие aside
  categoriesList.onclick = function () {
    document.getElementById('aside__groups-list').classList.add('active');
    renderCategory();
    categoryService();
  };

  addUserForm.onclick = function () {
    openAsideUsers()
    cleanInputFormUser()
    renderCategoryForUser();
    
  };

  asideCloseButton.forEach((button, index) => {
    button.onclick = function () {
      closeAside(index);
    };
  });
  
const openAsideUsers = () => {
  document.getElementById('aside__add-user').classList.add('active');
}

  const closeAside = (index) =>{
    document.querySelectorAll('.aside')[index].classList.remove('active');
    renderAllUsers();
  }

  // Контроль ввода данных для регистрации пользователя
  personPhone.addEventListener('input', function (e) {
    phone = e.target.value.replace(/\D/g, '');
    e.target.value = phone;
  });

  personData.addEventListener('input', () => {
    fullName = personData.value;
  });
  // personPhone.addEventListener('input', (e) => {
  //   phone = e.target.value.replace(/\D/g, '').match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  //   e.target.value = '+7(' + phone[2] + ')' + phone[3] + (phone[4] ? '-' + phone[4] : '') + (phone[5] ? '-' + phone[5] : '');
  // });

  personCategory.addEventListener('change', (event) => {
    selectedCategory = event.target.value;
  });

  savePerson.onclick = function () {
    if (fullName && fullName.trim().split(/\s+/).length >= 3 && phone.length === 6 && selectedCategory !== '') {
      let lastId = 0;
      const usersArray = LocalStorageUtil.getItem('users');
      if (usersArray.length > 0) {
        lastId = usersArray.at(-1).id + 1;
      }
      const user = {
        id: lastId,
        fullName: fullName,
        phone: phone,
        category: selectedCategory,
      };
      let newUsersArray = LocalStorageUtil.getItem('users');
      LocalStorageUtil.setItem('users', [...newUsersArray, user]);
      closeAside(1);
      cleanInputFormUser();
    }
  };

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
        closeAside(0)
      };
    };
  }

  function cleanInputFormUser(){
    personData.value = '';
    personPhone.value = '';
    // Добавить сброс селекта
  }
});
export default openAsideUsers


// Доделать маску телефона, выпадашку категорий, редактирование пользователя, стили