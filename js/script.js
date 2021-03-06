// Variables liées au DOM
const sectionRecipes = document.querySelector("#affichage-recette");
const dropDownAppareils = document.querySelector("#dropdown-appareils");
const dropDownUstensiles = document.querySelector("#dropdown-ustensils");
const dropDownIngredients = document.querySelector("#dropdown-ingredients");
const selectorContain = document.querySelector(".selector-contain");
const searchBar = document.getElementById("searchbar");
const tagSelector = document.querySelectorAll(".add-selector");
const inputIngredientSelect = document.querySelector("#ingredient-select");
const inputAppareilsSelect = document.querySelector("#appareils-select");
const inputUstensilesSelect = document.querySelector("#ustensiles-select");
const btnSelection = document.querySelectorAll(".btn-selection");
const dropDown = document.querySelectorAll(".dropdown");
const dropDownContents = document.querySelectorAll(".dropdown-content");

// Déclaration variables/Array en scope global
let arrayRecipes = [];
let tagList = [];
let arraySortTagRecipes = [];

let applianceArray = [];
let ustensilArray = [];
let ingredientArray = [];

let applianceArrayFiltered = [];
let ingredientArrayFiltered = [];
let ustensilArrayFiltered = [];

// Utils Function

function noRecipesMessage() {
  if (sectionRecipes.firstElementChild === null) {
    sectionRecipes.innerHTML = "";
    let message = document.createElement("p");
    message.innerHTML = "Aucune recette à afficher";
    sectionRecipes.appendChild(message);
  }
}

function elmNav(inputSelect, linkNavigation) {
  if (inputSelect.value.length > 0) {
    linkNavigation.forEach((elm) => {
      if (
        elm.innerText.toLowerCase().includes(inputSelect.value.toLowerCase())
      ) {
        elm.style.display = "block";
      } else {
        elm.style.display = "none";
      }
    });
  } else if (inputSelect.value.length === 0) {
    linkNavigation.forEach((elm) => {
      elm.style.display = "block";
    });
  }
}

////////////////////////////////////////////// AFFICHAGE TOUTES RECETTES ////////////////////////////////////////////////////

function allRecipes() {
  sectionRecipes.innerHTML = "";
  dropDownAppareils.innerHTML = "";
  dropDownIngredients.innerHTML = "";
  dropDownUstensiles.innerHTML = "";
  selectorContain.innerHTML = "";
  recipes.forEach((recipe) => {
    arrayRecipes.push(recipe);
    recipesCard(recipe);
  });
}

//////////////////////////////////////////// AFFICHAGE LIEN NAVIGATION/TRI ////////////////////////////////////////////////

function loadingNav() {
  arrayRecipes.forEach((recipe) => {
    {
      applianceArray.push(recipe.appliance.toLowerCase());
    }

    recipe.ustensils.forEach((ustensil) => {
      ustensilArray.push(ustensil.toLowerCase());
    });

    recipe.ingredients.forEach((ingredient) => {
      ingredientArray.push(ingredient.ingredient.toLowerCase());
    });
  });

  //Tri des arrays qui enlève les doublons
  applianceArrayFiltered = [...new Set(applianceArray)];
  ustensilArrayFiltered = [...new Set(ustensilArray)];
  ingredientArrayFiltered = [...new Set(ingredientArray)];
}

function navDOM() {
  // fonction qui affiche dans les liens de navigations les éléments des recettes présente dans arrayRecipes
  applianceArrayFiltered = applianceArrayFiltered.sort();
  ustensilArrayFiltered = ustensilArrayFiltered.sort();
  ingredientArrayFiltered = ingredientArrayFiltered.sort();

  applianceArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add("link-nav", "appareils");
    let string = elm[0].toUpperCase() + elm.slice(1);
    link.innerHTML = `${string}`;
    dropDownAppareils.append(link);
  });

  ustensilArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add("link-nav", "ustensiles");
    let string = elm[0].toUpperCase() + elm.slice(1);
    link.innerHTML = `${string}`;
    dropDownUstensiles.append(link);
  });

  ingredientArrayFiltered.forEach((elm) => {
    const link = document.createElement("a");
    link.classList.add("link-nav", "ingredients");
    let string = elm[0].toUpperCase() + elm.slice(1);
    link.innerHTML = `${string}`;
    dropDownIngredients.append(link);
  });

  // Affichage d'un tag lorsque l'on clique sur un des liens

  const allLinkNav = document.querySelectorAll("a.link-nav");
  const linkNavIngredient = document.querySelectorAll("a.link-nav.ingredients");
  const linkNavUstensiles = document.querySelectorAll("a.link-nav.ustensiles");
  const linkNavAppareils = document.querySelectorAll("a.link-nav.appareils");

  linkNavUstensiles.forEach((link) => {
    link.addEventListener("click", () => {
      // Manipulation DOM
      const tag = document.createElement("div");
      const divCross = document.createElement("div");
      const closeCross = document.createElement("i");
      tag.classList.add("add-selector");
      tag.classList.add("ustensiles");
      divCross.classList.add("close-selector");
      closeCross.classList.add("bi");
      closeCross.classList.add("bi-x-circle");
      tag.innerHTML = `${link.innerHTML}`;
      tag.appendChild(divCross);
      divCross.appendChild(closeCross);
      selectorContain.appendChild(tag);
      // Manipulation Array
      tagList.push(link.innerHTML.toLowerCase());
      ustensilArrayFiltered = ustensilArrayFiltered.filter(
        (tag) => tag != link.innerHTML.toLowerCase()
      );

      link.remove();
      closeTag(closeCross, tag);
    });
  });

  linkNavAppareils.forEach((link) => {
    link.addEventListener("click", () => {
      // Manipulation DOM
      const tag = document.createElement("div");
      const divCross = document.createElement("div");
      const closeCross = document.createElement("i");
      tag.classList.add("add-selector");
      tag.classList.add("appareils");
      divCross.classList.add("close-selector");
      closeCross.classList.add("bi");
      closeCross.classList.add("bi-x-circle");
      tag.innerHTML = `${link.innerHTML}`;
      tag.appendChild(divCross);
      divCross.appendChild(closeCross);
      selectorContain.appendChild(tag);
      // Manipulation Array
      tagList.push(link.innerHTML.toLowerCase());
      applianceArrayFiltered = applianceArrayFiltered.filter(
        (tag) => tag != link.innerHTML.toLowerCase()
      );

      link.remove();
      closeTag(closeCross, tag);
    });
  });

  linkNavIngredient.forEach((link) => {
    link.addEventListener("click", () => {
      // Manipulation DOM
      const tag = document.createElement("div");
      const divCross = document.createElement("div");
      const closeCross = document.createElement("i");
      tag.classList.add("add-selector");
      tag.classList.add("ingredient");
      divCross.classList.add("close-selector");
      closeCross.classList.add("bi");
      closeCross.classList.add("bi-x-circle");
      tag.innerHTML = `${link.innerHTML}`;
      tag.appendChild(divCross);
      divCross.appendChild(closeCross);
      selectorContain.appendChild(tag);
      // Manipulation Array
      tagList.push(link.innerHTML.toLowerCase());
      ingredientArrayFiltered = ingredientArrayFiltered.filter(
        (tag) => tag != link.innerHTML.toLowerCase()
      );

      link.remove();
      closeTag(closeCross, tag);
    });
  });

  allLinkNav.forEach((link) => {
    link.addEventListener("click", () => {
      let array = arrayRecipes;
      tagList.forEach((tag) => {
        array = sortTagRecipes(array, tag);
      });
      console.log(tagList);
    });
  });
}

//////////////////////////////////////// FONCTION CROIX FERMETURE TAG //////////////////////////////////////////////////

function closeTag(closeCross, tag) {
  closeCross.addEventListener("click", (link) => {
    const tagToClose = link.path[2].textContent.toLowerCase();
    const typeOfTag = link.path[2].className.toLowerCase();
    tagList = tagList.filter((tag) => tag != tagToClose);
    if (typeOfTag.includes("appareils")) {
      applianceArrayFiltered.push(tagToClose.toLowerCase());
    }
    if (typeOfTag.includes("ingredient")) {
      ingredientArrayFiltered.push(tagToClose.toLowerCase());
    }
    if (typeOfTag.includes("ustensiles")) {
      ustensilArrayFiltered.push(tagToClose.toLowerCase());
    }
    tag.remove();
    dropDownAppareils.innerHTML = "";
    dropDownIngredients.innerHTML = "";
    dropDownUstensiles.innerHTML = "";
    navDOM();
    if (tagList.length >= 1) {
      let array = arrayRecipes;
      tagList.forEach((tag) => {
        array = sortTagRecipes(array, tag);
      });
    } else if (tagList.length === 0) {
      sectionRecipes.innerHTML = "";
      arrayRecipes.forEach((recipe) => {
        recipesCard(recipe);
      });
    }
  });
}

////////////////////////////// INPUT GLOBAL/FONCTION TRI DES RECETTES EN FONCTION DE ENTEREDVALUE  ////////////////////////////////

function sortRecipes(enteredValue) {
  // Reinitialisation du DOM
  sectionRecipes.innerHTML = "";
  dropDownAppareils.innerHTML = "";
  dropDownIngredients.innerHTML = "";
  dropDownUstensiles.innerHTML = "";
  selectorContain.innerHTML = "";

  // Reinitialisation des arrays
  arrayRecipes = [];

  applianceArray = [];
  ustensilArray = [];
  ingredientArray = [];

  applianceArrayFiltered = [];
  ingredientArrayFiltered = [];
  ustensilArrayFiltered = [];

  tagList = [];

  /////////// --- Loop Version --- /////////////
  /*
  // FUNCTION INCLUDES WITH LOOP

  function isIncludes(pattern, text) {
    if (pattern.length == 0) return 0;

    let lsp = [0];
    for (let i = 1; i < pattern.length; i++) {
      let j = lsp[i - 1];
      while (j > 0 && pattern.charAt(i) != pattern.charAt(j)) j = lsp[j - 1];
      if (pattern.charAt(i) == pattern.charAt(j)) j++;
      lsp.push(j);
    }

    let j = 0;
    for (let i = 0; i < text.length; i++) {
      while (j > 0 && text.charAt(i) != pattern.charAt(j)) j = lsp[j - 1];
      if (text.charAt(i) == pattern.charAt(j)) {
        j++;
        if (j == pattern.length) return i - (j - 1);
      }
    }
    return -1;
  }

  for (let i = 0; i < tagSelector.length; i++) {
    tagSelector[i].remove();
  }

  // Variable qui filtre le mot entré dans la barre de recherche
  for (recipe of recipes) {
    if (
      isIncludes(enteredValue, recipe.name.toLowerCase()) != -1 ||
      isIncludes(enteredValue, recipe.description.toLowerCase()) != -1 ||
      recipe.ingredients.some(
        (i) => isIncludes(enteredValue, i.ingredient.toLowerCase()) != -1
      ) ||
      recipe.ustensils.some(
        (u) => isIncludes(enteredValue, u.toLowerCase()) != -1
      ) ||
      isIncludes(enteredValue, recipe.appliance.toLowerCase()) != -1
    ) {
      arrayRecipes.push(recipe);
      recipesCard(recipe);
      loadingNav(recipe);
    }
  }
*/
  ////////// --- forEach/filter Version --- ///////////////
  tagSelector.forEach((link) => {
    link.remove();
  });

  // Variable qui filtre le mot entré dans la barre de recherche
  recipes.filter((recipe) => {
    if (
      recipe.name.toLowerCase().includes(enteredValue) ||
      recipe.description.toLowerCase().includes(enteredValue) ||
      recipe.ingredients.some((i) =>
        i.ingredient.toLowerCase().includes(enteredValue)
      ) ||
      recipe.ustensils.some((u) => u.toLowerCase().includes(enteredValue)) ||
      recipe.appliance.toLowerCase().includes(enteredValue)
    ) {
      // Push + affichage des recettes contenant le mot entré dans la barre de recherche;

      arrayRecipes.push(recipe);
      recipesCard(recipe);
      loadingNav(recipe);
    }
  });

  noRecipesMessage();
  navDOM();
}

//////////////////////////////////////// FONCTION TRI DES RECETTES SELON TAG //////////////////////////////////////////

function sortTagRecipes(array, tag) {
  // Reinitialisation du DOM
  sectionRecipes.innerHTML = "";
  arraySortTagRecipes = [];

  if (tagList.length >= 1) {
    array.filter((recipe) => {
      if (
        recipe.name.toLowerCase().includes(tag) ||
        recipe.description.toLowerCase().includes(tag) ||
        recipe.ingredients.some((i) =>
          i.ingredient.toLowerCase().includes(tag)
        ) ||
        recipe.ustensils.some((u) => u.toLowerCase().includes(tag)) ||
        recipe.appliance.toLowerCase().includes(tag)
      ) {
        arraySortTagRecipes.push(recipe);
      }
    });
    arraySortTagRecipes = [...new Set(arraySortTagRecipes)];
    arraySortTagRecipes.forEach((recipe) => {
      recipesCard(recipe);
    });
  } else if (tagList.length === 0) {
    arrayRecipes.forEach((recipe) => {
      recipesCard(recipe);
    });
  }

  noRecipesMessage();
  return arraySortTagRecipes;
}

/////////////////////////////////////////////// LISTENER  ////////////////////////////////////////////////////////////

dropDown.forEach((btn) => {
  let child = btn.firstElementChild;
  let nextchild = child.nextElementSibling;

  child.addEventListener("focus", () => {
    dropDown.forEach((drop) => {
      drop.firstElementChild.classList.remove("style-focus-btn");
      drop.firstElementChild.nextElementSibling.classList.remove("style-focus");
      drop.firstElementChild.value =
        drop.firstElementChild.getAttribute("save-btn");
    });

    child.classList.add("style-focus-btn");
    child.nextElementSibling.classList.add("style-focus");
    nextchild.nextElementSibling.classList.add("rotation");
    child.value = "";
  });
});

document.body.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("dropdown-content") &&
    !e.target.classList.contains("dropdown") &&
    !e.target.classList.contains("btn-selection") &&
    !e.target.classList.contains("link-nav")
  ) {
    dropDown.forEach((content) => {
      let input = content.firstElementChild;
      let nextInput = input.nextElementSibling;
      input.classList.remove("style-focus-btn");
      input.nextElementSibling.classList.remove("style-focus");
      nextInput.nextElementSibling.classList.remove("rotation");
      input.value = input.getAttribute("save-btn");
    });
  }
});

// Listener Input Global
searchBar.addEventListener("keyup", () => {
  if (searchBar.value.length >= 3) {
    const enteredValue = searchBar.value.toLowerCase();
    sortRecipes(enteredValue);
  } else if (searchBar.value.length <= 2) {
    arrayRecipes = [];
    allRecipes();
    loadingNav();
    navDOM();
  }
});

// Listener Input Appareils
inputAppareilsSelect.addEventListener("keyup", () => {
  let inputSelect = inputAppareilsSelect;
  const linkNavigation = document.querySelectorAll("a.link-nav.appareils");
  elmNav(inputSelect, linkNavigation);
});

// Listener Input Ustensiles
inputUstensilesSelect.addEventListener("keyup", () => {
  let inputSelect = inputUstensilesSelect;
  const linkNavigation = document.querySelectorAll("a.link-nav.ustensiles");
  elmNav(inputSelect, linkNavigation);
});

// Listener Input Ingredient
inputIngredientSelect.addEventListener("keyup", () => {
  let inputSelect = inputIngredientSelect;
  const linkNavigation = document.querySelectorAll("a.link-nav.ingredients");
  elmNav(inputSelect, linkNavigation);
});

////////////////////////////////// START FUNCTION /////////////////////////////////////////////////

allRecipes();
loadingNav();
navDOM();
