import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useState, useEffect, useReducer } from 'react'
import * as Location from 'expo-location'

import { useNavigation } from '../utils'
import { ApplicationState, onUpdateLocation, UserState } from '../redux';
import { connect } from 'react-redux';

const screenWidth = Dimensions.get('screen').width;

interface LandingProps {
    userReducer: UserState,
    onUpdateLocation: Function
}

const _LandingScreen: React.FC<LandingProps> = (props) => {

    const { userReducer, onUpdateLocation } = props;

    const { navigate } = useNavigation();

    const [errorMsg, setErrorMsg] = useState("");
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>();
    const [displayAddress, setDisplayAddress] = useState("Waiting for curent location");

    useEffect(() => {
        let test = true;
        (async () => {
            if (test) {
                let { status } = await Location.requestBackgroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location in not granted')
                }
                let location: any = await Location.getCurrentPositionAsync({});

                const { coords } = location;

                if (coords) {
                    const { latitude, longitude } = coords;

                    let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude })

                    for (let item of addressResponse) {
                        setAddress(item)
                        onUpdateLocation(item)
                        let currentaddress = `${item.name},${item.street},${item.city},${item.country}`
                        setDisplayAddress(currentaddress)

                        if (currentaddress.length > 0) {
                            setTimeout(() => {
                                navigate('homeStack')
                            }, 1000);
                        }
                        return;
                    }
                }
                else {
                    //nothing
                }
            }
        }

        )();
        return () => {
            test = false
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.navigation} />
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.delivery_icon} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Your Delivery Address</Text>
                </View>
                <Text style={styles.addressText} >{displayAddress}</Text>
            </View>
            <View style={styles.footer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    delivery_icon: {
        width: 120,
        height: 120
    },
    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    addressTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#7D7D7D'
    },
    addressText: {
        fontSize: 16,
        fontWeight: '200',
        color: '#4f4F4F'
    },
    footer: {
        flex: 1,
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    useReducer: state.userReducer
})

const LandingScreen = connect(mapToStateProps, { onUpdateLocation })(_LandingScreen)

export { LandingScreen }