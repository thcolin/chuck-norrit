const STATE_FETCHING = 'fetching'
const STATE_DONE = 'done'

module.exports = function (state, emitter) {
  state.request = ''
  state.facts = []
  state.status = null
  state.error = null

  emitter.on('search', function (request) {
    state.request = request
    state.status = STATE_FETCHING
    emitter.emit('render')

    fetch(`https://api.chucknorris.io/jokes/search?query=${request}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        if (json.result === null) {
          throw new Error('Empty result')
        }

        state.facts = json.result
        state.status = STATE_DONE
        state.error = null
        emitter.emit('render')
      })
      .catch(function (error) {
        state.facts = []
        state.status = STATE_DONE
        state.error = error.message
        emitter.emit('render')
      })
  })
}
