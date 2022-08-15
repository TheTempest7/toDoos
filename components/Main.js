import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState,useEffect } from 'react';
import { FlatList } from 'react-native-web';
import Item from './Item';
import Creater from './Creater';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main({navigation}) {
const [listOfItems,setlistOfItems]=useState([
    {text:'Купить',key:1},
    {text:'Стать',key:2},
    {text:'Заработать',key:3},
    {text:'Сходить',key:4},
]);


useEffect(()=>{
  const storeData= async ()=>{
    try{
      const str= await AsyncStorage.getItem('listOfItems');
      console.log(str);
    
      if(str===null){
        await AsyncStorage.setItem('listOfItems',JSON.stringify(listOfItems))
        console.log('empty');
      }
      else{
        console.log('not empty');
      }
    }
    catch(er){
      console.log(er);
    }
    }
    
    storeData();
},[])


const addItem=(text)=>{
    if(text){
        setlistOfItems((list)=>{
            return  [{text:text,key:Math.random().toString(36).substring(7)},
            ...list]
        })
        
    }

}
console.log(listOfItems);
const deleteItem=(el)=>{
  if(el.key){
    setlistOfItems(listOfItems.filter(item=>
      item.key!==el.key
    ))
  }
}


  return (
    <View style={styles.container}>
        <Creater addItem={addItem}/>
        <FlatList data={listOfItems} renderItem={({item})=>(
            <Item deleteItem={deleteItem} nav={navigation} el={item} />
        )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor:'blue',
  },
});
