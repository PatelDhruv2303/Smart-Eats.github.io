// Recipe data
const recipeData = [
  {
    id: 1,
    title: "Salmon Kale Salad",
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    prepTime: 25,
    calories: 230,
    ingredients: ["salmon", "kale", "lemon", "olive oil", "garlic"],
    dietTypes: ["pescatarian", "gluten-free", "dairy-free"]
  },
  {
    id: 2,
    title: "Quinoa Veggie Bowl",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    prepTime: 35,
    calories: 350,
    ingredients: ["quinoa", "avocado", "tomato", "corn", "red onion", "cilantro"],
    dietTypes: ["vegetarian", "vegan", "gluten-free", "dairy-free"]
  },
  {
    id: 3,
    title: "Teriyaki Tofu Bowl",
    image: "https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    prepTime: 30,
    calories: 280,
    ingredients: ["tofu", "rice", "broccoli", "carrot", "teriyaki sauce"],
    dietTypes: ["vegetarian", "vegan", "dairy-free"]
  },
  {
    id: 4,
    title: "Mediterranean Hummus Wrap",
    image: "https://images.pexels.com/photos/6941025/pexels-photo-6941025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    prepTime: 20,
    calories: 200,
    ingredients: ["hummus", "spinach", "tomato", "cucumber", "red pepper", "tortilla"],
    dietTypes: ["vegetarian", "vegan", "dairy-free"]
  }
];

const ingredientSuggestions = [
  { name: "Salmon", image: "https://images.pexels.com/photos/5837826/pexels-photo-5837826.jpeg?auto=compress&cs=tinysrgb&w=100" },
  { name: "Kale", image: "https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=100" },
  { name: "Quinoa", image: "https://images.pexels.com/photos/7412095/pexels-photo-7412095.jpeg?auto=compress&cs=tinysrgb&w=100" },
  { name: "Avocado", image: "https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=100" },
  { name: "Tofu", image: "https://images.pexels.com/photos/3599538/pexels-photo-3599538.jpeg?auto=compress&cs=tinysrgb&w=100" }
];

// DOM Elements
const recipesContainer = document.getElementById('recipes-container');
const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.getElementById('suggestion-chips');
const minSlider = document.getElementById('slider-min');
const maxSlider = document.getElementById('slider-max');
const sliderRange = document.querySelector('.slider-range');
const minValue = document.getElementById('min-value');
const maxValue = document.getElementById('max-value');

// Initialize the page
function init() {
  renderSuggestionChips();
  renderRecipes(recipeData);
  setupEventListeners();
}

// Render suggestion chips
function renderSuggestionChips() {
  suggestionsContainer.innerHTML = ingredientSuggestions.map(ingredient => `
    <div class="suggestion-chip" data-ingredient="${ingredient.name.toLowerCase()}">
      <img src="${ingredient.image}" alt="${ingredient.name}">
      <span>${ingredient.name}</span>
    </div>
  `).join('');
}

// Render recipe cards
function renderRecipes(recipes) {
  if (recipes.length === 0) {
    recipesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No recipes found matching your criteria.</p>';
    return;
  }

  recipesContainer.innerHTML = recipes.map(recipe => `
    <div class="recipe-card" data-id="${recipe.id}">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-info">
        <h3 class="recipe-title">${recipe.title}</h3>
        <div class="recipe-meta">
          <span class="recipe-time">${recipe.prepTime} min</span>
          <span class="recipe-calories">${recipe.calories} cal</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener('input', filterRecipes);

  // Diet radio buttons
  document.querySelectorAll('input[name="diet"]').forEach(radio => {
    radio.addEventListener('change', filterRecipes);
  });

  // Time slider
  minSlider.addEventListener('input', updateSlider);
  maxSlider.addEventListener('input', updateSlider);

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const ingredient = chip.dataset.ingredient;
      searchInput.value = ingredient;
      filterRecipes();
    });
  });
}

// Update slider
function updateSlider() {
  const minVal = parseInt(minSlider.value);
  const maxVal = parseInt(maxSlider.value);

  if (minVal > maxVal) {
    minSlider.value = maxVal;
  }

  const min = parseInt(minSlider.min);
  const max = parseInt(minSlider.max);
  const leftPercent = ((minVal - min) / (max - min)) * 100;
  const rightPercent = ((maxVal - min) / (max - min)) * 100;

  sliderRange.style.left = leftPercent + '%';
  sliderRange.style.width = (rightPercent - leftPercent) + '%';
  
  minValue.innerHTML = minVal + '<br>min';
  maxValue.innerHTML = maxVal + '<br>min';

  filterRecipes();
}

// Filter recipes based on all criteria
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedDiet = document.querySelector('input[name="diet"]:checked').value;
  const minTime = parseInt(minSlider.value);
  const maxTime = parseInt(maxSlider.value);

  const filteredRecipes = recipeData.filter(recipe => {
    // Diet filter
    if (selectedDiet !== 'all' && !recipe.dietTypes.includes(selectedDiet)) {
      return false;
    }

    // Time filter
    if (recipe.prepTime < minTime || recipe.prepTime > maxTime) {
      return false;
    }

    // Search filter
    if (searchTerm && !recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm)
    )) {
      return false;
    }

    return true;
  });

  renderRecipes(filteredRecipes);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);