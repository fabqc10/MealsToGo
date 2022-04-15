import React,{createContext,useState, useEffect, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Importing context
import { AuthenticationContext } from "../authentication/authentication.context";
//Creating context
export const FavouritesContext = createContext();


export const FavouritesContextProvider = ({children}) => {
    const [favourites, setToFavourites] = useState([]);

    const { user } = useContext(AuthenticationContext);


    const saveFavourites = async (value,uid) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (e) {
          console.log("error storing ",e);
        }
      };

    
    const loadFavorites = async (uid) => {
        try {
        const value = await AsyncStorage.getItem(`@favourites-${uid}`);
        if (value !== null) {
            setToFavourites(JSON.parse(value));
        }
        } catch(e) {
        console.log("error loading ",e);
        }
    };

    
    const add = (restaurant) => {
        setToFavourites([...favourites,restaurant]);
    }

    const remove = (restaurant) => {
        const newFavourites = favourites.filter(
            (x) => x.placeId !== restaurant.placeId
        );

        setToFavourites(newFavourites);
    };

    useEffect(() => {
        if(user && user.uid) {
            loadFavorites(user.uid);
        }
    },[user]);

    useEffect(() => {  
        if(user && user.uid && favourites.length) {
            saveFavourites(favourites,user.uid);
        }
    },[favourites,user]);

    
    
    return(
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites:add,
                removeFromFavourites:remove
            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};
