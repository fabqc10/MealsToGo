import React from "react";

import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";

import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = ({navigation}) => {
    return (
        <RestaurantStack.Navigator
            screenOptions={{
                headerShown:false,
                ...TransitionPresets.ModalPresentationIOS
                }}>
            <RestaurantStack.Screen
                name="Restaurants"
                component={RestaurantsScreen}
            />
            <RestaurantStack.Screen
                name="RestaurantDetail"
                component={RestaurantDetailScreen}
            />
        </RestaurantStack.Navigator>
    )
}

