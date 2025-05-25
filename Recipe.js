// Recipe functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize ingredient checkboxes
  const ingredientCheckboxes = document.querySelectorAll('.ingredients-list input[type="checkbox"]');
  
  ingredientCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const ingredientName = this.nextElementSibling.textContent;
      console.log(`${ingredientName} ${this.checked ? 'checked' : 'unchecked'}`);
      
      // Count checked ingredients and show progress
      const totalIngredients = ingredientCheckboxes.length;
      const checkedIngredients = document.querySelectorAll('.ingredients-list input[type="checkbox"]:checked').length;
      
      if (checkedIngredients > 0) {
        // In a real application, this would show a progress indicator
        console.log(`Recipe progress: ${checkedIngredients}/${totalIngredients}`);
      }
    });
  });
  
  // Add event listeners to action buttons
  const addToMealPlanBtn = document.querySelector('.add-to-plan');
  if (addToMealPlanBtn) {
    addToMealPlanBtn.addEventListener('click', function() {
      // In a real application, this would add the recipe to the meal plan
      console.log('Adding recipe to meal plan');
      alert('Recipe added to your meal plan!');
    });
  }
  
  const addToGroceryBtn = document.querySelector('.add-to-grocery');
  if (addToGroceryBtn) {
    addToGroceryBtn.addEventListener('click', function() {
      // In a real application, this would add ingredients to the grocery list
      console.log('Adding ingredients to grocery list');
      alert('Ingredients added to your grocery list!');
    });
  }
  
  // Handle recipe save and share buttons
  const saveRecipeBtn = document.querySelector('.save-recipe');
  if (saveRecipeBtn) {
    saveRecipeBtn.addEventListener('click', function() {
      // Toggle saved state
      this.classList.toggle('saved');
      console.log(`Recipe ${this.classList.contains('saved') ? 'saved' : 'unsaved'}`);
      
      if (this.classList.contains('saved')) {
        alert('Recipe saved to your favorites!');
      }
    });
  }
  
  const shareRecipeBtn = document.querySelector('.share-recipe');
  if (shareRecipeBtn) {
    shareRecipeBtn.addEventListener('click', function() {
      // In a real application, this would open sharing options
      console.log('Opening share options');
      
      // Simulate share functionality
      if (navigator.share) {
        navigator.share({
          title: document.querySelector('.recipe-info h1').textContent,
          text: 'Check out this delicious recipe!',
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        alert('Share this recipe: ' + window.location.href);
      }
    });
  }
});