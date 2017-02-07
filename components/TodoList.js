// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native'
import autobind from 'autobind-decorator'

import {
  FILTER_TYPES,
  listenForItems,
  itemEquals,
  filterItems,
  updateItem,
  removeItem,
} from '../utils/data'

import type { // eslint-disable-line no-duplicate-imports
  filterType,
  itemType,
} from '../utils/data'

import Row from './Row'
import Filters from './Filters'

type PropType = {
};

class TodoList extends Component {
  props: PropType
  state: {
    loading: boolean,
    dataSource: Object,
    items: ?Array<itemType>,
    filter: filterType,
  }

  constructor(props: PropType) {
    super(props)

    this.state = {
      loading: true,
      items: null,
      filter: FILTER_TYPES.ALL,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1: itemType, row2: itemType) => !itemEquals(row1, row2),
      }),
    }
  }

  setSource(items: Array<itemType>, filter: filterType, extraState?: Object) {
    const filteredItems = filterItems(items, filter)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredItems),
      items,
      ...extraState,
    })
  }

  @autobind
  handleItemsChanged(items: Array<itemType>) {
    this.setSource(items, this.state.filter, { loading: false })
  }

  @autobind
  handleRemoveItem(item: itemType) {
    removeItem(item)
  }

  @autobind
  handleToggleComplete(item: itemType) {
    updateItem({
      ...item,
      completed: !item.completed,
    })
  }

  @autobind
  handleEditItem(item: itemType, title: string) {
    updateItem({
      ...item,
      title,
    })
  }

  @autobind
  handleFilterChange(filter: filterType) {
    const items = this.state.items
    if (items) {
      this.setSource(
        items, filter, { filter: filter }
      )
    }
  }

  @autobind
  renderItem(item: itemType) {
    return (
      <Row
        key={item.id}
        item={item}
        onEdit={this.handleEditItem}
        onRemove={this.handleRemoveItem}
        onSwitch={this.handleToggleComplete}
      />
    )
  }

  componentDidMount() {
    listenForItems(this.handleItemsChanged)
  }

  render() {
    const loadingComponent = (this.state.loading) ? (
      <ActivityIndicator
        size="large"
        color="#333"
        style={styles.loading}
      />) : null

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.tasksLabel}>My tasks</Text>
        </View>
        {loadingComponent}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          style={styles.listview}
          enableEmptySections
        />
        {(this.state.items) ? <Filters
          filter={this.state.filter}
          items={this.state.items}
          onFilterChange={this.handleFilterChange}
        /> : null}
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
  loading: {
    marginTop: 100,
  },
  listview: {
    flex: 1,
    marginTop: 10,
  },
})

export default TodoList
