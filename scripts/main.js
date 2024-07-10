import LocalStorageUtil from './storage.js';
import { renderCategory, renderAllUsers, openAsideUsers, closeAside } from './render.js';

document.addEventListener('DOMContentLoaded', function () {
  const categoriesList = document.getElementById('groups__list');
  const addUserForm = document.getElementById('add__user');
  const asideCloseButton = document.querySelectorAll('.aside__close-button');
  const addCategoryButton = document.getElementById('add__category');
  const saveCategoryButton = document.getElementById('save__category');
  let categoryName = '';
  // Проверяем существование записей в localStorage и, если
  // записей нет, создаем
  LocalStorageUtil.hasItem('categories');
  LocalStorageUtil.hasItem('users');
  renderAllUsers()
  console.log(LocalStorageUtil.getItem('users'))

  // Открытие и закрытие aside
  categoriesList.onclick = function () {
    document.getElementById('aside__groups-list').classList.add('active');
    renderCategory();
    categoryService();
  };

  addUserForm.onclick = function () {
    openAsideUsers()
  };

  asideCloseButton.forEach((button, index) => {
    button.onclick = function () {
      closeAside(index);
    };
  });
  
  

  
  // personPhone.addEventListener('input', (e) => {
  //   phone = e.target.value.replace(/\D/g, '').match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  //   e.target.value = '+7(' + phone[2] + ')' + phone[3] + (phone[4] ? '-' + phone[4] : '') + (phone[5] ? '-' + phone[5] : '');
  // });

  

  

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
});



// Доделать маску телефона, выпадашку категорий, редактирование пользователя, стили