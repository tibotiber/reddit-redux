import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'

var store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <AsyncApp />
    </Provider>
  )
}

export default App
