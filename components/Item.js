import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useEffect } from 'react';
import { FlatList } from 'react-native-web';
import { TouchableHighlight } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

export default function Item(props) {

    const openUP=()=>{
        console.log(props.nav.navigate('About',props.el));
    }
    const fg=()=>{
        props.deleteItem(props.el);
        console.log(2);
    }
    const done=(e)=>{
        console.log(e.target.style.pointerEvents);
        e.target.style.pointerEvents='none';
        e.target.style.opacity='0.5'
    }

  return (
    <TouchableHighlight onPress={fg} onLongPress={done} style={styles.container}>
        <View style={styles.parentView}>
            <Text>{props.el.text}</Text>
            <Ionicons onPress={openUP} name="add-circle" size={36} color="black" />
        </View>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:'25px',
    paddingVertical:'10px',
    marginHorizontal:'10%',
    },
    parentView:{
        flex: 1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    }
});
