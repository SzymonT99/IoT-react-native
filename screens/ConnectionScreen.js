import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export class ConnectionScreen extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title='Connection'/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>Connection Screen</Text>
                </View>
            </View>
        )
    }
};

