function logout() {
  let loginSignUp = document.getElementById("buttons");
  let logout = document.getElementById("logout");
  logout.style.display = "none";
}

const url = `https://api.spoonacular.com/recipes/random?number=3&apiKey=25afc86f84f0419eb54b2141471c2802`;

function displayRecipe(data, index) {
  const recipeDiv = document.getElementById(`recommendation${index + 1}`);
  const recipe = data.recipes[index];
  recipeDiv.innerHTML = `
  <img src="${recipe.image}" alt="${recipe.title}">
  <h2>${recipe.title}</h2>
  <button class="view-recipe-btn" id="btn${index}">View Recipe</button>
  `;

  const btn = document.getElementById(`btn${index}`);
  btn.addEventListener("click", function () {
    // Store the clicked card ID in session storage
    sessionStorage.setItem("clickedCardId", recipe.id);
    // Store the ingredients in session storage
    sessionStorage.setItem(
      "clickedCardIngredients",
      JSON.stringify(recipe.extendedIngredients)
    );
    // Redirect to another page
    window.location.href = "recipeDescription.html";
  });
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.recipes.length; i++) {
      displayRecipe(data, i);
    }
  })
  .catch((error) => {
    console.error("Error fetching the data:", error);
  });

const searchInput = document.getElementById("search");

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const ingredients = searchInput.value; // Get the value from the search input
    const number = 200; // Number of recipes to return

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=6fe40584f31149478a0d3f9b35e52e8c`;

    // Assume the API endpoint for retrieving recipe data is apiUrl

    // Fetch the recipe data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((recipesData) => {
        // Store the recipes data in session storage
        sessionStorage.setItem("recipesData", JSON.stringify(recipesData));

        // Redirect to the new HTML page
        window.location.href = "recipes.html"; // Replace 'newPage.html' with the actual filename of the new HTML page
      })
      .catch((error) => {
        // Handle any fetch errors
        console.error("Fetch error:", error);
      });
  }
});

const triviaUrl = `https://api.spoonacular.com/food/trivia/random?apiKey=6fe40584f31149478a0d3f9b35e52e8c`;

// Function to display trivia data
function displayTrivia(data) {
  const triviaDiv = document.getElementById("foodFact");
  triviaDiv.innerHTML = `
                <p><i>"${data.text}"<i></p>
            `;
}

// Making the GET request for trivia
fetch(triviaUrl)
  .then((response) => response.json())
  .then((data) => {
    displayTrivia(data);
  })
  .catch((error) => {
    console.error("Error fetching the trivia data:", error);
  });
