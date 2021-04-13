# Vuex typescript modules

This repository has a starter setup to use vue 3 with Quasar framework. It has initial configurations for:
- vuex modules and typings
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
#### Deploy
```bash
yarn deploy
```
#### Local development
To use app and local environment without affecting production project just start the
emulators and set NODE_ENV=dev. yarn dev will automatically set env to dev.
With emulators running, just access to ui and create a user to login at remotion back office.
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

This repository shows how to wrap typings for vuex when implementing different modules.
There are similar examples on the internet, but i noticed on them some difficulties that aimed
me to share this repo and explain why i made the changes i made.

The key for store typings is to create the Store type. With Omit (typescript function) we can make
Store to be a VuexStore but remove from it commit and getters functions. With typescript intersection
types we add our version of commit and getters, which will have the typings.
Key difference with other examples is that we preserve original dispatch. This is because the use of modules
will make us to call dispatch like this:
```vue
const store = useStore()
store.dispatch('authModule/login', {email, password})
```
This module concatenation is understood by IDE when ctrl + click name and will preserve namespacing. If
we replaced 'dispatch' also with own typings, namespacing will not be available and IDE won't let us compile.

## Routing

As repo has implemented firebase authtentication, route forwarding and guarding is very interesting in this app.
Take a look at how redirections are made depending on user roles and authenticated state
