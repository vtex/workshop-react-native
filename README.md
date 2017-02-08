# React Native's Workshop

The idea is create a simple Todo App for iOS and Android, that saves and retrieves data from firebase.

## Setup a new app to start the Workshop

```shell
npm install -g react-native-cli yarn
```

```shell
react-native init RNTodoWorkshop
```

Create your App.js with Hello World content and edit your index.android.js and index.ios.js to use it.

Copy these files and folders from this repository to yours:

* .babelrc
* .eslintrc
* .flowconfig
* .gitignore
* package.json
* \_\_tests\_\_/
* assets/
* backup/
* utils/

Execute:

```shell
yarn
```

## Setup this app to test

You can clone this project and setup to run the final version of the proposed Todo App.

You can also checkout a specific commit to see each version of this app.

To setup this project:

```shell
npm install -g yarn
yarn
```

## To run the app on iOS

You can either run the app as a normal project on XCode or run on terminal:

```shell
react-native run-ios
```

This will run the app on an iOS simulator

To run the app on an iOS device see: https://facebook.github.io/react-native/docs/running-on-device.html

## To run the app on Android

if packager is not already running, run on terminal:

```shell
npm start
```

You can either run the app as a normal project on Android Studio or run on terminal:

```shell
react-native run-android
```

This will run the app on an Android device or Genymotion

For more options see: https://facebook.github.io/react-native/docs/running-on-device.html

## Workshop

The idea of this workshop is execute each of the following tasks to create a Todo App:

1. Configure a react native project and add a image and custom Status Bar to it
2. Configure [firebase](#firebase) and see a List of tasks appear on screen
3. Create a text field that add new tasks
4. Add the ability to delete a given task
5. Add the ability to mark a task as completed or uncompleted
6. Add loading to wait for list of tasks to appear
7. Add filters to tasks
8. Add the ability to inline edit a given task

Bonus tasks:

1. Show the count of active tasks remaining (uncompleted tasks)
2. Create a toggle all tasks to be completed or uncompleted
3. Add cache to tasks so it can work offline

## Firebase

Configure firebase by going on: https://console.firebase.google.com/?pli=1 with a valid google account.

Then create a new project.

After the project is created, click on "Add firebase to your webapp" option.

Copy the values to utils/data.js

Import backup/workshop-rn-todo-initial-data.json to your database.

And override the rules of your database to:

```javascript
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

You can ignore any warnings after that.

## Flow

See official docs for learning how to use flow: https://flowtype.org/docs/builtins.html

## Flexbox

To start learning flexbox see this article: https://medium.freecodecamp.com/an-animated-guide-to-flexbox-d280cf6afc35

See this guide for a more complete overview of flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

## Reference

This workshop was based on this egghead course: https://egghead.io/courses/build-a-react-native-todomvc-application

## Other React Native examples

See this repository for other examples: https://github.com/guilhermebruzzi/rnExamples

## Presentation

You can download the original presentation of this workshop here: https://www.dropbox.com/s/subacw2atz0vklf/RNVTEX_Workshop.key?dl=0

## Video of the last workshop Presentation

Workshop on 08 of february of 2017 at VTEX: https://www.youtube.com/watch?v=uXkgDXrHVkg
