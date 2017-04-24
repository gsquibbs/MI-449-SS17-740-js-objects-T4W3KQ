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

// -------------
// PAGE UPDATERS
// -------------

// Store jokes in localStorage as a string
var updateJokesObject = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

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
  if (requestedJokeKey in jokes) {
    jokeBox.innerHTML =
      '<p>' + jokes[requestedJokeKey]['setup'] + '</p>' +
      '<p>' + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.innerHTML = '<p>' + 'No matching joke found.' + '</p>'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  updateJokesObject()
}

// -------
// STARTUP
// -------

// Parse jokes in localStorage and store in jokes object
var rawJokes = window.localStorage.getItem('jokes')
if (rawJokes !== null) {
  jokes = JSON.parse(rawJokes)
}

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Add New Jokes

var jokeRemember = document.getElementById('joke-save')
var jokeAboutInput = document.getElementById('joke-about')
var jokeSetupInput = document.getElementById('joke-setup')
var jokePunchlineInput = document.getElementById('joke-punchline')
// Add joke to object
var addJoke = function () {
  var jokeInputKey = jokeAboutInput.value
  var jokeSetup = jokeSetupInput.value
  var jokePunchline = jokePunchlineInput.value
  jokes[jokeInputKey] = {
    'setup': jokeSetup,
    'punchline': jokePunchline
  }
  updatePage()
  // Clear input
  jokeAboutInput.value = ''
  jokeSetupInput.value = ''
  jokePunchlineInput.value = ''
  // console.log(jokes)
}
jokeRemember.addEventListener('click', addJoke)

// Remove Jokes
var jokeForget = document.getElementById('joke-forget')
var removeJoke = function () {
  var jokeToForgetInput = document.getElementById('joke-to-forget')
  var jokeToForgetKey = jokeToForgetInput.value
  if (jokeToForgetKey in jokes) {
    delete jokes[jokeToForgetKey]
    updatePage()
  }
  // Clear input
  jokeToForgetInput.value = ''
}
jokeForget.addEventListener('click', removeJoke)

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
