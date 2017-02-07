// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'

import type { // eslint-disable-line no-duplicate-imports
  itemType,
} from '../utils/data'

type PropType = {
  item: itemType,
  onRemove: (item: itemType) => void,
};

class Row extends Component {
  props: PropType
  state: {
    title: string,
  }

  constructor(props: PropType) {
    super(props)
    this.state = {
      editing: false,
    }
  }

  render() {
    const item: itemType = this.props.item

    const titleStyle = [
      styles.title,
      (item.completed) ? styles.titleCompleted : null,
    ]

    return (
      <View style={styles.container}>
        <Text style={titleStyle}>{item.title}</Text>
        <Button
          onPress={() => this.props.onRemove(item)}
          title="X"
          color="#333"
          accessibilityLabel="Remove task"
        />
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
