// local storage
document.addEventListener("DOMContentLoaded", () => {
    const savedProducts = localStorage.getItem("lastProducts");

    if (savedProducts) {
        const products = JSON.parse(savedProducts);
        display(products);
    }
});
// side bar
const menuBtn = document.querySelector("#header-menu-btn");
const sidebarCloseBtn = document.querySelector("#sidebar-close-btn");
const sidebar = document.querySelector("#sidebar");
const sidebarLinks = document.querySelectorAll(".nav-link");
const MealsRecipes = document.querySelector("#MealsRecipes");
const ProductScanner = document.querySelector("#ProductScanner");
const FoodLog = document.querySelector("#FoodLog");
// display card
const recipesGrid = document.querySelector("#recipes-grid");
const mealDetailSection = document.querySelector("#meal-details");
// search browse
let inputsearch = ``;
const productSearchInput = document.querySelector("#product-search-input");
const searchProductBtn = document.querySelector("#search-product-btn");
const BrowseCategory = document.querySelectorAll(".product-category-btn");
// show all mael
const BrowseRecipes = document.querySelector("#BrowseRecipes");
// search input
const searchInput = document.querySelector("#search-input");
const allSections = document.querySelectorAll("section");
const recipesCount = document.querySelector("#recipes-count");
// color side bar
const sideBarColor = document.querySelectorAll(".nav-link");
// API
const categoryCards = document.querySelectorAll(".category-card");

// nave text
MealsRecipes.addEventListener('click',()=>{
  const n1 = 'Meals & Recipes';
  const n2 = 'Discover delicious and nutritious recipes tailored for you';
  changeText(n1,n2);
})
ProductScanner.addEventListener('click',()=>{
  const n1 = 'Product Scanner';
  const n2 = 'Search packaged foods by name or barcode'
  changeText(n1,n2);
})
FoodLog.addEventListener('click',()=>{
  const n1 = 'Food Log';
  const n2 = 'Track your daily nutrition and food intake'
  changeText(n1,n2);
})
function changeText(hedar,prag){
    document.querySelector('#h1Chane').innerHTML = hedar;
    document.querySelector('#pChane').innerHTML = prag;
}
menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

sidebarCloseBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
});

sideBarColor.forEach(link => {
  link.addEventListener("click", () => {
    sideBarColor.forEach(l => {
      l.classList.remove("bg-emerald-50", "text-emerald-700");
      l.classList.add("text-gray-600", "hover:bg-gray-50");
    });
    link.classList.add("bg-emerald-50", "text-emerald-700");
    link.classList.remove("text-gray-600", "hover:bg-gray-50");
  });
});

// btn col-4
document.querySelector("#list-view-btn").addEventListener('click',()=>{
  recipesGrid.classList.replace('grid-cols-4','grid-cols-2')
})
document.querySelector("#grid-view-btn").addEventListener('click',()=>{
  recipesGrid.classList.replace('grid-cols-2','grid-cols-4')
})

function hideAllSections() {
  allSections.forEach((section) => {
    section.style.display = "none";
  });
}hideAllSections();

function showMealsPage() {
    hideAllSections();

    document.querySelector("#search-filters-section").style.display = "block";
    document.querySelector("#meal-categories-section").style.display = "block";
    document.querySelector("#all-recipes-section").style.display = "block";
}showMealsPage();

document.querySelector("#scan").addEventListener('click',()=>{
  showMealsPage();
})

MealsRecipes.addEventListener("click", () => {
    showMealsPage();
});

ProductScanner.addEventListener("click", () => {
    hideAllSections();
    document.getElementById("products-section").style.display = "block";
});

FoodLog.addEventListener("click", () => {
    hideAllSections();
    document.getElementById("foodlog-section").style.display = "block";
});

categoryCards.forEach(card => {
card.addEventListener("click", () => {
    const categoryName = card.dataset.category;
    getMealsByCategory(categoryName);
    // console.log(categoryName);
});
});

async function getMealsByCategory(categoryName) {
    const res = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/search?q=${categoryName}`
    );
    const {results} = await res.json();

    localStorage.setItem("lastProducts", JSON.stringify(results));

    display(results);
}

searchInput.addEventListener('change', function(e){
const data = e.target.value;

// First letter is uppercase
let result = "";
for (let i = 0; i < data.length; i++) {
  if (i === 0) {
    result += data[i].toUpperCase();
  } else {
    result += data[i].toLowerCase();
  }
}
  getMealsByCategory(result);
})

// display 
function display(list){
    let cartona = ``;
    for(let i = 0; i < list.length; i++){
        cartona +=`
                        <div
            class=" recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${list[i].id}"
            >
            <div class="relative h-48 overflow-hidden">
                <img
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="${list[i].thumbnail}"
                    alt="Teriyaki Chicken Casserole"
                    loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                    <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                    >
                    ${list[i].name}
                    </span>
                    <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                    >
                    ${list[i].area}
                    </span>
                </div>
                </div>
                <div class="p-4">
                <h3
                    class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                    Teriyaki Chicken Casserole
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                    ${list[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                    <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${list[i].category}
                    </span>
                    <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${list[i].area}
                    </span>
                </div>
                </div>
            </div>
        `
    }
    recipesCount.innerHTML =  `Showing ${list.length} recipes`
    document.querySelector("#recipes-grid").innerHTML = cartona;
}

async function displayMealDetailsById(mealId){
  console.log(mealId);
  
    const res = await fetch(`https://nutriplan-api.vercel.app/api/meals/${mealId}`);
    const meal = await res.json();

console.log(meal);
console.log(meal.result.category);

    let cartona = `
          <div class="max-w-7xl mx-auto">
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${meal.result.thumbnail}"
                alt="Teriyaki Chicken Casserole"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.result.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.result.area}</span
                  >
                  <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >Casserole</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  Teriyaki Chicken Casserole
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="${meal.result.id}"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div class="lg:col-span-2 space-y-8">
            
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >9 items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">3/4 cup</span> soy
                      sauce
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">1/2 cup</span>
                      water
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">1/4 cup</span>
                      brown sugar
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"
                        >1/2 teaspoon</span
                      >
                      ground ginger
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"
                        >1/2 teaspoon</span
                      >
                      minced garlic
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"
                        >4 Tablespoons</span
                      >
                      cornstarch
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">2</span> chicken
                      breasts
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">1 bag</span>
                      stir-fry vegetables
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">3 cups</span>
                      brown rice
                    </span>
                  </div>
                </div>
              </div>

              
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      1
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      Preheat oven to 350° F. Spray a 9x13-inch baking pan with
                      non-stick spray.
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      2
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      Combine soy sauce, ½ cup water, brown sugar, ginger and
                      garlic in a small saucepan and cover. Bring to a boil over
                      medium heat. Remove lid and cook for one minute once
                      boiling.
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      3
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      Meanwhile, stir together the cornstarch and 2 tablespoons
                      of water in a separate dish until smooth. Once sauce is
                      boiling, add mixture to the saucepan and stir to combine.
                      Cook until the sauce starts to thicken then remove from
                      heat.
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      4
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      Place the chicken breasts in the prepared pan. Pour one
                      cup of the sauce over top of chicken. Place chicken in
                      oven and bake 35 minutes or until cooked through. Remove
                      from oven and shred chicken in the pan using two forks.
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      5
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      *Meanwhile, steam the vegetables according to package
                      directions and stir together with the cooked brown rice.
                      Add the remaining sauce to the mixture and stir to
                      combine. Serve the chicken over the rice and veggie
                      mixture.
                    </p>
                  </div>
                </div>
              </div>

              
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="youtub"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

          
            <div class="space-y-6">
           
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">485</p>
                    <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">42g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: 84%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">52g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: 17%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">8g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: 12%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">4g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: 14%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">12g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: 24%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Vitamins & Minerals (% Daily Value)
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin A</span>
                        <span class="font-medium">15%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin C</span>
                        <span class="font-medium">25%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Calcium</span>
                        <span class="font-medium">4%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Iron</span>
                        <span class="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  

<div id="logMealModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 hidden">
  <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
    <div class="flex items-center gap-4 mb-6">
        <img src="${meal.result.thumbnail}" alt="Chicken Handi" class="w-16 h-16 rounded-xl object-cover">
        <div>
            <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
            <p class="text-gray-500 text-sm" id="modal-meal-name">${meal.result.category}</p>
        </div>
    </div>
    
    <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
        <div class="flex items-center gap-3">
            <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                -
            </button>
            <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
            <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                +
            </button>
        </div>
    </div>
    
    <div class="bg-emerald-50 rounded-xl p-4 mb-6">
        <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
        <div class="grid grid-cols-4 gap-2 text-center">
            <div>
                <p class="text-lg font-bold text-emerald-600" id="modal-calories">2152</p>
                <p class="text-xs text-gray-500">Calories</p>
            </div>
            <div>
                <p class="text-lg font-bold text-blue-600" id="modal-protein">111g</p>
                <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div>
                <p class="text-lg font-bold text-amber-600" id="modal-carbs">201g</p>
                <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div>
                <p class="text-lg font-bold text-purple-600" id="modal-fat">132g</p>
                <p class="text-xs text-gray-500">Fat</p>
            </div>
        </div>
    </div>
    
    <div class="flex gap-3">
        <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Cancel
        </button>
        <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
            Log Meal
        </button>
    </div>
  </div>
</div>
    `;

todayNutritionDisplay(meal);

document.querySelector("#meal-details").innerHTML = cartona;

document.querySelector("#back-to-meals-btn").addEventListener('click', () => {
  showMealsPage();
});

//Show div 
const logMealBtn = document.querySelector("#log-meal-btn");
const logMealModal = document.querySelector("#logMealModal");
// add
const confirmLogMeal = document.querySelector("#confirm-log-meal");
//close
const cancelLogMeal = document.querySelector("#cancel-log-meal");
logMealBtn.addEventListener('click', ()=>{
  console.log('ali');
  logMealModal.classList.toggle('hidden');

  changeText('Recipe Details','View full recipe information and nutrition facts');
})
confirmLogMeal.addEventListener('click',()=>{
  Swal.fire({
  title: "Meal Logged!",
  icon: "success",
  draggable: true
});
 logMealModal.classList.toggle('hidden');
 foodLogDisplay();
 todayNutritionDisplay(meal);
})
cancelLogMeal.addEventListener('click',()=>{
  logMealModal.classList.toggle('hidden');
})

let mealServings = document.querySelector("#meal-servings");
let increase = document.querySelector("#increase-servings");
let decrease = document.querySelector("#decrease-servings");

increase.addEventListener('click',()=>{
let current = parseFloat(mealServings.value);
  mealServings.value = current + 0.5;
})
decrease.addEventListener('click',()=>{
let current = parseFloat(mealServings.value);
  mealServings.value = current - 0.5;
})

}

recipesGrid.addEventListener("click",  function(e){
  const card = e.target.closest(".recipe-card");

  if(card){
    console.log('ali');
    hideAllSections();
    mealDetailSection.style.display = 'block';
    
    const mealId = card.dataset.mealId; 
    console.log(mealId);
    
    displayMealDetailsById(mealId);     
  }
});

BrowseCategory.forEach(card => {
card.addEventListener("click", () => {
    const BCategory = card.dataset.category;
    BrowsebyCategory(BCategory);
    console.log(BCategory);
});
});

async function BrowsebyCategory(BCategory) {
    const res = await fetch(
        `https://nutriplan-api.vercel.app/api/products/search?q=${BCategory}`
    );
    const {results} = await res.json();

    displayBrowse(results);
}

productSearchInput.addEventListener('change',function(e){
    inputsearch = e.target.value;
    return inputsearch;
})
searchProductBtn.addEventListener('click',function(){
    BrowsebyCategory(inputsearch)
})
function displayBrowse(list){
    let cartona = ``;
    for(let i = 0; i < list.length; i++){
        cartona +=`
        <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="7613034626844"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${list[i].image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${list[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${list[i].novaGroup ? list[i].novaGroup : '0' }
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${list[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${list[i].name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${list[i].nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${list[i].nutrients.protein}</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${list[i].nutrients.carbs}</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${list[i].nutrients.fat}</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${list[i].nutrients.sugar}</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
    `
    }


    document.querySelector("#products-grid").innerHTML = cartona;
}

BrowseRecipes.addEventListener('click',()=>{
  showMealsPage();
})

function foodLogDisplay(){

  let cartona = `
  <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg" alt="Chicken Handi" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">Chicken Handi</p>
                                <p class="text-sm text-gray-500">
                                    1 serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">Recipe</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">12:04 AM</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">2152</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">111g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">201g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">132g F</span>
                            </div>
                            <button id="delBtn" class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="0">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
  `
    document.querySelector("#logFodData").innerHTML = cartona;
    document.querySelector("#delBtn").addEventListener('click',()=>{
      document.querySelector("#logFodData").classList.add('d-none');
    })
}

let i = 0;
function todayNutritionDisplay(list){
  i+=1;
  let cartona = `
  <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="${list.result.thumbnail}" alt="Chicken Handi" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${list.result.category}</p>
                                <p class="text-sm text-gray-500">
                                    ${i} serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">Recipe</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">14:04 AM</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">4872</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">431g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">521g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">332g F</span>
                            </div>
                            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="0">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
  `
  document.querySelector("#todayNutrition").innerHTML = cartona;
}
