// Meal Plan functionality
function viewRecipe(recipeId) {
  // In a real application, this would navigate to the specific recipe
  console.log(`Viewing recipe: ${recipeId}`);
  window.location.href = 'recipe-detail.html';
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize habit tracking checkboxes
  const habitCheckboxes = document.querySelectorAll('.habit-checkbox');
  
  habitCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const habitName = this.nextElementSibling.textContent;
      console.log(`${habitName} habit ${this.checked ? 'checked' : 'unchecked'}`);
      
      // In a real application, this would update the user's habits in the database
      if (this.checked) {
        // Show a subtle notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${habitName} tracked for today!`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    });
  });
  
  // Make gallery items interactive
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      // In a real application, this would open a lightbox or detailed view
      console.log('Opening meal visual in lightbox');
    });
  });
});