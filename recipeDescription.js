document.addEventListener('DOMContentLoaded', function() {
  const clickedCardId = sessionStorage.getItem('clickedCardId');
  const storedRecipeId = sessionStorage.getItem('storedRecipeId');

  if (clickedCardId !== storedRecipeId) {
    // If the clicked card ID doesn't match the stored recipe ID, fetch the recipe data
    fetchRecipeData(clickedCardId);
  } else {
    // If the IDs match, use the stored recipe data directly
    const storedRecipeData = sessionStorage.getItem('storedRecipeData');
    if (storedRecipeData) {
      displayRecipeData(JSON.parse(storedRecipeData));
    } else {
      fetchRecipeData(clickedCardId);
    }
  }
});

function fetchRecipeData(recipeId) {
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=25afc86f84f0419eb54b2141471c2802`)
    .then(response => response.json())
    .then(data => {
      // Store the fetched recipe data and ID in session storage
      sessionStorage.setItem('storedRecipeData', JSON.stringify(data));
      sessionStorage.setItem('storedRecipeId', recipeId);
      // Display the recipe information
      displayRecipeData(data);
    })
    .catch(error => {
      console.error('Error fetching recipe information:', error);
    });
}

function displayRecipeData(data) {
  // Display the recipe information in the HTML
  const recipeTitleElement = document.getElementById('recipeTitle');
  const recipeImageElement = document.getElementById('recipeImage');
  const recipeIngredientsElement = document.getElementById('recipeIngredients');
  const recipeInstructionsElement = document.getElementById('recipeInstructions');

  recipeTitleElement.textContent = data.title;
  recipeImageElement.src = data.image;
  
  // Display the recipe ingredients as a list
  const ingredientsList = document.createElement('ul');
  data.extendedIngredients.forEach(ingredient => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient.original;
    ingredientsList.appendChild(ingredientItem);
  });
  recipeIngredientsElement.appendChild(ingredientsList);

  // Display the recipe instructions as an ordered list
  const instructionsList = document.createElement('ol');
  if (data.instructions) {
    // Split the instructions by "."
    const instructionsArray = data.instructions.split('.').filter(instruction => instruction.trim() !== '');
    instructionsArray.forEach(instruction => {
      const instructionItem = document.createElement('li');
      instructionItem.textContent = instruction.trim();
      instructionsList.appendChild(instructionItem);
    });
  } else {
    const noInstructionsItem = document.createElement('li');
    noInstructionsItem.textContent = 'Instructions not available';
    instructionsList.appendChild(noInstructionsItem);
  }
  recipeInstructionsElement.appendChild(instructionsList);
}
