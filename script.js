const fetchAllFoodCategory = (() => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => foodCategoryUi(data.categories));
})();

const foodCategoryUi = foods => {
  let html = "";

  foods.forEach(
    food =>
      (html += `
      <div class="col-md-4">
    <div class="card mt-4 food">
    <img src=${food.strCategoryThumb} class="card-img-top" alt=${food.strCategory}>
    <div class="card-body">
      <h5 class="card-title text-center">${food.strCategory}</h5>
    </div>
  </div>
  </div>
    `)
  );
  document.getElementById("main-row").innerHTML = html;

  const foodsClass = document.getElementsByClassName("food");
  [...foodsClass].forEach(food =>
    food.addEventListener("click", e => {
      const foodName = food.lastElementChild.innerText;
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => foodIngredientUi(data.meals[0]));
    })
  );
};


const foodIngredientUi = (meal) => {
  let html = ''
  html += `
  <div class="card w-75 mt-5 m-auto">
  <img src=${meal.strMealThumb} class="card-img-top py-5 w-50 m-auto" alt=${meal.strCategory}>
  <div class="card-body">
    <h5 class="card-title">${meal.strCategory}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${meal.strIngredient1}</li>
    <li class="list-group-item">${meal.strIngredient2}</li>
    <li class="list-group-item">${meal.strIngredient3}</li>
    <li class="list-group-item">${meal.strIngredient4}</li>
    <li class="list-group-item">${meal.strIngredient5}</li>
    <li class="list-group-item">${meal.strIngredient6}</li>
    <li class="list-group-item">${meal.strIngredient7}</li>
  </ul>
</div>
  `
  document.getElementById('ingredient-row').innerHTML = html
}

document.getElementById('search-btn').addEventListener('click', (e) => {
  const inputValue = document.getElementById('form1').value
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
  .then(res => res.json())
  .then(data => searchFoodUi(data.meals[0]))
})

const searchFoodUi = (food) => {
  let html = ''
  html += `
  <div class="col-md-4">
    <div class="card mt-4 food">
    <img src=${food.strMealThumb} class="card-img-top" alt=${food.strCategory}>
    <div class="card-body">
      <h5 class="card-title text-center">${food.strCategory}</h5>
    </div>
  </div>
  </div>
  `
  document.getElementById("main-row").innerHTML = html;
}