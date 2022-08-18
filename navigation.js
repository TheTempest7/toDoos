import React from "react";
import Main from "./components/Main";
import About from "./components/About";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack=createStackNavigator();

export default function Navigate(){
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Main"
            component={Main}
            options={{headerShown:false,title:'Главная',}}
            />
            <Stack.Screen name="About"
            component={About}
            options={({route})=>({title:route.params.text,headerStyle:{backgroundColor:'blue'},headerTintColor:'#fff'})}
            />

        </Stack.Navigator>
    </NavigationContainer>
}
