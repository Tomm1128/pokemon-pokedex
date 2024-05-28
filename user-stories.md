# Pokédex User Stories

## Feature 1: Search Pokemon
* User Story: As a user, I want to search for pokemon by Pokédex number so I can check its moves and types.
* Details: Implement a search bar that allows a user to input a pokedex entry number/id. On submission, the app will fetch the pokemon from the API and displays there name. This can be achieved with a event listener on the search

## Feature 2: Display Pokemon Sprite
* User Story: As a user, when I search for a pokemon, I want to see the sprite/image of the pokemon so I can be sure I am looking at the correct pokemon.
* Details: When the pokemon loads after entering a valid search, the pokemon sprite will be displayed with the name.

## Feature 3: Display Pokemon Types, Health Points (HP), Height, and Weight
* User Story: As a user, when I search for a pokemon, I want to see the pokemon's type(s) HP, height, and weight.
* Details: When the pokemon sprite is clicked, it expands to show the pokemon's type(s), HP, height, and weight. This can be achieved using an add event listener on the sprite image.

## Feature 4: Save a Favorite Pokemon
* User Story: As a user, I want to be able to favorite a pokemon to easily save them to vie w them later
* Details: Add a save button to the screen. When clicked, the pokemon will be saved and their info stored in the db.json using json-server. This can also be achieved using an event listener on the save button.

## (Stretch Goal) Feature 5: Save a Favorite Pokemon
* User Story: As a user, I want to be able to favorite 6 pokemon and create a mock pokemon team.
* Details: Using the save button made above, when clicked, the pokemon will be saved and their info stored in the db.json using json-server. Add an order column to db with favorite Pokemon, order 1 to 6. Add a team button to load the team and display to user.
