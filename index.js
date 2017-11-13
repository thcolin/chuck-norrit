const choo = require('choo')
const html = require('choo/html')
const main = require('./templates/main')

const app = choo()

const SLEEPING = 'sleeping'
const FETCHING = 'fetching'

const store = function (state, emitter) {
  state.facts = []
  state.status = SLEEPING

  emitter.on('search', function (query) {
    console.log('[chuck-norrit]', 'query', query)
    state.status = FETCHING
    emitter.emit('render')

    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        console.log('[chuck-norrit]', 'json', json)
        state.facts = json.result
        state.status = SLEEPING
        emitter.emit('render')
      })
      .catch(function (error) {
        console.log('[chuck-norrit]', 'error', error)
        state.facts = []
        state.status = SLEEPING
        emitter.emit('render')
      })
  })
}

app.use(store)
app.route('/', main)

app.mount('#mount')
