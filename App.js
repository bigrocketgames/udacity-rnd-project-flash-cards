import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import DeckQuiz from './components/DeckQuiz'
import AddQuestion from './components/AddQuestion'
import { red } from './utils/colors'

function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: <Ionicons name='ios-home-outline' size={30} color={'#fff'} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: <FontAwesome name='plus-square' size={30} color={'#fff'} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      height: 50,
      backgroundColor: red,
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      haederTintColor: '#fff',
      headerStyle: {
        backgroundColor: red
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {<FlashStatusBar backgroundColor={red} barStyle='light-content' />}
        <MainNavigator />
      </View>
    );
  }
}
