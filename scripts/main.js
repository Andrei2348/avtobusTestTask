import LocalStorageUtil from './storage.js';
import { addCategory, renderCategory } from './render.js';

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



// Открытие и закрытие aside
categoriesList.onclick = function () {
  document.getElementById('aside__groups-list').classList.add('active');
  console.log(LocalStorageUtil.getItem('categories'));
  renderCategory(LocalStorageUtil.getItem('categories'));

  // Удаление выбранной категории
  if (document.querySelectorAll('.aside__category-delete')) {
    document.querySelectorAll('.aside__category-delete').forEach((element, index) => {
      
      element.onclick = () => {
        const allCategories = LocalStorageUtil.getItem('categories');
        const idToRemove = Number(element.getAttribute('data-id'))
        const filteredArray = allCategories.filter(item => item.id !== idToRemove);
        LocalStorageUtil.setItem('categories', filteredArray);
        renderCategory(LocalStorageUtil.getItem('categories'));
      };
    });
  }
};

addUserForm.onclick = function () {
  document.getElementById('aside__add-user').classList.add('active');
  personData.value = '';
  personPhone.value = '';
  // Добавить сброс селекта
};

asideCloseButton.forEach((button, index) => {
  button.onclick = function () {
    document.querySelectorAll('.aside')[index].classList.remove('active');
  };
});
// ================================

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
    const user = {
      fullName: fullName,
      phone: phone,
      category: selectedCategory,
    };
    console.log(user);
    let usersArray = LocalStorageUtil.getItem('users');
    LocalStorageUtil.setItem('users', [...usersArray, user]);
  }
};


// ==========================================================


// Добавление новой категории (отображение в списке)
addCategoryButton.onclick = function () {
  addCategory();
  addCategoryButton.disabled = true;

// Получение новой категории из input
  document.querySelector('.aside__category-name--input').addEventListener('input', function (e) {
    categoryName = e.target.value;
    console.log(categoryName);
    categoryName ? (saveCategoryButton.disabled = false) : (saveCategoryButton.disabled = true);
  });
}

// Сохранение новой категории
saveCategoryButton.onclick = function () {
  let category = {};
  let lastId = 0;
  let categoriesArray = LocalStorageUtil.getItem('categories');
  if(categoriesArray.length > 0){
    lastId = categoriesArray.at(-1).id
  }
  category = {
    id: (lastId + 1),
    category: categoryName,
  };
  addCategoryButton.disabled = false;
  saveCategoryButton.disabled = true
  LocalStorageUtil.setItem('categories', [...categoriesArray, category]);
  renderCategory(LocalStorageUtil.getItem('categories'));
};

