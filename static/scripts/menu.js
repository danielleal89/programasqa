//Seleciona o menu
var menuItem = document.querySelectorAll('.item-menu')

function selectLink(){
    menuItem.forEach((item)=>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuItem.forEach((item)=>
    item.addEventListener('click', selectLink)
)

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split('/').pop(); // Obtém o nome da página atual
  const menuItems = document.querySelectorAll(".item-menu");

  for (const menuItem of menuItems) {
    const link = menuItem.querySelector("a");
    const hrefValue = link.getAttribute("href");

    if (currentPage === "gerarduplas" && hrefValue === "manual") {
      menuItem.classList.add("ativo");
    }
    if (currentPage === "divisaoregressao" && hrefValue === "manual") {
      menuItem.classList.add("ativo");
    }

    if (hrefValue.endsWith(currentPage) || (currentPage === "" && hrefValue === "/")) {
      menuItem.classList.add("ativo"); // Adiciona a classe "ativo" ao item do menu correspondente
    }
  }
});
