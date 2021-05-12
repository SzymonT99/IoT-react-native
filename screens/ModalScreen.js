import React, { Component } from "react";
import { LogBox, View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { SlidersColorPicker } from "react-native-color";
import tinycolor from 'tinycolor2';
import { Dimensions } from 'react-native';

export class ModalScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            useNativeDriver: true,
            deviceName: '',
            place: '',
            command: '',
            colorPalette: false,
            recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
            color: tinycolor('#70c1b3').toHsl(),
            completedData: true
        }
    }

    getDevices = async () => {
        try {
            AsyncStorage.getItem('Devices').then((value) => {
                this.setState({
                    devicesList: JSON.parse(value)
                })
                alert(value)
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    saveDevice = async () => {

        let devicesList = await AsyncStorage.getItem('Devices');
        let devices = [];
        let device = {
            name: this.state.deviceName,
            place: this.state.place,
            command: '', //this.state.command,
            color: this.state.color
        };

        if (devicesList === null) {
            devices.push(device);
            await AsyncStorage.setItem('Devices', JSON.stringify(devices));
        }
        else {
            AsyncStorage.getItem('Devices')
                .then(data => {

                    data = JSON.parse(data);
                    data.push(device)
                    AsyncStorage.setItem('Devices', JSON.stringify(data));

                }).done();
        }
    }



    componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        console.warn = () => { }
    }

    updateHue = h => this.setState({ color: { ...this.state.color, h } });
    updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
    updateLightness = l => this.setState({ color: { ...this.state.color, l } });

    render() {
        return (
            <View style={styles.container}>
                <Header title='New Devices' />
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={styles.inputTextStyle}
                        placeholder="Name"
                        onChangeText={(text) => this.setState({ deviceName: text })}
                        value={this.state.deviceName}
                    />
                    <TextInput
                        style={styles.inputTextStyle}
                        placeholder="Place"
                        onChangeText={(text) => this.setState({ place: text })}
                        value={this.state.place}
                    />
                    <TextInput
                        style={styles.inputTextStyle}
                        placeholder="Command"
                        onChangeText={(text) => this.setState({ command: text })}
                        value={this.state.command}
                    />
                    <Text style={styles.selectColorText}>Color</Text>
                    <TouchableOpacity
                        style={[styles.colorBox, { backgroundColor: tinycolor(this.state.color).toHslString() }]}
                        onPress={() => this.setState({ colorPalette: true })}>
                    </TouchableOpacity>
                    <SlidersColorPicker
                        visible={this.state.colorPalette}
                        color={this.state.color}
                        returnMode={'hex'}
                        onCancel={() => this.setState({ colorPalette: false })}
                        onOk={colorHex => {
                            this.setState({
                                colorPalette: false,
                                color: tinycolor(colorHex).toHsl()
                            });
                            this.setState({
                                recents: [
                                    colorHex,
                                    ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                                ]
                            });
                        }}
                        swatches={this.state.recents}
                        swatchesLabel="RECENTS"
                        okLabel="Done"
                        cancelLabel="Cancel"
                    />
                    <Text style={styles.warningText}>
                        {this.state.completedData === false
                            ? 'All fields should be completed!' : ''}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Main')}>
                            <Text style={styles.textButton}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 36 }} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (this.state.deviceName === '' && this.state.place === '') {
                                    this.setState({
                                        completedData: false
                                    });
                                }
                                else {
                                    this.setState({
                                        completedData: true
                                    });
                                    this.saveDevice();
                                    this.props.navigation.navigate('Main');

                                }
                            }}>
                            <Text style={styles.textButton}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputTextStyle: {
        backgroundColor: "#FFFFFF",
        padding: 6,
        borderWidth: 1,
        fontSize: 16,
        marginTop: 16,
        width: "86%",
        alignSelf: "center",
    },
    selectColorText: {
        marginLeft: 30,
        marginTop: 28,
        fontSize: 26
    },
    colorBox: {
        marginTop: 8,
        marginLeft: 28,
        marginRight: 28,
        borderWidth: 1,
        height: 160
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#ababab",
        padding: 12,
        paddingLeft: 45,
        paddingRight: 45,
        borderWidth: 1,
        width: 0.38 * Dimensions.get('window').width,

    },
    textButton: {
        textAlign: "center",
        fontSize: 18,
    },
    warningText: {
        marginTop: 20,
        alignSelf: "center",
        color: "red",
        fontSize: 16
    }
});
