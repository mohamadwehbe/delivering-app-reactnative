import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import { FoodAvailability, FoodModel } from "../models";

export interface AvailabilityAction {
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}

export interface FoodSearchAction {
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}

export interface ShoppingErrorAction {
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction;

export const onAvailability = () => {
    return async (dispatch: Dispatch<ShoppingAction>) => {

        const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/78787878`)
        if (!response) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: 'Availability error'
            })
        }

        try {
            dispatch({
                type: 'ON_AVAILABILITY',
                payload: response.data
            })
        }
        catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onSearchFoods = () => {


    return async (dispatch: Dispatch<ShoppingAction>) => {

        try {

            const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/5689`)

            console.log(response)

            if (!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}