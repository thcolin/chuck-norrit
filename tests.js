var EventEmitter = require('events').EventEmitter
var spok = require('spok')
var tape = require('tape')

global.fetch = function (request) {
  return Promise.resolve({
    json: () => {
      switch (request) {
        case 'https://api.chucknorris.io/jokes/search?query=this-should-throw-empty-error':
          return { result: null, total: 0 }
        default:
          return {
            result: [
              {
                category: null,
                icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                id: "PsdLjHSHTUORvMzUNsha0g",
                url: "http://api.chucknorris.io/jokes/PsdLjHSHTUORvMzUNsha0g",
                value: "I KILLED CHUCK NORRIS! lol just kidding, Chuck Norris killed me."
              },
              {
                category: null,
                icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
                id: "9UTt7wYqQwmXwmx-k69MCw",
                url: "http://api.chucknorris.io/jokes/9UTt7wYqQwmXwmx-k69MCw",
                value: "Chuck Norris once fought with his roundhouse kick and defeated it. LOL!"
              }
            ],
            total: 2
          }
      }
    }
  })
}

var store = require('./store')

tape('should initialize empty state', function (t) {
  var emitter = new EventEmitter()
  var state = {}
  store(state, emitter)
  spok(t, state, {
    request: '',
    facts: spok.arrayElements(0),
    status: null,
    error: null
  })
  t.end()
})

tape('search:success', function (t) {
  var emitter = new EventEmitter()
  var state = {}
  store(state, emitter)

  emitter.emit('search', 'test')
  spok(t, state, {
    request: 'test',
    facts: spok.arrayElements(0),
    status: 'fetching',
    error: null
  })

  emitter.on('render', function () {
    spok(t, state, {
      request: 'test',
      facts: [
        {
          category: null,
          icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id: "PsdLjHSHTUORvMzUNsha0g",
          url: "http://api.chucknorris.io/jokes/PsdLjHSHTUORvMzUNsha0g",
          value: "I KILLED CHUCK NORRIS! lol just kidding, Chuck Norris killed me."
        },
        {
          category: null,
          icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          id: "9UTt7wYqQwmXwmx-k69MCw",
          url: "http://api.chucknorris.io/jokes/9UTt7wYqQwmXwmx-k69MCw",
          value: "Chuck Norris once fought with his roundhouse kick and defeated it. LOL!"
        }
      ],
      status: 'done',
      error: null
    })
  })

  t.end()
})

tape('search:error', function (t) {
  var emitter = new EventEmitter()
  var state = {}
  store(state, emitter)

  emitter.emit('search', 'this-should-throw-empty-error')
  spok(t, state, {
    request: 'this-should-throw-empty-error',
    facts: spok.arrayElements(0),
    status: 'fetching',
    error: null
  })

  emitter.on('render', function () {
    spok(t, state, {
      request: 'this-should-throw-empty-error',
      facts: spok.arrayElements(0),
      status: 'done',
      error: 'Empty result'
    })
  })

  t.end()
})
