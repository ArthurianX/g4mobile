# G4Mobile on ReactNative

This is the mobile application for [G4 Media](https://g4media.ro/)

## Architecture

The driving goal of the architecture of the boilerplate is separation of concerns. Namely:

- **Presentational components are separated from containers** (aka "screens").

    Presentational components are small components that are concerned with *how things look*. Containers usually define whole application screens and are concerned with *how things work*: they include presentational components and wire everything together.
    
    If you are interested you can [read more about it here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

- **State is managed using global [Redux](https://redux.js.org/) stores**.

    When applications grow, sharing state and its changes can become very hard. Questions like "How can I access this data?" or "When did this change?" are common, just like passing data around components just to be able to use it in nested components.
    
    With Redux, state is shared using global *stores*, and changes are predictable: *actions* are applied by *reducers* to the state. While the pattern can be a bit much for small projects, the clear separation of responsibilities and predictability helps with bigger applications.
    
    If you are interested you can [read more about it here](https://redux.js.org/introduction/motivation).
    
- **Application side-effects (API calls, etc.) are separated from UI and state manipulation using [Redux Saga](https://redux-saga.js.org/)**.

    Using Redux Saga has two benefits: keeping application side-effects and related business logic out of UI components, as well as executing that logic in an asynchronous way without ending in callback hell.
    
    Sagas are triggered by Redux actions and can also trigger Redux actions to alter state. By using JavaScript generators (`yield`), sagas are written in a synchronous-like manner while still executing asynchronously.

## Content

The boilerplate contains:

- a [React Native](https://facebook.github.io/react-native/) (v0.57.8) application (in "[ejected](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md)" mode to allow using dependencies that rely on native code)
- a [clear directory layout](#directory-layout) to provide a base architecture for your application
- [Redux](https://redux.js.org/) (v3.7) to help manage state
- [Redux Persist](https://github.com/rt2zz/redux-persist) (v5.9) to persist the Redux state
- [Redux Sagas](https://redux-saga.js.org) (v5.0) to separate side-effects and logic from state and UI logic
- [React Navigation](https://reactnavigation.org/) (v2.12) with a [`NavigationService`](App/Services/NavigationService.js) to handle routing and navigation in the app, with a splash screen setup by default
- [reduxsauce](https://github.com/infinitered/reduxsauce) (v0.7) to facilitate using Redux
- [apisauce](https://github.com/infinitered/apisauce) (v0.15) to make [axios](https://github.com/axios/axios) even better
- [prettier](https://prettier.io/) and [eslint](https://eslint.org/) preconfigured for React Native

The boilerplate includes an example (displaying the current weather temperature) from UI components to the saga. The example is easy to remove so that it doesn't get in the way.

## Directory layout

- [`App/Components`](App/Components): presentational components
- [`App/Config`](App/Config): configuration of the application
- [`App/Containers`](App/Containers): container components, i.e. the application's screens
- [`App/Assets`](App/Assets): assets used in the application, images, animations and fonts
- [`App/Sagas`](App/Sagas): redux sagas
- [`App/Services`](App/Services): application services, e.g. API clients
- [`App/Stores`](App/Stores): redux [actions, reducers and stores](https://redux.js.org/basics)
- [`App/Theme`](App/Theme): base styles for the application

For more information on each directory, click the link and read the directory's README.

## Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.

You also need to install the dependencies required by React Native:

- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)


## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

- `yarn install` to install the dependencies
- create your [configuration file `App/Config/index.js`](App/Config) from `index.dev.js` (in you are in dev environment) and fill the missing values
- install [React Native Debugger](https://github.com/jhen0409/react-native-debugger)(download one of the releases) and start the application
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone)
- `react-native run-ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)
- iOS specific: once the Simulator has started and the app has thrown a big red error, hit `CMD+D` (with the simulator window selected) and select `Debug JS`, then `CMD+R` to restart the application

## Gotchas

- android debugging is shoddy at best
- the bundler often gets stuck, unstuck it with `watchman watch-del-all && rm -rf /tmp/metro-bundler-cache-* && npm start -- --reset-cache`
- iOS: When using Inspector (Toggle Inspector from Simulator) when selecting an element in the app you can see the selected element in React Native Debugger
- the red error screens usually will load a sourceMap and point you in the right file where the error occured, that is most of the times
- sometimes everything is so wrong that you have to manually delete the build folders and start a clean build (`/ios/build` and `/android/build`) followed by a bundler clean start as well
- when linking new React Native libraries, it might fail or it might not be enough, make sure to also try the manual route
- React Native Debugger can also get stuck (after long usage, it hogs up a lot of memory), the Simulator will move incredibly slow and the bundler won't detect changes properly, make sure to restart everything.

## Useful documentation

### Deployment

- Using [Fastlane](https://fastlane.tools/) to automate builds and store deployments (iOS and Android)
  - [Distributing beta builds](docs/beta%20builds.md)


### Package dependencies

- You may want to use [CocoaPods](https://cocoapods.org/) to manage your dependencies (iOS only) 
  - [Using CocoaPods to manage your package dependencies](docs/setup%20cocoapods.md)
