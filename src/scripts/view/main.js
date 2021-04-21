function main() {
    
    const baseUrl = "https://www.themealdb.com/api/json/v1/1";

    const getFood = (food) => {
        fetch(`${baseUrl}/search.php?s=${food}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if(responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    console.log(responseJson.meals)
                    renderAllFoods(responseJson.meals);
                    
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
    };

    const getRandomFood = () => {
        fetch(`${baseUrl}/random.php`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if(responseJson.error) {
                    showResponseMessage(responseJson.message);
                } else {
                    console.log(responseJson.meals)
                    renderAllFoods(responseJson.meals);
                    
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
    };

    const renderAllFoods = (foods) => {
        const listFoodElement = document.querySelector("#listBook");
        listFoodElement.innerHTML = "";

        foods.forEach(food => {
            const ingredients = [];

            for (let i = 1; i <= 20; i++) {
                if (food[`strIngredient${i}`]) {
                    ingredients.push(
                        `${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`
                    );
                } else {
                    break;
                }
            }

            listFoodElement.innerHTML += `
                <style>
                .card-body{
                    min-height: auto;
                }
                </style>
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <img src=${food.strMealThumb} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5><b>${food.strMeal}</b> - ${food.strArea}</h5>
                            <p>${food.strInstructions}</p>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal${food.idMeal}">
                                Discover recipes
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal${food.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title" id="exampleModalLabel"><b>${food.strMeal}</b> - ${food.strArea}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="instructions">
                                            <h5>Instructions:</h5>
                                            <p>${food.strInstructions}</p>
                                        </div>
                                        <div className="ingredients">
                                            <h5>Ingredients:</h5>
                                            <ul>
                                                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    const showResponseMessage = (message = "Periksa koneksi internet Anda") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputSearch = document.querySelector("#inputSearch");
        const buttonSearch = document.querySelector("#searchButton");
        const buttonRandom = document.querySelector("#randomButton");

        buttonSearch.addEventListener("click", function () {
            const search = inputSearch.value;
            getFood(search);
        });

        buttonRandom.addEventListener("click", function () {
            getRandomFood();
        });
        getFood('');
    });
}

export default main;
