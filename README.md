## Description

It's a simple application to enable playing tic-tac-toe for any registered user.

## Details

The application written in TypeScript, using [Nest](https://github.com/nestjs/nest) as a framework, using some of its build-in functionality, such as dependency injection
or validation with pipes. The app written in modular way, providing better maintainability, testability and scaleability. There are 3 modules, namely database, user and game, where the database module represent the repository layer (this is now a non-persisting, in-memory DB), while the user and game modules are handling the business logic needed to create/read/update/delete users and games. The application API written in a way to be a webservice for handling many players and games simultaneously.

The user flow to play a game:
- create users (/user POST)
- create a game with particular users (/game POST)
- make moves with the different players (/game/:id PUT)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```