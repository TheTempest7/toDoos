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

const [fromStore,setFromStore]=useState();


useEffect(()=>{
  const storeData= async ()=>{
    try{/* await AsyncStorage.setItem('listOfItems',JSON.stringify(listOfItems));*/
      const str= await AsyncStorage.getItem('listOfItems');
      console.log(JSON.parse(str));
    
      if(str===null){
        await AsyncStorage.setItem('listOfItems',JSON.stringify(listOfItems));
        setFromStore(listOfItems)
        /*console.log('empty');*/
      }
      else{
        /*console.log('not empty');*/
        setFromStore(JSON.parse(str));
      }
    }
    catch(er){
      console.log(er);
    }
    }
    
    storeData();

},[])


const addItem=async (text)=>{
    if(text){
      try{
        let str= await AsyncStorage.getItem('listOfItems');
        str=JSON.parse(str);
        str.unshift({text:text,key:Math.random().toString(36).substring(7)});
        await AsyncStorage.setItem('listOfItems',JSON.stringify(str));
        setFromStore(str);
      }
      catch(er){
        console.log(er);
      }
      
        /*setlistOfItems((list)=>{
            return  [{text:text,key:Math.random().toString(36).substring(7)},
            ...list]
        })*/
        
    }

}



const deleteItem=async (el)=>{
  if(el.key){
    try{
      let str= await AsyncStorage.getItem('listOfItems');
      str=JSON.parse(str);
      console.log(str);
      console.log(el);
      let str2=str.filter(item=> item.key!==el.key);
      console.log(str2);
      await AsyncStorage.setItem('listOfItems',JSON.stringify(str2));
      setFromStore(str2);

      
    }
    catch(er){
      console.log(er);
    }
    /*setlistOfItems(listOfItems.filter(item=>
      item.key!==el.key
    ))*/
  }
}


  return (
    <View style={styles.container}>
        <Creater addItem={addItem}/>
        <FlatList data={fromStore}  renderItem={({item})=>(
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
