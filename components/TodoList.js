// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import autobind from 'autobind-decorator'

import {
  listenForItems,
  itemEquals,
} from '../utils/data'

import type { // eslint-disable-line no-duplicate-imports
  itemType,
} from '../utils/data'

import Row from './Row'

type PropType = {
};

class TodoList extends Component {
  props: PropType
  state: {
    loading: boolean,
    dataSource: Object,
    items: ?Array<itemType>,
  }

  constructor(props: PropType) {
    super(props)

    this.state = {
      loading: true,
      items: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1: itemType, row2: itemType) => !itemEquals(row1, row2),
      }),
    }
  }

  setSource(items: Array<itemType>, extraState?: Object) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      items,
      ...extraState,
    })
  }

  @autobind
  handleItemsChanged(items: Array<itemType>) {
    this.setSource(items, { loading: false })
  }

  @autobind
  renderItem(item: itemType) {
    return (
      <Row
        key={item.id}
        item={item}
      />
    )
  }

  componentDidMount() {
    listenForItems(this.handleItemsChanged)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.tasksLabel}>My tasks</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          style={styles.listview}
          enableEmptySections
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  tasksLabel: {
    marginRight: 10,
  },
  listview: {
    flex: 1,
    marginTop: 10,
  },
})

export default TodoList
