import { StyleSheet, Text, View, TextInput, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { Avatar, Button, Card, } from 'react-native-paper';
import { FontAwesome  } from '@expo/vector-icons';

const Product = () => {

    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPosts();
        return () => {}
    }, [])

    const fetchPosts = () => {
        const apiURL = "https://fakestoreapi.com/products";
        fetch(apiURL)
        .then((response) => response.json())
        .then((responseJson) => {
            setfilterData(responseJson);
            setmasterData(responseJson)
        }).catch((error) => {
            console.log(error);
        })
    }

    const ItemView = ({item}) => {
        return(
            <ScrollView style={{paddingVertical: 20}}>
                <View style={{backgroundColor: '#fff', elevation:10, shadowColor: '#888', marginBottom: 40, marginHorizontal: 20, borderRadius: 20, paddingTop: 10, borderWidth: 1, borderColor: '#ccc'}}>
                    <ImageBackground style={{width: '100%', height: 350}} source={{uri: item.image}} resizeMode='cover'></ImageBackground>
                    <View style={{padding: 20}}>
                        <View style={{backgroundColor: '#FFE0C4', width: 110, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                            <Text style={{textTransform: 'uppercase', fontWeight: '700', fontSize: 11,padding: 3, color: '#555'}}>{item.category}</Text>
                        </View>
                        <Text style={{fontSize: 20, color: '#333', fontWeight: 'bold'}}>{item.title}</Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20}}>
                            <FontAwesome name="star" size={20} color="#F49741" />
                            <Text style={{paddingLeft: 10, fontWeight: 600, color: '#555'}}>{item.rating.rate} ({item.rating.count})</Text>
                        </View>
                        <Text style={{fontSize: 13, color: '#555'}}>{item.description}</Text>
                        <TouchableOpacity activeOpacity={0.5} style={{backgroundColor: '#F49741', alignItems: 'center', justifyContent: 'center', marginTop: 35, borderRadius: 10, elevation: 5, shadowColor: '#888', marginBottom: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000', paddingVertical: 10}}>$ {item.price}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        );
    } 

    const SearchFilter = (text) => {
        if(text) {
            const newData = masterData.filter((item) => {
                const itemData = item.title
                                    ? item.title.toUpperCase() 
                                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterData(newData);
            setSearch(text);
        }
        else{
            setfilterData(masterData);
            setSearch(text);
        }
    }

    return (
        <View>
            <View style={{backgroundColor: '#F49741'}}>
                <TextInput 
                    style={{height: 50, borderWidth: 2, margin: 5, borderColor: '#ffff',marginHorizontal: 20, paddingLeft: 15, borderRadius: 50, marginVertical: 15,}}
                    placeholder='search'
                    placeholderTextColor='#fff'
                    value={search}
                    onChangeText={(text) => SearchFilter(text)}
                ></TextInput>
            </View>
            <View style={{padding: 10}}>
                <Text>Done By Vimal Kumar. V</Text>
                <Text>vimal923kumar@gmail.com</Text>
            </View>
            <FlatList 
                data={filterData}
                renderItem={ItemView}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
    );
}

export default Product;

const styles = StyleSheet.create({});