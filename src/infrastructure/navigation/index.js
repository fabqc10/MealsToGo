import React, {useContext} from "react";
import { AppNavigator } from "./app.navigation";
import { NavigationContainer } from "@react-navigation/native";
import { AccountNavigator } from "./account.navigator";

//context
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
    const {isAuthenticated } = useContext(AuthenticationContext);

    return  (
        <NavigationContainer >
            {isAuthenticated ? (
                <AppNavigator />
            ) : (
                <AccountNavigator/>
            )
             }
        </NavigationContainer>  
    );   
};
