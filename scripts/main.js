/** @format */

import LocalStorageUtil from './storage.js';
import { renderCategory, renderAllUsers } from './render.js';
import { closeAside, openAsideUsers, categoryService, closeCategories } from './services.js';

document.addEventListener('DOMContentLoaded', function () {
  const categoriesList = document.getElementById('groups__list');
  const addUserForm = document.getElementById('add__user');
  const asideCloseButton = document.querySelectorAll('.aside__close-button');

  // Проверяем существование записей в localStorage и, если
  // записей нет, создаем
  LocalStorageUtil.hasItem('categories');
  LocalStorageUtil.hasItem('users');
  renderAllUsers();
  console.log(LocalStorageUtil.getItem('users'));

  // Открытие и закрытие aside
  categoriesList.onclick = function () {
    document.getElementById('aside__groups-list').classList.add('active');
    renderCategory();
    categoryService();
    closeCategories();
  };

  addUserForm.onclick = function () {
    openAsideUsers();
    closeCategories();
  };

  asideCloseButton.forEach((button, index) => {
    button.onclick = function () {
      closeAside(index);
    };
  });
});
