# Vuex typescript modules

This repository has a starter setup to use vue 3 with Quasar framework. It has initial configurations for:
- vuex typings
- firebase authentication and roles management
- routing and guard navigation for redirections depending on user role
- some scripts to create users in firebase and manage its roles

## Setup

The repository has been created with quasar cli. Read it's [documentation](https://next.quasar.dev/) to know how to
get started

### Install the dependencies
```bash
yarn
```

### Build the app for production (SPA)
```bash
yarn build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

### Firebase
Firebase project configuration is set as env variable at quasar.config.js, just change firebase config with your own
If you want to deploy to firebase hosting you have to add your project to configuration.
````bash
yarn add-firebase-project
````
#### Deploy
```bash
yarn deploy
```
#### Local development
To use app and local environment without affecting production project just start the
emulators and set NODE_ENV=dev. yarn dev will automatically set env to dev.
With emulators running, just access to ui and create a user to login.
```bash
yarn emulators
```
```bash
yarn dev
```

#### User Creation (Production)
service-account.json is needed for the cli to access admin sdk credentials.
- At firebase console go to project configuration
- Go to service account tab and generate a new private key.
- Save this file as "service-account.json" at the root of the project (don't commit this file as it contains credentials)

Once this is ready, to create a user for production use
```bash
yarn create-user
```
and follow prompts.

To assign roles use
```bash
yarn add-role
```

## Vuex typings

This repository shows how to wrap typings for vuex. Vuex 4 typing support is quite basic so i
recommend not to use modules with this typings. Vuex 5 will come with full typescript support
and it removes module concept by replacing with store composition.

## Routing

As repo has implemented firebase authentication, route forwarding and guarding is a very interesting
feature in this app.
Take a look at how redirections are made depending on user roles and authenticated state, this is a starting
point of something more complex
