document.getElementById("search-btn").addEventListener("click", function () {
  var searchTerm = document.getElementById("search-box").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => displayResults(data.meals))
    .catch((error) => console.error("Error:", error));
});

function displayResults(meals) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Limpiar resultados anteriores

  // Verificar si se encontraron resultados
  if (!meals) {
    resultsContainer.innerHTML = `<p>No se encontraron resultados para su búsqueda.</p>`;
    return;
  }

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    mealDiv.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <p><strong>Origen:</strong> ${meal.strArea}</p>
            <p><strong>Categoría:</strong> ${meal.strCategory}</p>
            <img src="${meal.strMealThumb}" alt="Imagen de ${
      meal.strMeal
    }" width="250px">
            <p><a href="${meal.strYoutube}" target="_blank">Ver Video</a></p>
            <p><strong>Instrucciones:</strong> ${meal.strInstructions}</p>
            <h3>Ingredientes:</h3>
            <ul>
                ${getIngredients(meal).join("")}
            </ul>
        `;
    resultsContainer.appendChild(mealDiv);
  });
}

function getIngredients(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`
      );
    } else {
      // No hay más ingredientes
      break;
    }
  }
  return ingredients;
}
