import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface ButtonProps {
    onTap: Function;
}


const ButtonAddRemove: React.FC<ButtonProps> = ({ onTap }) => {

    return (
        <TouchableOpacity style={styles.btn} onPress={() => onTap()}>
            <Text style={{ fontSize: 18, color: '#FFF' }}> Add</Text>
        </TouchableOpacity>
    )

}


const styles = StyleSheet.create({

    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', width: 80,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#f15b5b'
    },

    btnPlusMinus: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#f15b5d',
        height: 58,
        width: 38
    },

    optionsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', flex: 1
    },

})


export { ButtonAddRemove }