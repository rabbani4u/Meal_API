const loadMeals = search => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
};

const displayMeals = meals => {
  const mealsContainer = document.getElementById("meal-container");
  mealsContainer.innerHTML = "";
  meals.forEach(meal => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">
                  <span>${meal.strInstructions.slice(0, 200)}</span>
                </p>
              </div>
            </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

const searchFood = () => {
  const searchText = document.getElementById("search-field");
  const search = searchText.value;
  if (search.length > 0) {
    loadMeals(search);
  } else {
    alert("Please enter a search term");
  }
  searchText.value = "";
};

const loadMealDetails = idmeal => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]));
};

const displayMealDetails = meal => {
  const mealDetails = document.getElementById("detail-container");
  mealDetails.innerHTML = "";
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("card");
  mealDiv.innerHTML = `
  <div class="card mb-3" style="width: 100%; border: none;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${
        meal.strMealThumb
      }" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
          <span>${meal.strInstructions.slice(0, 200)}</span>
        </p>
        
      </div>
    </div>
  </div>
</div>
    `;
  mealDetails.appendChild(mealDiv);
};

loadMeals("");
