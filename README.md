# REACH Hangman

This app implements the classic game "Hangman" using React.js.  It fetches a collection of words, which can be optionally tailored by difficulty, minimum length of letters, and/or maximum length of letters.  Then it randomly chooses one of the words for each round, giving the user 6 incorrect guesses before losing.  The guesses can be letters or full words, and duplicates are not permitted within the same submission form (i.e., if the user guessed 'a' in the letter form, s/he could also submit 'a' in the word form.  However, 'a' couldn't be submitted in the same form during the same round).  The player can keep playing rounds with new words each time, and the app will track wins/losses until the player closes or refreshes the browser.

The app is deployed [here](https://reach-hangman.herokuapp.com/)

# How to launch application locally:

Clone the repo and cd into the directory where it was cloned (the project directory).

In the project directory, run:

### `npm install`

Once the node modules are finished installing, run:

### `npm start`

You're default web browser should launch on port 3000, at the landing page.  Alternatively, navigate to the deployed app, linked above.

# How to play:

* The landing page is where users can decide whether they want to find an autoshop or be listed.

![landing page](./src/images/screenshots/1.png?raw=true "Landing Page")

## Folder Structure

The app is organized like as follows:

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

The app uses Redux, so the store is where the states are kept, with React components manipulating the state through actions, kept in the actions folder, where actions are used to update the state in reducers, kept in the reducers folder.  All react components are kept in the components folder.

## Built With

* [React.js](https://reactjs.org/) - The web framework used

## Authors

* **Harley Jackson** - *Initial work* - [harleyjj](https://github.com/harleyjj)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* ReadMe Template by [PurpleBooth](https://github.com/PurpleBooth)
