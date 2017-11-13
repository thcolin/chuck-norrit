# Chuck-Norrit
🏋 🥊 Lightweight web-app to query [chucknorris.io](https://api.chucknorris.io/) and retrieve *awesome* facts about *the one and the only* **CHUCK NORRIS** !

## Technologies
* Frontend framework : [choo](https://github.com/choojs/choo)
  * Small and lightweight (`4kb`) frontend functional programming framework
  * Shipped with a default state manager
  * Knew it for a few months, but didn't have the opportunity to test it !
* Dev server : [budo](https://github.com/mattdesl/budo)
  * Easy to use and livereloading for rapid prototyping
  * I didn't have enough free time to implement `webpack` and a `build` script, sorry 😥

## Features
* Just search for a fact with the `form.input[type="search"]` !
* Facts fetching status (sleeping or fetching)

## Problematic
* Why use a state manager for such a small app ?
  * Needed for various features (like being aware of `fetching` status or previous `request` for example)
  * Simple concept helping you to define a consistent flow in your application
  * Help you to store all application data in one place accessible "everywhere"
  * Very good scalability 📈❤️

## Install & run
* Just run `[npm|yarn] install` and `[npm|yarn] run start`

## Tests
* Just run `[npm|yarn] test`
