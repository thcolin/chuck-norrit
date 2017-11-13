const html = require('choo/html')

module.exports = function (fact) {
  return html`
    <li>${fact.value}</li>
  `
}
