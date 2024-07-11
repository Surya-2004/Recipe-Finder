document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the recipes data from session storage
    const recipesData = JSON.parse(sessionStorage.getItem('recipesData'));
    // Function to create a card for each recipe
    function createRecipeCard(recipe) {
      const card = document.createElement('div');
      card.classList.add('recipe-card');
      card.id = `${recipe.id}`;
  
      // Recipe Image
      const image = document.createElement('img');
      image.src = recipe.image;
      image.alt = recipe.title;
      card.appendChild(image);
  
      // Recipe Title
      const title = document.createElement('h2');
      title.textContent = recipe.title;
      card.appendChild(title);
      const btn = document.createElement('button');
      btn.textContent = 'View Recipe';
      btn.classList.add('view-recipe-btn');
      card.appendChild(btn);

      btn.addEventListener('click', function() {
        // Store the clicked card ID in session storage
        sessionStorage.setItem('clickedCardId', card.id);
        // Store the ingredients in session storage
        sessionStorage.setItem('clickedCardIngredients', JSON.stringify(recipe.ingredients));
        // Redirect to another page
        window.location.href = 'recipeDescription.html'; // Replace 'anotherPage.html' with the actual filename of the other HTML page
      });
  
      document.getElementById('recipeCardsContainer').appendChild(card); // Append the card to the container
    }
  
    // Create a card for each recipe
    recipesData.forEach(recipe => {
      createRecipeCard(recipe);
    });

    if(recipesData.length == 0){
      const emptyMsg = document.createElement('p');
      emptyMsg.classList.add('empty-msg');
      emptyMsg.textContent = "No recipes found";
      document.getElementById('recipeCardsContainer').appendChild(emptyMsg);
    }
  });

  