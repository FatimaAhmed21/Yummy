let container = document.querySelector(".container .row");
let inputsContainer = document.querySelector(".inpsRow");

//--- Function To limit Text Length ---//
function getWordStr(str) {
  return str.split(/\s+/).slice(0, 20).join(" ");
}

//--- open sideNav ---//
function openNav() {
  $(".side-nav").animate({ left: "0px" }, 500);
  $(".open-icon").css("display", "none");
  $(".close-icon").css("display", "block");
}

//--- close sideNav ---//
function closeNav() {
  $(".side-nav").animate({ left: "-250px" }, 500);
  $(".open-icon").css("display", "block");
  $(".close-icon").css("display", "none");
}

//--show some meals when window load--//
async function getRandomMeals(name) {
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  let allMeals = response.meals;
  displayMeals(allMeals);
}
getRandomMeals(" ");

//--- display search inputs ---//
function showSearchInps() {
  closeNav();
  container.innerHTML = "";
  inputsContainer.style.display = "block";
  inputsContainer.innerHTML = `<div class="row d-flex flex-md-nowrap gap-md-3">
        <input type="text" class="form-control w-50 border-2 bg-transparent text-white" placeholder="search by name" onkeyup="searchByName(this.value)">
        <input type="text" class="form-control w-50 border-2 bg-transparent text-white" placeholder="search by first letter" maxlength="1" onkeyup="searchByFirstLetter(this.value)">
      </div>`;
}

//--- search by name ---//
async function searchByName(mealName) {
  container.innerHTML = " ";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  response = await response.json();
  let filterdMeals = [];
  for (let i = 0; i < response.meals.length; i++) {
    if (
      response.meals[i].strMeal.toLowerCase().includes(mealName.toLowerCase())
    ) {
      filterdMeals.push(response.meals[i]);
    }
  }
  displayMeals(filterdMeals);
}

//--- search by first letter ---//
async function searchByFirstLetter(char) {
  container.innerHTML = " ";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`
  );
  response = await response.json();
  let meals = response.meals;
  displayMeals(meals);
}

//--- show categories ---//
async function showCategories() {
  closeNav();
  inputsContainer.style.display = "none";
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  let categories = response.categories;
  let cartona = "";
  for (let i = 0; i < categories.length; i++) {
    let category = `<div class="col-md-3 my-4">
          <div class="position-relative rounded-3 overflow-hidden category" onclick="searchByCategory('${
            categories[i].strCategory
          }')">
            <img src=${categories[i].strCategoryThumb} class="w-100">
          <div class="overlay text-center p-3">
            <h2>${categories[i].strCategory}</h2>
            <p>${getWordStr(categories[i].strCategoryDescription)}</p>
          </div>
          </div>
        </div>`;
    cartona += category;
  }
  container.innerHTML = cartona;
}

//--- search by category ---//
async function searchByCategory(category) {
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  let meals = response.meals;
  displayMeals(meals);
}

//--- show areas ---//
async function showAreas() {
  closeNav();
  inputsContainer.style.display = "none";
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  let areas = response.meals;
  let cartona = "";
  for (let i = 0; i < areas.length; i++) {
    let area = `<div class="col-md-3 my-5 text-center text-white"  onclick="searchByArea('${areas[i].strArea}')">
      <i class="fa-solid fa-house-laptop fa-4x mb-3"></i>
      <h2>${areas[i].strArea}</h2>
    </div>`;
    cartona += area;
  }
  container.innerHTML = cartona;
}

//--- search by area ---//
async function searchByArea(area) {
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  let meals = response.meals;
  displayMeals(meals);
}

//--- show ingredients ---//
async function showIngredients() {
  closeNav();
  inputsContainer.style.display = "none";
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  let ingredients = response.meals;
  let cartona = "";
  for (let i = 0; i < 20; i++) {
    let ingredient = `<div class="col-md-3 my-5 text-center text-white" onclick="searchByIngredient('${
      ingredients[i].strIngredient
    }')">
        <i class="fa-solid fa-drumstick-bite fa-4x mb-3"></i>
        <h2>${ingredients[i].strIngredient}</h2>
        <p>${getWordStr(ingredients[i].strDescription)}</p>
      </div>`;
    cartona += ingredient;
  }
  container.innerHTML = cartona;
}

//--- search by ingredients ---//
async function searchByIngredient(ingredient) {
  container.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();
  let meals = response.meals;
  displayMeals(meals);
}

//--- display array of meals ---/
function displayMeals(arr) {
  closeNav();
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    let meal = `<div class="col-md-3 my-3">
          <div class="position-relative rounded-3 overflow-hidden meal">
            <img src=${arr[i].strMealThumb} class="w-100">
          <div class="overlay d-flex align-items-center ps-3" onclick="getMealDetails('${arr[i].idMeal}')">
            <h2>${arr[i].strMeal}</h2>
          </div>
          </div>
        </div>`;
    cartona += meal;
  }
  container.innerHTML = cartona;
}

//--- get the meal details using Id --- //
async function getMealDetails(mealId) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  let details = response.meals[0];
  showMealDetails(details);
}

//--- display the meal's details ---//
function showMealDetails(details) {
  closeNav();
  container.innerHTML = "";
  let tagsSpans = "";
  // convert the meal tag from [string] to [array] & styling the array items then put it in [tags container] => [tagsSpans]
  if (details.strTags != null && details.strTags != "") {
    let tags = details.strTags.split(",");
    for (let i = 0; i < tags.length; i++) {
      tagsSpans += `<span class="alert alert-danger p-1 me-2" role="alert">${tags[i]}</span>`;
    }
  }

  let ingredients = "";
  // check if strIngredient has a value or not & concat it with its measure then put it in its container => [ingredients]
  for (let i = 1; i < 20; i++) {
    if (details[`strIngredient${i}`]) {
      console.log(details[`strIngredient${i}`]);
      ingredients += `<span class="alert alert-info p-1 m-0" role="alert">${
        details[`strMeasure${i}`]
      } ${details[`strIngredient${i}`]}</span>`;
    }
  }

  // display all the data about the meal
  let cartona = `<div class="meal-details row text-white">
          <div class="col-md-4 py-4">
            <img src="${details.strMealThumb}" class="w-100 rounded-3" alt="">
            <h2>${details.strMeal}</h2>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${details.strInstructions}</p>
            <h3>Area : ${details.strArea}</h3>
            <h3>Category : ${details.strCategory}</h3>
            <h3>Recipes :</h3>
            <div class="ingredients my-3 d-flex flex-wrap gap-3">
              ${ingredients}
            </div>
            <h2 class="mb-3 tags">Tags:</h2>
            ${tagsSpans}
            <div class="src mt-4">
              <button class="btn btn-success"><a href="${details.strSource}">Source</a></button>
              <button class="btn btn-danger"><a href="${details.strYoutube}">Youtube</a></button>
            </div>
          </div>
        </div>`;
  container.innerHTML = cartona;
}
