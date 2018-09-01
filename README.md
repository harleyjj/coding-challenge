# REACH Hangman

This app implements the classic game "Hangman" using React.js.  It fetches a collection of words, which can be optionally tailored by difficulty, minimum length of letters, and/or maximum length of letters.  Then it randomly chooses one of the words for each round, giving the user 6 incorrect guesses before losing.  The guesses can be letters or full words, and duplicates are not permitted within the same submission form (i.e., if the user guessed 'a' in the letter form, s/he could also submit 'a' in the word form.  However, 'a' couldn't be resubmitted in the same form during the same round).  The player can keep playing rounds with new words each time, and the app will track wins/losses until the player closes or refreshes the web browser.

The app is deployed [here](https://reach-hangman.herokuapp.com/)

Information on the server being called can be found [here](https://github.com/harleyjj/reach-hangman-server)

## How to launch application locally:

Clone the repo and cd into the directory where it was cloned (the project directory).

In the project directory (requires Node.js), run:

### `npm install`

Once the node modules are finished installing, run:

### `npm start`

Your default web browser should launch on port 3000, at the landing page.  Alternatively, navigate to the deployed app, linked above.

## How to play:

* The landing page is where users can optionally set difficulty, minimum length of words, and maximum length of words, then start the game.

![landing page](./src/images/screenshots/1.png?raw=true "Landing Page")

* The game board is where the player can guess letters or words until s/he wins or loses, either by guessing incorrectly 6 times or finishing the secret word to win.

![game board](./src/images/screenshots/2.png?raw=true "Game Board")

## Folder Structure

The app is organized as follows:

```
client/
  README.md
  node_modules/
  package.json
  package-lock.json
  static.json
  public/
    background-image.jpg
    index.html
    favicon.ico
    manifest.json
  src/
    config.js
    index.css
    index.js
    local-storage.js
    logo.svg
    registerServiceWorker.js
    services.js
    store.js
    validators.js
    actions/
    components/
    images/
    reducers/
```

The app uses Redux, so the store is where the states are kept, with React components manipulating the state through actions - kept in the actions folder - and actions are used to update the state in reducers - kept in the reducers folder.  All React components are kept in the components folder.

## Extensions Built

* The app allows users to guess the whole word at once, with a correct answer winning automatically and an incorrect answer counting against the 6 incorrect guesses.  

* A drawing of a stickman being hung progressively materializes with each incorrect guess, just like if you were playing on a real whiteboard or piece of paper.

* Difficulty level, minimum letters, and maximum letters can be optionally selected on the landing page.  They modify the GET request sent to the server.

* The game tracks wins and losses until the browser is refreshed or closed.  It does not save records in a database.

* The server was put together at the last minute, because the resource being used originally stopped accepting requests.  The server just relays requests between reach-hangman and LinkedIn's Word Dictionary API, to overcome CORS issues.  

* A leaderboard could be implemented by using the reach-hangman-server to store records in a database.  The leaderboard could be displayed on the landing page, and users could be prompted to save their records with a username when they close or refresh the page, which would post or put the record in the database, using an endpoint on the reach-hangman-server

## Built With

* [React.js](https://reactjs.org/) - The web framework used

## Authors

* **Harley Jackson** - *Initial work* - [harleyjj](https://github.com/harleyjj)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* ReadMe Template by [PurpleBooth](https://github.com/PurpleBooth)
