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

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// buttons
var addButton = document.getElementById('addButton')
var deleteButton = document.getElementById('deleteButton')

// -------------
// PAGE UPDATERS
// -------------
/*
var updateCollection = function () {
  var jokeString = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', jokeString)
  updatePage()
}

var getCollection = function () {
  var jokeString = window.localStorage.getItem('jokes')
  if (jokeString != null) {
    jokes = JSON.parse(jokeString)
  }
*/

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
  if (jokeLines in jokes) {
    var setup = '<p>' + jokeLines['setup'] + '</p>'
    var punchline = '<p>' + jokeLines['punchline'] + '</p>'
    jokeBox.innerHTML = setup + punchline
  } else {
    jokeBox.textContent = noJokesMessage
  }
}
// add new joke to the collection
var newJoke = function () {
  var newJokeDetails = document.getElementById('newJokeDetails')
  var newJokeValue = newJokeDetails.value
  var newSetup = document.getElementById('newSetup')
  var newSetupValue = newSetup.value
  var newPunchline = document.getElementById('newPunchline')
  var newPunchlineValue = newPunchline.value
  jokes[newJokeValue] = {
    setup: newSetupValue,
    punchline: newPunchlineValue
  }
  updateCollection()
  window.alert('This joke has been added to the collection')
}

// delete jokes that we don't like
var badJoke = function () {
  var deletedJokeContent = document.getElementById('deletedJokeContent')
  var jokeInfoValue = deletedJokeContent.value
  var jokeInfo = jokes[jokeInfoValue]
  if (jokeInfo === undefined) {
    window.alert('That joke cannot be found')
    updateCollection()
  } else {
    delete jokes[jokeInfoValue]
    window.alert('That joke is gone now')
    updateCollection()
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  updateCollection()
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
deleteButton.addEventListener('click', badJoke)
addButton.addEventListener('click', newJoke)
