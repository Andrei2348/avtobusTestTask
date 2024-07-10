/** @format */
import LocalStorageUtil from "./storage.js";
const categoriesList = document.getElementById("categories__list");
const categoriesListUser = document.getElementById("profileCategory");
const accordion = document.querySelector(".accordion");
const personData = document.getElementById("profileData");
const personPhone = document.getElementById("profilePhone");
const personCategory = document.getElementById("profileCategory");
const savePerson = document.getElementById("save__person");
let createdUser = {};

// Рендеринг категорий
const renderCategory = (categories = []) => {
  if (categories.length === 0)
    categories = LocalStorageUtil.getItem("categories");
  if (document.querySelectorAll(".aside__category-inner")) {
    document.querySelectorAll(".aside__category-inner").forEach((element) => {
      element.remove();
    });
  }
  if (categories) {
    categories.forEach((category) => {
      categoriesList.insertAdjacentHTML(
        "beforeend",
        `<div class="aside__category-inner" data-parent-id='${category.id}'>
                  <input class="aside__category-name" value='${category.category}' readonly placeholder='Введите название'>
                  <svg
                    data-id='${category.id}'
                    class="aside__category-delete"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.1"
                      x="0.5"
                      y="0.5"
                      width="37"
                      height="37"
                      rx="5.5"
                      stroke="black"
                    />
                    <g clip-path="url(#clip0_1894_194)">
                      <path
                        opacity="0.3"
                        d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1894_194">
                        <rect
                          width="25.3333"
                          height="25.3333"
                          fill="white"
                          transform="translate(6.33331 6.33334)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>`
      );
    });
    document.querySelectorAll(".aside__category-delete").forEach(
      (eachElement) =>
        (eachElement.onclick = () => {
          deleteCategory(eachElement, categories);
        })
    );
  }
};

const renderCategoryForUser = () => {
  const categories = LocalStorageUtil.getItem("categories");
  if (document.querySelectorAll(".aside__option")) {
    document.querySelectorAll(".aside__option").forEach((element) => {
      element.remove();
    });
  }
  categoriesListUser.insertAdjacentHTML(
    "beforeend",
    `<option class="aside__option" value="undefined" selected disabled hidden>Выберите группу</option>`
  );
  if (categories) {
    categories.forEach((category) => {
      categoriesListUser.insertAdjacentHTML(
        "beforeend",
        `<option class="aside__option" value="${category.id}">${category.category}</option>`
      );
    });
  }
};

const renderAllUsers = () => {
  const users = LocalStorageUtil.getItem("users");
  const categories = LocalStorageUtil.getItem("categories");
  if(document.querySelector('.accordion-message')){
    document.querySelector('.accordion-message').remove();
  }
  if (document.querySelectorAll(".accordion-item")) {
    document.querySelectorAll(".accordion-item").forEach((element) => {
      element.remove();
    });
  }
  if (users.length > 0) {
    categories.forEach((category) => {
      accordion.insertAdjacentHTML(
        "beforeend",
        `<div class="accordion-item">
      <div class="accordion-header">${category.category}<button class="accordion__button"></button></div>
      <div class="accordion-content"></div></div>`
      );
    });
    const accordionContainer = document.querySelectorAll(".accordion-content");
    categories.forEach((category, index) => {
      const filteredUsers = filterUsersByCategory(users, category);
      filteredUsers.forEach((user) => {
        accordionContainer[index].insertAdjacentHTML(
          "beforeend",
          `<div class="accordion__info-content" data-user-id=${user.id}>
                <div class="accordion__content-wrapper">
                  <p>${user.fullName}<span>${user.phone}</span></p>
                    <svg
                    data-edit-id=${user.id}
                    class="accordion__edit-button"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.1"
                    x="0.5"
                    y="0.5"
                    width="37"
                    height="37"
                    rx="5.5"
                    stroke="black"
                  />
                  <g clip-path="url(#clip0_1894_95)">
                    <path
                      opacity="0.3"
                      d="M10 24.2501V28.0001H13.75L24.81 16.9401L21.06 13.1901L10 24.2501ZM27.71 14.0401C28.1 13.6501 28.1 13.0201 27.71 12.6301L25.37 10.2901C24.98 9.90006 24.35 9.90006 23.96 10.2901L22.13 12.1201L25.88 15.8701L27.71 14.0401Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1894_95">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(7 7)"
                      />
                    </clipPath>
                  </defs>
                    </svg>
                    <svg
                      data-delete-id=${user.id}
                      class="accordion__delete-button"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.1"
                        x="0.5"
                        y="0.5"
                        width="37"
                        height="37"
                        rx="5.5"
                        stroke="black"
                      />
                      <g clip-path="url(#clip0_1894_194)">
                        <path
                          opacity="0.3"
                          d="M12.6666 26.3889C12.6666 27.55 13.6166 28.5 14.7778 28.5H23.2222C24.3833 28.5 25.3333 27.55 25.3333 26.3889V13.7222H12.6666V26.3889ZM15.2633 18.8733L16.7516 17.385L19 19.6228L21.2378 17.385L22.7261 18.8733L20.4883 21.1111L22.7261 23.3489L21.2378 24.8372L19 22.5994L16.7622 24.8372L15.2739 23.3489L17.5116 21.1111L15.2633 18.8733ZM22.6944 10.5556L21.6389 9.5H16.3611L15.3055 10.5556H11.6111V12.6667H26.3889V10.5556H22.6944Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1894_194">
                          <rect
                            width="25.3333"
                            height="25.3333"
                            fill="white"
                            transform="translate(6.33331 6.33334)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
              </div>`
        );
      });

      checkCategories();
      document.querySelectorAll(".accordion__edit-button").forEach((button) => {
        button.onclick = () => {
          const selectedId = Number(button.getAttribute("data-edit-id"));
          const selectedUser = users.find((user) => user.id === selectedId);
          openAsideUsers(selectedUser);
        };
      });

      document
        .querySelectorAll(".accordion__delete-button")
        .forEach((button) => {
          button.onclick = () => {
            deleteUser(button.getAttribute("data-delete-id"), users);
          };
        });

      const headers = document.querySelectorAll(".accordion-header");
      headers.forEach((header) => {
        header.onclick = (event) => {
          if (event.target.classList.contains("accordion__button")) {
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
              content.style.maxHeight = null;
              header.classList.remove("active");
            } else {
              document
                .querySelectorAll(".accordion-content")
                .forEach((item) => {
                  item.style.maxHeight = null;
                });
              content.style.maxHeight = content.scrollHeight + "px";
              header.classList.add("active");
            }
          }
        };
      });
    });
  } else {
    accordion.insertAdjacentHTML(
      "beforeend",
      `<div class="accordion-message">Список контактов пуст</div>`
    );
  }
};

const checkCategories = () => {
  if (document.querySelectorAll(".accordion-content").length > 0) {
    document
      .querySelectorAll(".accordion-content")
      .forEach((element, index) => {
        if (!element.hasChildNodes()) {
          document.querySelectorAll(".accordion__button")[
            index
          ].disabled = true;
          document
            .querySelectorAll(".accordion__button")
            [index].classList.add("empty");
        } else {
          document.querySelectorAll(".accordion__button")[
            index
          ].disabled = false;
          document
            .querySelectorAll(".accordion__button")
            [index].classList.remove("empty");
        }
      });
  }
};

const deleteUser = (id, users) => {
  document.querySelector(`[data-user-id="${id}"]`).remove();
  const filteredArray = filterUsersById(users, id);
  LocalStorageUtil.setItem("users", filteredArray);
  renderAllUsers();
};

const deleteCategory = (element, categories) => {
  const idToRemove = Number(element.getAttribute("data-id"));
  document.querySelector(`[data-parent-id="${idToRemove}"]`).remove();
  const filteredArray = categories.filter((item) => item.id !== idToRemove);
  LocalStorageUtil.setItem("categories", filteredArray);
  sortUsersByDeletedCategory(idToRemove);
  renderCategory();
};

// Удаление пользователей по удаляемой категории
const sortUsersByDeletedCategory = (idToRemove) => {
  const users = LocalStorageUtil.getItem("users");
  const newUsers = users.filter((item) => Number(item.category) !== idToRemove);
  LocalStorageUtil.setItem("users", newUsers);
};

function filterUsersById(users, id) {
  return users.filter((item) => item.id !== Number(id));
}

function filterUsersByCategory(users, category) {
  return users.filter((item) => item.category == category.id);
}

const openAsideUsers = (user = {}) => {
  renderCategoryForUser();
  document.getElementById("aside__add-user").classList.add("active");
  cleanInputFormUser(user);
};

// Функция заполнения\очистки формы пользователя
function cleanInputFormUser(user) {
  if (JSON.stringify(user) === "{}") {
    console.log("empty");
    user = {
      fullName: "",
      phone: "",
      category: undefined,
    };
  } else {
    createdUser = user;
  }
  document.getElementById("profileData").value = user.fullName;
  document.getElementById("profilePhone").value = user.phone;
  document.getElementById("profileCategory").value = user.category;
  createUser(user);
}

function createUser(user) {
  // Контроль ввода данных для регистрации пользователя
  personPhone.addEventListener("input", function (e) {
    let phone = e.target.value.replace(/\D/g, "");
    createdUser.phone = phone;
    e.target.value = phone;
  });
  personData.addEventListener("input", () => {
    createdUser.fullName = personData.value;
  });
  personCategory.addEventListener("change", (event) => {
    createdUser.category = event.target.value;
  });

  savePerson.onclick = function () {
    const usersArray = LocalStorageUtil.getItem("users");
    if (
      createdUser.fullName &&
      createdUser.fullName.trim().split(/\s+/).length >= 3 &&
      createdUser.phone.length === 6 &&
      createdUser.category !== ""
    ) {
      if (!createdUser.hasOwnProperty("id")) {
        console.log("no id");
        let lastId = 0;
        if (usersArray.length > 0) {
          console.log("here");
          lastId = usersArray.at(-1).id + 1;
        }
        createdUser.id = lastId;
      }
    }
    // Проверяем, существует ли пользователь с данным id
    if (
      !usersArray.some((user) => Number(user.id) === Number(createdUser.id))
    ) {
      LocalStorageUtil.setItem("users", [...usersArray, createdUser]);
    } else {
      // Если объект с таким id уже существует:
      const index = usersArray.findIndex((item) => item.id === createdUser.id);
      const updatedArray = [...usersArray];
      updatedArray[index] = createdUser;
      LocalStorageUtil.setItem("users", updatedArray);
    }
    createdUser = {};
    closeAside(1);
  };
}

const closeAside = (index) => {
  document.querySelectorAll(".aside")[index].classList.remove("active");
  renderAllUsers();
};

export { renderCategory, renderAllUsers, openAsideUsers, closeAside };
