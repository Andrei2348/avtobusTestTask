const categoriesList = document.getElementById('categories__list');
const htmlContent = `
        <div class="aside__category-inner aside__category-input">
              <input type="text" class="aside__category-name--input" placeholder="Введите название">
              <svg
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
            </div>
      `;

// Рендеринг поля ввода названия новой категории
const addCategory = () => {
  categoriesList.insertAdjacentHTML('beforeend', htmlContent);
};

// Рендеринг категорий
const renderCategory = (categories) => {
  if (document.querySelectorAll('.aside__category-inner')) {
    document.querySelectorAll('.aside__category-inner').forEach((element) => {
      element.remove();
    });
  }
  if (categories) {
    categories.forEach((category) => {
      categoriesList.insertAdjacentHTML(
        'beforeend',
        `<div class="aside__category-inner">
                  <p class="aside__category-name">${category.category}</p>
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
  }
};
export { addCategory, renderCategory };
