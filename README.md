# Chuck-Norrit
🏋 🥊 Lightweight web-app to query [chucknorris.io](https://api.chucknorris.io/) and retrieve *awesome* facts about *the one and the only* **CHUCK NORRIS** !

## Technologies
* Frontend framework : [choo](https://github.com/choojs/choo)
  * Small and lightweight (`4kb`) frontend functional programming framework
  * Shipped with a default state manager
* Dev server : [budo](https://github.com/mattdesl/budo)
  * Easy to use and livereloading for rapid prototyping
  * I didn't have enough free time to implement `webpack` and a `build` script, sorry 😥

## Features
* Just search for a fact with the `form.input[type="search"]` !
* Facts fetching status (sleeping or fetching)

## Problematic
* Why use a state manager for such a small app ?

## Install & run
* Just run `[npm|yarn] install` and `[npm|yarn] run start`

## Tests
* Just run `[npm|yarn] test`

## Warning
* [x] `fetch` need to be polyfilled with [github/fetch](https://github.com/github/fetch)
  * see [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) and ` -t babelify`
* [ ] Add `tests`
* [x] Add a `button[type="submit"]` in `form`
* [x] Improve design with `emojis` and stuff !
