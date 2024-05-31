# Pokédex

This project is a Single Page Application (SPA) built with using CSS, HTML, and JavaScript. I made a Pokemon Pokedex app with the ability to make a mock team and search Pokemon from the [Pokeman API](https://pokeapi.co/)

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Overview](#overview)

## Installation

To get started with setting up my project, install a json-server on your local machine by running this command

```sh
npm install
```
```sh
npm install -g json-server
```
## Setup

There should be an empty db files ready to go, you just have to link it to the JSON server by running

```sh
json-server --watch db.json
```

## Overview

On page load, the Pokedex will load a random pokemon.

Features include: 
- Searching Pokemon by ID/Pokedex Entry (They are one in the same)
- Load Pokemon sprite into Pokedex
- See details of the pokemon under the Pokedex
- Clicking the sprite/image of the Pokemon will make the Pokemon Noise from the games
- You can add Pokemon to a team, up to 6 with no duplicates. The app should not allow more than 6 or any duplicate Pokemon.
- You can drag and drop the pokemon in the Team Section to re-arrange the order if you would like. This order should persist when refreshing the page. It will update the DB with the new order.
- You are able to remove Pokemon from the Team to add new ones.

 
