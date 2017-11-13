const choo = require('choo')
const html = require('choo/html')
const store = require('./store')
const main = require('./templates/main')

require('whatwg-fetch')

const app = choo()

app.use(store)
app.route('/', main)

app.mount('#mount')
