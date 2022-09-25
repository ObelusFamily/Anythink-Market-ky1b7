# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

To setup the project on a new machine:

- First, make sure you have docker installed
- Clone this repository
- Run the backend and frontend by running the following command in the project's root directory:
  ```sh
  docker-compose up
  ```
- Now that the project is running, you should be able to access it at [http://localhost:3001](http://localhost:3001). Go there and click "register" (or just click [here](http://localhost:3001/register)) to create a new user.
