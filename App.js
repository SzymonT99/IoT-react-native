import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./navigation/RootStackNavigator";
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    );
  }
};
