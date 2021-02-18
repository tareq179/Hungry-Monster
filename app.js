//declare variable for search Button event 
const searchButton = document.getElementById("searchBtn");

// Event handler for click 
searchButton.addEventListener("click", () => {
    //get foodName  after click
    const foodItem = document.getElementById("foodName").value;
    //clear input after search
    document.getElementById("foodDetails").innerHTML = "";

    // verify for empty input
    if (foodItem === "") {
        //show a msg for empty input
        document.querySelector(".alert").style.display = "block";
        //items not found hide
        document.getElementById("nothingFoundMsg").style.display = "none";
        // clear search input
        document.getElementById("foodItem").innerHTML = "";
    } else {
        document.querySelector(".alert").style.display = "none"; // make alert none
        // fetch data for matching foods
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`)
            .then(res => res.json())
            .then(foods => allFoods(foods));
    }
});

const allFoods = foodsInfo => {
    let foodItems = foodsInfo.meals; //catch found food name
    let foodsDiv = document.getElementById("foodItem"); // declare div for single item
    foodsDiv.innerHTML = ""; //make div empty for put current item    

    // verify for no items found
    if (foodItems == null) {
        document.getElementById("nothingFoundMsg").style.display = "block";
        document.getElementById("foodItem").value = "";
        return;
    } else {
        //disable previous not found message
        document.getElementById("nothingFoundMsg").style.display = "none";

        // iterate every items
        foodItems.forEach(food => {
            const id = food.idMeal;
            const name = food.strMeal;
            const thumbnail = food.strMealThumb
            const foodItemDiv = document.createElement("div"); //create div
            foodItemDiv.className = "foodItem"; // add class name to div
            //add image and title to div and sent id to foodDetails function
            foodItemDiv.innerHTML = `
                    <a href="#" onclick="foodDetails('${id}')"><img src = "${thumbnail}"></a>
                    <h3 onclick="foodDetails('${id}')"><a href="#">${name}</a></h3>
                    `;
            // push item to div to parent div
            foodsDiv.appendChild(foodItemDiv);
            document.getElementById("foodItem").value = ""; // make search input clear
        });
    }
}

const foodDetails = foodId => {
    // fetch singe items using id
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(res => res.json())
        .then(food => {
            // catch data for image, title and ingredients
            const detailsDiv = document.getElementById("foodDetails");
            const foodInfo = food.meals[0];
            const foodName = foodInfo.strMeal;
            const detailsContainer = document.createElement("div"); // catch the details div
            // add item details to food details div
            detailsDiv.innerHTML = `<div>
                                    <img src="${foodInfo.strMealThumb}">
                                    <h3>${foodName}</h3>
                                    <h5>Ingredients:</h5>
                                    <ul>
                                        <li>
                                            <i class="fas fa-check-square"></i>
                                            ${foodInfo.strIngredient1}
                                        </li>
                                        <li>
                                            <i class="fas fa-check-square"></i>
                                            ${foodInfo.strIngredient2}
                                        </li>
                                        <li>
                                            <i class="fas fa-check-square"></i>
                                            ${foodInfo.strIngredient3}
                                        </li>
                                        <li>
                                            <i class="fas fa-check-square"></i>
                                            ${foodInfo.strIngredient4}
                                        </li>
                                        <li>
                                            <i class="fas fa-check-square"></i>
                                            ${foodInfo.strIngredient5}
                                        </li>
                                        <li>
                                            <i class="fas fa-check-square"></i>
                                            ${foodInfo.strIngredient6}
                                        </li>
                                    </ul>
                                </div>`;
        });
}