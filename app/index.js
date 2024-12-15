
import React from 'react'
import Navigation from "./Nav/Navigation"
import store from './src/screens/redux/store'
import { Provider } from 'react-redux'
export default function index() {
  return (
    <Provider store={store}>
    <Navigation/>
    </Provider>
  )
}