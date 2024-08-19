# API Freight Simulator

## Description

API responsible for the context of freight and logistics operators.

## Initializing

Enter the project folder:

`cd api-freight-simulator`

To run this project you need have the credentials. Talk to admin to check.

`cp .env.example .env`

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

## Deploy

To deploy in this moment you need to install Heroku CLI and have permission on Heroku. Talk to admin to check.

```bash
$ heroku login

# You must have Docker set up locally to continue
$ docker ps

$ heroku container:push web

$ heroku container:push web

$ heroku container:release web

# container logs
$ heroku logs --tail
```