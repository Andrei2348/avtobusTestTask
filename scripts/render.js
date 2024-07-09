/** @format */
import LocalStorageUtil from "./storage.js";
const categoriesList = document.getElementById("categories__list");
const categoriesListUser = document.getElementById("profileCategory");

// Рендеринг категорий
const renderCategory = (categories) => {
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
    document
      .querySelectorAll(".aside__category-delete")
      .forEach((eachElement, index) =>
        eachElement.addEventListener("click", function () {
          const idToRemove = Number(eachElement.getAttribute("data-id"));
          document.querySelector(`[data-parent-id="${idToRemove}"]`).remove();
          const filteredArray = categories.filter(
            (item) => item.id !== idToRemove
          );
          LocalStorageUtil.setItem("categories", filteredArray);
        })
      );
  }
};

const renderCategoryForUser = (categories) => {
  if (document.querySelectorAll(".aside__option")) {
    document.querySelectorAll(".aside__option").forEach((element) => {
      element.remove();
    });
  }
  categoriesListUser.insertAdjacentHTML(
    "beforeend",
    `<option class="aside__option" value="none" selected disabled hidden>Выберите группу</option>`
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


const renderAllUsers = (categories, users) => {
  if (document.querySelectorAll(".aside__option")) {
    document.querySelectorAll(".aside__option").forEach((element) => {
      element.remove();
    });
  }
}









export { renderCategory, renderCategoryForUser, renderAllUsers };
