import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState,useEffect,useRef } from 'react';
import { FlatList } from 'react-native-web';
import { TouchableHighlight ,TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function About(props) {
const inputer=useRef();
const [text,setText]=useState();




const Uploader=async ()=>{
  const str= JSON.parse(await AsyncStorage.getItem('listOfItems'));
  let f=str.filter(item=> item.key===props.route.params.key);
  setText(f[0]['subtext']);
  console.log(f[0]['subtext']);
}


const Changer=(text)=>{
  console.log(props);
}
const Send=async()=>{
  setText(inputer.current.value);

  try{
    const str= JSON.parse(await AsyncStorage.getItem('listOfItems'));
    console.log(str);
    let str2=str.filter(item=> item.key!==props.route.params.key);
    let f=str.filter(item=> item.key===props.route.params.key);
    f[0].subtext=inputer.current.value;
    str2.unshift(f[0]);
    console.log(str2);  
    await AsyncStorage.setItem('listOfItems',JSON.stringify(str2));
    inputer.current.value='';
  }
  catch(er){
    console.log(er);
  }
    
}

const Dismiss=async ()=>{
  try{
    setText('')
    const str= JSON.parse(await AsyncStorage.getItem('listOfItems'));
    let f=str.filter(item=> item.key===props.route.params.key);
    delete f[0].subtext;
    console.log(f);
    console.log(str);
    await AsyncStorage.setItem('listOfItems',JSON.stringify(str));

  }
  catch(er){
    console.log(er);
  }

}


useEffect(()=>{
  Uploader();
},[])

console.log(props);
  return (
    <TouchableHighlight style={styles.container}>
        <View style={styles.parentView}>
            <Text> {props.route.params.text}</Text>
            <View>
                <TextInput  ref={inputer} style={styles.inputer} onChangeText={Changer} placeholder={'Введите уточнение'}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={Send}><Text>Уточнить задачу</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={Dismiss}><Text>Обнулить описание</Text></TouchableOpacity>
            <TouchableOpacity style={styles.window} ><Text>{text}</Text></TouchableOpacity>

        </View>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    window:{
      backgroundColor:'red',
      width:'80%',
      height:'50px',
      marginHorizontal:'auto',
      marginVertical:'0px'
    }
});
