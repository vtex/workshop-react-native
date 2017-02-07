// @flow

import React from 'react'
import {
  Platform,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'

import {
  FILTER_TYPES,
  filterItems,
} from '../utils/data'

import type { // eslint-disable-line no-duplicate-imports
  filterType,
  itemType,
} from '../utils/data'

type PropType = {
  filter: filterType,
  items: Array<itemType>,
  onFilterChange: (filter: filterType) => void,
};

type FilterPropType = {
  activeFilter: filterType,
  filterChange: filterType,
  title: string,
  accessibilityLabel: string,
  onFilterChange: (filter: filterType) => void,
}

const Filter = ({ activeFilter, filterChange, title, accessibilityLabel, onFilterChange }: FilterPropType) => {
  const isActive: boolean = (activeFilter === filterChange)
  const filterStyle = (isActive) ? { backgroundColor: '#ccc' } : null
  const buttonColor = (Platform.OS === 'android' && isActive || Platform.OS === 'ios') ? '#333' : '#ccc'
  return (
    <View style={filterStyle}>
      <Button
        onPress={() => onFilterChange(filterChange)}
        title={title}
        color={buttonColor}
        accessibilityLabel={accessibilityLabel}
        style={styles.filter}
      />
    </View>
  )
}

const Filters = (props: PropType) => {
  const activeItems = filterItems(props.items, FILTER_TYPES.ACTIVE)
  const activeItemsMessage = `${activeItems.length} active tasks`

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Filter
          activeFilter={props.filter}
          filterChange={FILTER_TYPES.ALL}
          title="ALL"
          accessibilityLabel="Show all tasks"
          onFilterChange={props.onFilterChange}
        />
        <Filter
          activeFilter={props.filter}
          filterChange={FILTER_TYPES.ACTIVE}
          title="ACTIVE"
          accessibilityLabel="Show active tasks"
          onFilterChange={props.onFilterChange}
        />
        <Filter
          activeFilter={props.filter}
          filterChange={FILTER_TYPES.COMPLETED}
          title="COMPLETED"
          accessibilityLabel="Show completed tasks"
          onFilterChange={props.onFilterChange}
        />
      </View>
      <Text style={styles.activeItemsMessage}>{activeItemsMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filter: {
    color: '#333',
    fontSize: 16,
    height: 30,
    lineHeight: 30,
    marginLeft: 10,
  },
  activeItemsMessage: {
    fontSize: 16,
    width: 80,
  },
})

export default Filters
