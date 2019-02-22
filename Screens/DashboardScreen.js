import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import HomeTab from '../Tabs/HomeTab';
import SearchTab from '../Tabs/SearchTab';
import CameraTab from '../Tabs/CameraTab';
import LikesTab from '../Tabs/LikesTab';
import ProfileTab from '../Tabs/ProfileTab';

class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static navigationOptions = {
    headerLeft: <AntDesign name="camerao" size={32} style={{ paddingLeft: 10 }} />,
    title: 'Finstagram',
    headerRight: <Feather name="log-out" size={26} style={{ paddingRight: 10 }} />
  };

  render() {
    return (
      <AppTabNavigator />
    );
  }
}
const AppTabNavigator = createBottomTabNavigator({
  HomeTab: {
    screen: HomeTab
  },
  SearchTab: {
    screen: SearchTab
  },
  CameraTab: {
    screen: CameraTab
  },
  LikesTab: {
    screen: LikesTab
  },
  ProfileTab: {
    screen: ProfileTab
  }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true
    }

  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
});

export default DashboardScreen;