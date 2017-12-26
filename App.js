import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { red } from './utils/colors'
import { MainNavigator } from './navigators'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)} >
        <View style={{flex: 1}}>
          {<FlashStatusBar backgroundColor={red} barStyle='light-content' />}
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
