// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from 'react-native'

import autobind from 'autobind-decorator'

import type { // eslint-disable-line no-duplicate-imports
  itemType,
} from '../utils/data'

type PropType = {
  item: itemType,
  onEdit: (item: itemType, title: string) => void,
  onRemove: (item: itemType) => void,
  onSwitch: (item: itemType) => void,
};

class Row extends Component {
  props: PropType
  state: {
    title: string,
    editing: boolean
  }

  constructor(props: PropType) {
    super(props)
    this.state = {
      editing: false,
      title: props.item.title,
    }
  }

  @autobind
  handleChangeTitle(title: string) {
    this.setState({ title })
  }

  @autobind
  handleEditItem() {
    this.props.onEdit(this.props.item, this.state.title)
    this.setState({ editing: false })
  }

  componentWillReceiveProps(nextProps: PropType) {
    this.setState({
      title: nextProps.item.title,
    })
  }

  render() {
    const item: itemType = this.props.item

    const titleStyle = [
      styles.title,
      (item.completed) ? styles.titleCompleted : null,
    ]

    const showElement = (
      <View style={styles.container}>
        <Text
          onLongPress={() => this.setState({ editing: true })}
          style={titleStyle}
        >{item.title}</Text>
        <Button
          onPress={() => this.props.onRemove(item)}
          title="X"
          color="#333"
          accessibilityLabel="Remove task"
        />
      </View>
    )

    const editingElement = (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.handleChangeTitle}
          value={this.state.title}
          style={styles.editInput}
          onSubmitEditing={this.handleEditItem}
          autoFocus
          returnKeyType="done"
        />
        <Button
          onPress={this.handleEditItem}
          title="EDIT"
          color="#333"
          accessibilityLabel="Edit task's title"
        />
      </View>
    )

    return (
      <View style={styles.container}>
        <Switch
          onValueChange={() => this.props.onSwitch(item)}
          value={item.completed}
          style={styles.changeSwitch}
        />
        {(this.state.editing) ? editingElement : showElement}
      </View>
    )
  }

}

const lineHeight = 30
const fontSize = 16
const margin = 10

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  changeSwitch: {
    height: lineHeight,
  },
  editInput: {
    color: '#333',
    padding: 5,
    width: 150,
    fontSize: fontSize,
    height: lineHeight,
    marginLeft: margin,
    borderColor: '#333',
    borderWidth: 1,
  },
  title: {
    color: '#333',
    fontSize: fontSize,
    height: lineHeight,
    lineHeight: lineHeight,
    marginLeft: margin,
    marginRight: margin,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
})

export default Row
