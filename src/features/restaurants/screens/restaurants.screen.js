import React, {useContext, useState} from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
//components
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favorites/favourites-bar.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
//Context
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

//Styles
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantList } from "../components/restaurant-list.styles";

//Animations
import { FadeInView } from "../../../components/animations/fade.animation";

const LoadingContainer = styled.View`
  position: absolute;
  left: 50%;
  top: 50%;
`;

const Loading = styled(ActivityIndicator)`
  marginLeft: -25px;
`;


export const RestaurantsScreen = ({navigation}) => {
  const {isLoading, restaurants} = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  
  return(
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} color={Colors.red500}/>
        </LoadingContainer>
      )}
      <Search 
        isFavouritesToggled={isToggled}
        onFavouritesToggle= {() => setIsToggled(!isToggled)}
        />
      { isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => 
              navigation.navigate("RestaurantDetail", {
                restaurant: item,
              })}
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item}/>
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )
        }
        
        }
        keyExtractor={(item) => item.name}
        contentContainerStyle= {{padding: 16}}
      />
    </SafeArea>
  );
};
