import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useEffect } from 'react';
import { FlatList } from 'react-native-web';
import { TouchableHighlight } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

export default function About(props) {


console.log(props);
  return (
    <TouchableHighlight style={styles.container}>
        <View style={styles.parentView}>
            <Text> {props.route.params.text}</Text>
            
        </View>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    
});
