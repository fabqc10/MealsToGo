import React from "react";
import 'react-native-gesture-handler';
//Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

//components
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Navigation } from "./src/infrastructure/navigation";
//styles
import {
  useFonts as useOswalt,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
//theme
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
//context
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyB4ayTKO-a-E1ySr3jYD5NW8kgj_BWHEEg",
  authDomain: "mealstogo-ca88b.firebaseapp.com",
  projectId: "mealstogo-ca88b",
  storageBucket: "mealstogo-ca88b.appspot.com",
  messagingSenderId: "730274060017",
  appId: "1:730274060017:web:fb85a5b0c83fcac4903b50"
};

//Inizializing App
initializeApp(firebaseConfig);
export const auth = getAuth();


export default function App() {
  const [oswaldLoaded] = useOswalt({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  };

  
  return (
    <>
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
          <Navigation />
      </AuthenticationContextProvider>
    </ThemeProvider>
    <ExpoStatusBar style="auto" />
    </>
  );
};

{/* <>
<ThemeProvider theme={theme}>
  <AuthenticationContextProvider>
    <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <Navigation />
      </RestaurantsContextProvider>
    </LocationContextProvider>
    </FavouritesContextProvider>
  </AuthenticationContextProvider>
</ThemeProvider>
<ExpoStatusBar style="auto" />
</> */}
