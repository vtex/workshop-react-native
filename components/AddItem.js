// @flow

import React, { Component } from 'react'
import {
  Platform,
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native'

import autobind from 'autobind-decorator'

import { // eslint-disable-line no-duplicate-imports
  addItem,
} from '../utils/data'

import type { // eslint-disable-line no-duplicate-imports
  itemType,
} from '../utils/data'

type PropType = {
}

class AddItem extends Component {
  props: PropType
  state: {
    title: string,
  }

  constructor(props: PropType) {
    super(props)
    this.state = {
      title: '',
    }
  }

  @autobind
  handleAddItem() {
    if (!this.state.title) {
      return
    }

    const newItem: itemType = {
      title: this.state.title,
      completed: false,
      created: Date.now(),
    }
    addItem(newItem)
    this.handleChangeTitle('')
  }

  @autobind
  handleChangeTitle(title: string) {
    this.setState({ title })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.handleChangeTitle}
          value={this.state.title}
          style={styles.addInput}
          onSubmitEditing={this.handleAddItem}
          returnKeyType="send"
        />
        <Button
          onPress={this.handleAddItem}
          title="ADD"
          color="#333"
          accessibilityLabel="Add task"
          style={styles.addButton}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  addInput: {
    height: 40,
    width: 200,
    padding: 5,
    borderColor: '#333',
    borderWidth: (Platform.OS === 'ios') ? 1 : 0,
    marginRight: 10,
  },
  addButton: {
    width: 50,
    height: 40,
    marginLeft: 10,
  },
})

export default AddItem
