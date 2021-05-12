import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "../navigation/TabNavigator";
import { ModalScreen } from "../screens/ModalScreen"

const RootStackNavigator = () => {
    const RootStack = createStackNavigator();
    return (
        <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen name='Main' component={TabNavigator} />
            <RootStack.Screen name='Modal' component={ModalScreen} />
        </RootStack.Navigator>
    );
}

export default RootStackNavigator;




