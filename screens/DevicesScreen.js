import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import Device from "../components/Device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class DevicessScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devicesList: [],
        }
    }

    componentDidMount() {
        this.getDevices();
    }

    getDevices = async () => {
        try {
            AsyncStorage.getItem('Devices').then((value) => {
                this.setState({
                    devicesList: JSON.parse(value)
                })
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    generateDevicesList = () => {
        const { devicesList } = this.state;
        this.getDevices();
        let devices = null;
        if (devicesList !== null) {
            devices = devicesList.map((device, index) => {
                return <Device key={index} deviceName={device.name} 
                placeName={device.place} color={device.color} />
            })
        }
        return devices;
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Devices' />
                <ScrollView>
                    <View style={styles.devicesList}>
                        {this.generateDevicesList()}
                        <TouchableOpacity
                            style={styles.additionDevice}
                            onPress={() => this.props.navigation.navigate('Modal')}>
                            <Icon name='add' size={30} style={styles.additionIcon} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    devicesList: {
        flex: 1,
        marginTop: 10,
        marginBottom: 26,
        marginLeft: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    additionDevice: {
        backgroundColor: "#FFFFFF",
        width: 0.43 * Dimensions.get('window').width,
        height: 0.43 * Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center",
        margin: 0.02 * Dimensions.get('window').width,
        borderRadius: 1,
        borderWidth: 1.5,
        borderStyle: 'dotted',
        marginTop: 24
    },
    additionIcon: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 64
    },
});