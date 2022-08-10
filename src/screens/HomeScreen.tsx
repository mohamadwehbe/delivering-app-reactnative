import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { ApplicationStore, onAvailability, ShoppinState, UserState } from '../redux'
import { connect } from 'react-redux'

interface HomeProps {
    userReducer: UserState,
    shoppingReducer: ShoppinState,
    onAvailability: Function
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <Text>Navigation {JSON.stringify(location)}</Text>
            </View>
            <View style={styles.body}>
                <Text>Home Screen</Text>
            </View>
            <View style={styles.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

const mapToStateProps = (state: ApplicationStore) => ({
    useReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability })(_HomeScreen)

export { HomeScreen }