import { View, Text, StyleSheet, Dimensions, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApplicationState, FoodModel, onSearchFoods, onAvailability, Restaurant, ShoppingState, UserState } from '../redux'
import { connect } from 'react-redux'
import { SearchBar, ButtonWithIcon, CategoryCard, RestaurantCard } from '../components'
import { useNavigation } from '../utils'

interface HomeProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;
    const { categories, foods, restaurants } = availability;
    const { navigate } = useNavigation();

    useEffect(() => {
        props.onAvailability()
        setTimeout(() => {
            props.onSearchFoods()
        }, 1000);
    }, [])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item })
    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{
                    marginTop: 50,
                    flex: 4,
                    backgroundColor: 'white',
                    paddingLeft: 20,
                    paddingRight: 20,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Text>
                        {location.name},{location.street},{location.city}
                    </Text>
                    <Text>
                        Edit
                    </Text>
                </View>
                <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                    <SearchBar
                        didTouch={() => {
                            navigate('SearchPage')
                        }}
                        onTextChange={() => { }}
                    />
                    <ButtonWithIcon onTap={() => { }} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({ item }) => <CategoryCard item={item} onTap={() => { alert('category tapped') }} />}
                        keyExtractor={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#f15b5d' }}>Top Restaurants</Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={onTapRestaurant} />}
                        keyExtractor={(item) => `${item._id}`}
                    />
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '600', color: '#f15b5d' }}>30 Minutes Foods</Text>
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={onTapFood} />}
                        keyExtractor={(item) => `${item._id}`}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen }