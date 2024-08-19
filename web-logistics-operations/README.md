# Web Logistics Operations

Web app responsible for the context of freight and logistics operators.

## Initializing

Enter the project folder:

`cd web-logistics-operations`

To run this project you need have the credentials. Talk to admin to check.

`cp .env.example .env`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run test:integration`

Running cypress integration tests.

To run tests correctly you need create file `cypress.env.json` with correct firebase credentials:
```
{
    "TEST_UID": "",
    "REACT_APP_API_KEY": "",
    "REACT_APP_AUTH_DOMAIN": "",
    "REACT_APP_PROJECT_ID": "",
    "REACT_APP_STORAGE_BUCKET": "",
    "REACT_APP_MESSAGING_SENDER_ID": "",
    "REACT_APP_API_ID": "",
    "REACT_APP_MEASUREMENT_ID": "",
}
```
Also you need create a `serviceAccount.json`, to get these credentials you must be part of the firebase project. Talk to admin to check.

```
{
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": "",
    "universe_domain": "",
}
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Running with docker

`docker compose up --build`

Your application will be available at http://localhost:3000.
