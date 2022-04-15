import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

//components
import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

//importing context
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const Map = styled(MapView)`
    height: 100%;
    width: 100%;
`;



export const MapScreen = ({navigation}) => {
    const { location } = useContext(LocationContext);
    const { restaurants = [] } = useContext(RestaurantsContext);

    const {lng,lat,viewport} = location;
    

    //It's what determines how close the zoom is going to be in the map
    const [ latDelta, setLatDelta ] = useState(0);

    useEffect( () => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        setLatDelta(northeastLat - southwestLat);
        
    },[location,viewport]);

    return(
    <>
        <Search/>
        <Map
            region={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: latDelta,
                longitudeDelta: 0.02
            }}
        >
            {restaurants.map((restaurant) => {
                return (
                    <MapView.Marker
                        key={restaurant.name}
                        title={restaurant.name}
                        coordinate={{
                            latitude:restaurant.geometry.location.lat,
                            longitude: restaurant.geometry.location.lng
                        }}
                        >
                        <MapView.Callout onPress={() => navigation.navigate("RestaurantDetail",{restaurant})}>
                            <MapCallout restaurant={restaurant}/>
                        </MapView.Callout>
                    </MapView.Marker>
                );
            })}
        </Map>
    </>
    );
};