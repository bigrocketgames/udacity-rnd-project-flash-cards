import React from 'react'
import { TabNavigator, StackNavigator} from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import DeckQuiz from './components/DeckQuiz'
import DeckStudy from './components/DeckStudy'
import AddQuestion from './components/AddQuestion'
import { red, white, black } from './utils/colors'

export const Tabs = TabNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: <Ionicons name='ios-home' size={30} color={white} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: <FontAwesome name='plus' size={30} color={white} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: white,
    inactiveTintColor: black,
    style: {
      height: 50,
      backgroundColor: red,
    }
  }
})

export const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  DeckStudy: {
    screen: DeckStudy,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red
      }
    }
  }
})