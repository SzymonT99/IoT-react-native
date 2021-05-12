import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#e1dfdf",
        width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
    },
    headerText: {
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 40,
        fontWeight: "bold"
    },
});

export default Header;
