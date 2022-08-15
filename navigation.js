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
            options={{title:'Главная',headerShown:'false'}}
            />
            <Stack.Screen name="About"
            component={About}
            options={{title:'About'}}
            />

        </Stack.Navigator>
    </NavigationContainer>
}
