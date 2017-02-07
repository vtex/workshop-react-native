// @flow

import React from 'react'
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native'

import logo from './assets/imgs'

import TodoList from './components/TodoList'

const RNTodoWorkshop = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EEE" barStyle="dark-content" />
      <Image style={styles.logo} source={logo} />
      <TodoList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 85,
    height: 85,
  },
})

export default RNTodoWorkshop
