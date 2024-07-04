document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the clicked card ID from session storage
    const clickedCardId = sessionStorage.getItem('clickedCardId');
  
    // Fetch recipe information using the Spoonacular API
    fetch(`https://api.spoonacular.com/recipes/${clickedCardId}/information?apiKey=6fe40584f31149478a0d3f9b35e52e8c`)
      .then(response => response.json())
      .then(data => {
        // Display the recipe information in the HTML
        const recipeTitleElement = document.getElementById('recipeTitle');
        const recipeImageElement = document.getElementById('recipeImage');
        const recipeIngredientsElement = document.getElementById('recipeIngredients');
        const recipeInstructionsElement = document.getElementById('recipeInstructions');
  
        recipeTitleElement.textContent = data.title;
        recipeImageElement.src = data.image;
        recipeIngredientsElement.textContent = data.extendedIngredients.map(ingredient => ingredient.original).join(', ');
        recipeInstructionsElement.textContent = data.instructions || 'Instructions not available';
      })
      .catch(error => {
        console.error('Error fetching recipe information:', error);
      });
  });
  