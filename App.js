import React from 'react';
import { StyleSheet} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import SignupInfoScreen from './Screens/SignupInfoScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ProfileInfoScreen from './Screens/ProfileInfoScreen';
import HomeTab from './Tabs/HomeTab';
import SearchTab from './Tabs/SearchTab';
import CameraTab from './Tabs/CameraTab';
import LikesTab from './Tabs/LikesTab';
import ProfileTab from './Tabs/ProfileTab';
import { config } from './config';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AuthStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Signup: SignUpScreen,
  SignupInfo: SignupInfoScreen,
  ProfileInfo: ProfileInfoScreen
})

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
},
  {
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true
    },
    animationEnabled: true,
    swipeEnabled: true,
  }
)

const AppSwitchNavigator = createSwitchNavigator({
  authLoading: LoadingScreen,
  auth: AuthStackNavigator,
  app: AppTabNavigator
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10
  },
});

