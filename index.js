const choo = require('choo')
const html = require('choo/html')
const main = require('./templates/main')

const app = choo()

const STATE_FETCHING = 'fetching'
const STATE_DONE = 'done'

const store = function (state, emitter) {
  state.request = ''
  state.facts = []
  state.status = null
  state.error = null

  emitter.on('search', function (request) {
    console.log('[chuck-norrit]', 'request', request)
    state.request = request
    state.status = STATE_FETCHING
    emitter.emit('render')

    fetch(`https://api.chucknorris.io/jokes/search?query=${request}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        console.log('[chuck-norrit]', 'json', json)

        if (json.result === null) {
          throw new Error('Empty result')
        }

        state.facts = json.result
        state.status = STATE_DONE
        state.error = null
        emitter.emit('render')
      })
      .catch(function (error) {
        console.log('[chuck-norrit]', 'error', error)
        state.facts = []
        state.status = STATE_DONE
        state.error = error.message
        emitter.emit('render')
      })
  })
}

app.use(store)
app.route('/', main)

app.mount('#mount')
