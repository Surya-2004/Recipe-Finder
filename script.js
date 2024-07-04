function logout(){
    let loginSignUp = document.getElementById("buttons");
    let logout = document.getElementById("logout");  
    logout.style.display = "none";
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const ingredients = searchInput.value; // Get the value from the search input
    const number = 10; // Number of recipes to return

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=25afc86f84f0419eb54b2141471c2802`;

    // Assume the API endpoint for retrieving recipe data is apiUrl

// Fetch the recipe data from the API
fetch(apiUrl)
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(recipesData => {
  // Store the recipes data in session storage
  sessionStorage.setItem('recipesData', JSON.stringify(recipesData));

  // Redirect to the new HTML page
  window.location.href = 'recipes.html'; // Replace 'newPage.html' with the actual filename of the new HTML page
})
.catch(error => {
  // Handle any fetch errors
  console.error('Fetch error:', error);
});
  }
});
