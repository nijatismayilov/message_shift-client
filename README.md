This project is a demo for Real Time Messaging Web Application. This repo represents the client-side app of the project.

## Technologies used to build the app

### `React`

UI of the application was written in React according to the component-driven architecture. React Functional Component pattern was used for building components. React hooks API was leveraged frequently, while developing the application.

### `Redux`

For state management at the application level, Redux was used. To connect the components to the store, Hooks API from React-Redux package, was leveraged. As a consequence, the programming paradigm was shifted from HOC pattern to hooks pattern throughout the project.

### `Redux-Saga`

Redux-Saga library was used to handle the side-effects in the application. These side-effects include API calls, interacting with the browser storage and etc.

### `Typescript`

Although the project was started as a JS application, in time, the codebase was moved to Typescript entirely for type safety and other reasons.

## Deployment and Demo

The live demo of the application can be viewed at [www.mshift.cloud](https://mshift.cloud)
