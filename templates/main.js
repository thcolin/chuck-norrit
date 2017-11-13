const html = require('choo/html')
const fact = require('./fact')

module.exports = function (state, emit) {
  return html`
    <div id="main" class=${state.status}>
      <h1>Chuck-Norrit ! :facepunch:</h1>
      <p>${state.status}</p>
      <form onsubmit=${search}>
        <input type="search" />
      </form>
      <ul>
        ${state.facts.map(fact)}
      </ul>
    </div>
  `

  function search (e) {
    e.preventDefault()
    const query = e.target.children[0].value
    emit('search', query)
  }
}
