/** @format */

const categoriesList = document.getElementById("groups__list");
const addUserForm = document.getElementById("add__user");
const asideCloseButton = document.querySelectorAll(".aside__close-button");
const savePerson = document.getElementById("save__person");
const personPhone = document.getElementById("profilePhone");

categoriesList.onclick = function () {
  document.getElementById("aside__groups-list").classList.add("active");
};

addUserForm.onclick = function () {
  document.getElementById("aside__add-user").classList.add("active");
};

asideCloseButton.forEach((button, index) => {
  button.onclick = function () {
    document.querySelectorAll(".aside")[index].classList.remove("active");
  };
});




personPhone.addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = '+7(' + x[2] + ')' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    console.log(x)
  });

function getInputData() {
  const personData = document.getElementById("profileData").value;
  
  const select = document.getElementById("profileCategory");
  const selectedCategory = select.options[select.selectedIndex].value;
  console.log(personData)
  

  
  console.log(selectedCategory)
}

savePerson.onclick = function() {
    getInputData();

}
