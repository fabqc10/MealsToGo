import React from 'react';
//styles
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//components
import { RestaurantsNavigator } from './restaurants.navigator';
import { SettingsNavigator } from './settings.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';

// Context with providers
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Settings: "md-settings",
  Map: "md-map"
}


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]
  return {
    tabBarIcon: ({ size, color}) => (
      <Ionicons name={iconName} size={size} color={color}/>
    ),
    tabBarActiveTintColor:'tomato',
    tabBarinActiveTintColor: 'gray'
  };
};

export const AppNavigator = () => {
    return(
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <Tab.Navigator
                screenOptions={createScreenOptions}
              >
                <Tab.Screen name="Restaurants" component={RestaurantsNavigator} options={{headerShown:false}}/>
                <Tab.Screen name="Map" component={MapScreen} options={{headerShown:false}} />
                <Tab.Screen name="Settings" component={SettingsNavigator} options={{headerShown:false}}/>
            </Tab.Navigator>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    );
};
