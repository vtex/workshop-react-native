// @flow

import firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCwZMTugElANMh-zE9-hwKvkFGJz14sroo',
  authDomain: 'workshop-rn-todo.firebaseapp.com',
  databaseURL: 'https://workshop-rn-todo.firebaseio.com',
  storageBucket: 'workshop-rn-todo.appspot.com',
  messagingSenderId: '693080813498',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const database = firebaseApp.database()

const itemsRef = database.ref('items')

export type itemType = {
  id?: string,
  title: string,
  completed: boolean,
  created: number
}

export type filterType =
  | 'ALL'
  | 'ACTIVE'
  | 'COMPLETED'

export const FILTER_TYPES = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

export const listenForItems = (callback: (items: Array<itemType>) => void) => {
  itemsRef.on('value', (snap) => {
    // get items as an array
    var items = []
    snap.forEach((child) => {
      const newItem: itemType = {
        id: child.key,
        title: child.val().title,
        completed: child.val().completed,
        created: child.val().created,
      }
      items.push(newItem)
    })

    items.sort((a, b) => (
      a.created > b.created ? -1 : 1
    ))

    callback(items)
  })
}

export const itemEquals = (item1: itemType, item2: itemType) => (
  item1.id === item2.id &&
  item1.title === item2.title &&
  item1.completed === item2.completed &&
  item1.created === item2.created
)

export const filterItems = (items: Array<itemType>, filter: ?filterType): Array<itemType> => {
  if (filter === FILTER_TYPES.ALL) {
    return items
  }
  return items.filter((item: itemType): boolean => {
    if (filter === FILTER_TYPES.ACTIVE) {
      return !item.completed
    } else if (filter === FILTER_TYPES.COMPLETED) {
      return item.completed
    }
    return true
  })
}

export const addItem = (item: itemType) => {
  const newRef = itemsRef.push(item)
  if (!newRef) {
    console.error('The write operation failed')
  }
}

export const updateItem = (item: itemType) => {
  if (!item.id) {
    return
  }
  const itemRef = `items/${item.id}`
  const newRef = database.ref(itemRef).set(item)
  if (!newRef) {
    console.error('The update operation failed')
  }
}

export const removeItem = (item: itemType) => {
  return itemsRef.child(item.id).remove()
}

export const updateItems = (items: Array<itemType>) => {
  const updates = {}

  items.forEach((item: itemType) => {
    if (item && item.id) {
      updates[`items/${item.id}`] = item
    }
  })

  database.ref().update(updates)
}
