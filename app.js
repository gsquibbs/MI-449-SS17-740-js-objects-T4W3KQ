// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

var setJokes = function () {
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
}

var getJokes = function () {
  var jokeCollection = window.localStorage.getItem('jokes')
  if (jokeCollection != null) {
    jokes = JSON.parse(jokeCollection)
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var jokeLines = jokes[requestedJokeKey]
  if (jokeLines === undefined) {
    jokeBox.textContent = noJokesMessage
  } else {
    var setup = '<p>' + jokeLines['setup'] + '</p>'
    var punchline = '<p>' + jokeLines['punchline'] + '</p>'
    jokeBox.innerHTML = setup + punchline
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  getJokes()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

var deleteButton = document.getElementById('deleteButton')
deleteButton.addEventListener('click', function () {
  var deleteJoke = document.getElementById('deleteJokeContent').value
  delete jokes[deleteJoke]
  setJokes()
  window.alert('The joke was deleted from the collection')
})

var addButton = document.getElementById('addButton')
addButton.addEventListener('click', function () {
  var addJoke = document.getElementById('addJokeContent').value
  var newSetup = document.getElementById('newSetup').value
  var newPunchline = document.getElementById('newPunchline').value
  jokes[addJoke] = {setup: newSetup, punchline: newPunchline}
  setJokes()
  window.alert('Your joke was added to the collection')
})
