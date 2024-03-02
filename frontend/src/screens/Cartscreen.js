  import { StyleSheet, Text, View , ScrollView, SafeAreaView, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
  import React, { useContext, useEffect, useState } from 'react'
  import CartContext from '../features/context/cartContext'  
  import AuthContext from '../features/context/authContext'
 import CartItems from '../components/cartItems'
 import { URL } from './Constants'
 import TotalSummaryCard from '../components/TotalSummaryCard'
import AuthenticationModal from '../components/AuthenticationModel'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


 const carts = ( cartItems, setCartItems, nagivation, token, isLoggedIn, setIsLoggedIn ) => {
  return (
  <>
  <View>
    <Text style={styles.heading}>My Cart</Text>
    <SafeAreaView>
     {cartItems?.map((item, key)=>
      <CartItems product={item} key={key} cartItems={cartItems} setCartItems={setCartItems} token={token} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
     )}
    </SafeAreaView>
  </View>
  <View>
    <TotalSummaryCard products={ cartItems } nagivation={nagivation} />
  </View>
  </>
  )
 }

  
  const Cartscreen = ({navigation}) => {
    const {token, isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const { cartItems, setCartItems } = useContext(CartContext)
    const [modalVisible, setModalVisible] = useState(false);

    const getCart = async () => {
      if (!isLoggedIn) return
      try {
        const res = await fetch(`${URL}/carts`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        if (res.ok) {
          const carts = await res.json()
          setCartItems(carts)
        } else if (res.status === 401) {
          setIsLoggedIn(false)
        } else {
          ToastAndroid.show("Unable to load data! Please check you internet connection", ToastAndroid.BOTTOM)
        }
      } catch (err) {
        ToastAndroid.show("An unknown error occurred! Please try again", ToastAndroid.BOTTOM)
        console.log(err)
      }
    }


    useEffect(()=>{
      navigation.setOptions({
      headerTitleAlign: "center",
      headerShown:false,
      headerStyle: {
      backgroundColor: "#e6e6fa"
      },
       })
      getCart()
    }, []);
     
    return (
      <ScrollView style={styles.container}>

        <View>
            <Pressable onPress={() => navigation.goBack()}> 
             <MaterialCommunityIcons  name ="arrow-left-bold-circle" size={35} color={'black'} style={styles.goodsIcon} />
            </Pressable>
          </View>
       { isLoggedIn ? carts(cartItems, setCartItems, navigation, token, isLoggedIn, setIsLoggedIn) : 
        <View style={styles.buttonContainer}>
          
          <Pressable onPress={()=>setModalVisible(!modalVisible)} style={styles.button}>
              <Text style={styles.buttonText}>Please Login to View Your Carts</Text>
          </Pressable>

          
        </View>
       }
       
       <View>
          <AuthenticationModal 
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
          />
        </View>
      </ScrollView>
    );
  };
  
  export default Cartscreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: "#e6e6fa",
      //marginTop:35,
      marginLeft: 5,
    },

    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    buttonContainer: {
      marginTop: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      padding: "5%"
    },
    button: {
      backgroundColor: 'black',
      width: '100%',
      paddingVertical: 12,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    goodsIcon: {
      alignItems: 'flex-start',
      marginTop: 40,
      marginLeft: 5,
    },
  });