import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation'
import { Constants } from 'expo'

import Decks from './components/Decks'
import { red } from './utils/colors'

function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {<FlashStatusBar backgroundColor={red} barStyle='light-content' />}
        <Decks />
      </View>
    );
  }
}
