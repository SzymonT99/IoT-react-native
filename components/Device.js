import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Dimensions } from 'react-native';

const Device = (props) => {
    return (
        <View style={[styles.container, 
        {backgroundColor: `hsl(${props.color.h}, ${props.color.s * 100}%, ${props.color.l * 100}%)` }]}>
            <Text style={styles.textDevice}>{props.deviceName}</Text>
            <Text style={styles.textPlace}>{props.placeName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 0.43 * Dimensions.get('window').width,
        height: 0.43 * Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center",
        margin: 0.02 * Dimensions.get('window').width,
        borderWidth: 1,
        marginTop: 24
        
    },
    textDevice: {
        fontFamily: "BreeSerif-Regular",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30
    },
    textPlace: {
        fontFamily: "SourceSansPro-Regular",
        textAlign: "center",
        marginTop: 3,
        fontSize: 20
    }
});

export default Device;
