/*function Cocktail(name, id, ingredients) {
    this.name = name;
    this.id = id;
    this.ingredients = ingredients;
}*/

//exercise 02
/*etch all the cocktails which have a name beginning with “G”.
Check the API documentation on how to do this.*/

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g')
    .then(
        function (response) {
            console.log("exercise 02")
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                console.log(data);
                displayCocktails(data.drinks);
                extravagantCocktails(data.drinks);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

//exercise 03
//Log the names of all the cocktails found as well as the total number.
function displayCocktails(data) {
    console.log("exercise 03")
    console.log("Total:" + data.length)
    for (let i = 0; i < data.length; i++) {
        console.log("name:" + data[i].strDrink)
    }

}

//exercise 04
/*Cocktails should be extravagant, right? Let’s just keep the cocktails that
have more than 4 ingredients. Log the name for each of the results.*/

function extravagantCocktails(data) {
    console.log("exercise 04")
    let counter = 0;
    let filter = /^strIngredient[0-9]*$/gm;
    var numOfIngredients = 0;
    let extravanganCocktails = [];

    while (counter <= data.length) {
        obj = data[counter];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && filter.test(key)) {
                if (obj[key] !== null) {
                    numOfIngredients++;
                }
            }
        }
        if (numOfIngredients >= 4) {
            extravanganCocktails.push(obj);
            numOfIngredients = 0;
        }

        counter++;

    }

    console.log("Cocktails with more than 4 ingredients: ")
    for (let i = 0; i < extravanganCocktails.length; i++) {
        console.log(extravanganCocktails[i].strDrink)
    }
    parseTheResult(extravanganCocktails)
}

//exercise 05
/*The results are not very easy to read, can you help us to parse the list so it’s
a bit easier to read. For each cocktail, we only need the id, name, and an
array of the ingredients. Log the results.*/


function parseTheResult(data) {
    console.log("exercise 05")
    let counter = 0;
    let filter = /^strIngredient[0-9]*$/gm;
    let newFortmatCocktail = [];
    let ingredient = [];

    while (counter <= data.length) {
        obj = data[counter];
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && filter.test(key)) {
                if (obj[key] !== null) {
                    ingredient.push(obj[key])
                }
            }
        }
        if (obj !== undefined) {
            newFortmatCocktail.push({name: obj["strDrink"], id: obj["idDrink"], ingredients: ingredient})
        }
        counter++;

    }
    console.log(newFortmatCocktail)
}

/*Ooops, we forgot about the ingredient quantities. Update the parsed list
but instead of just saving the ingredients in the array, save the ingredient
as an object with its name and quantity. Log the results**/
/*

/*{ name: “Cocktail B”, id: 47328, ingredients: [{ name: “vodka”, quantity: “1 oz” },
...] },
{ name: “Cocktail D”, id: 12398, ingredients: [{ name: “gin”, quantity: “1/2 oz”}],
...] }
 */