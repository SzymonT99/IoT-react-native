import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DevicessScreen } from "../screens/DevicesScreen"
import { ConnectionScreen } from "../screens/ConnectionScreen"


MyTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        key={index}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.tabButton, route.name == 'Connection' && { borderLeftWidth: 0 }]}
                    >
                        <Text style={{ fontSize: 17, color: isFocused ? '#002eb5' : '#000000' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Devices' tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name='Devices' component={DevicessScreen} />
            <Tab.Screen name='Connection' component={ConnectionScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    tabButton: { 
        flex: 1, 
        height: 70, 
        justifyContent: "center", 
        alignItems: "center", 
        borderWidth: 1, 
        backgroundColor: "#ababab" 
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "Roboto"
    } 
});


export default TabNavigator;




