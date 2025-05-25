// Onboarding functionality
function selectPreference(element, type) {
  // Toggle selection state
  element.classList.toggle('selected');
  
  // In a real application, this would store the user's preferences
  console.log(`${type} preference ${element.classList.contains('selected') ? 'selected' : 'unselected'}`);
}