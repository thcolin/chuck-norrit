const html = require('choo/html')
const fact = require('./fact')

module.exports = function (state, emit) {
  return html`
    <div id="main" class=${state.status}>
      <h1>🏋 🥊 CHUCK-NORRIT !</h1>
      <form onsubmit=${search}>
        <input type="search" value=${state.request} />
        <button type="submit">🔍</button>
      </form>
      <p>${state.error ? '😥 Sorry, an error was thrown : ' + state.error : ''}</p>
      <ul>
        ${state.facts.map(fact)}
      </ul>
    </div>
  `

  function search (e) {
    e.preventDefault()
    const request = e.target.querySelector('input[type=search]').value.trim()

    if (request.length > 0 && state.request !== request) {
      emit('search', request)
    }
  }
}
