import React, { useContext, useState } from "react";
import { Pressable, View, Text, StyleSheet, Image, ScrollView, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/context/cartContext";
import { URL } from "./Constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AuthenticationModal from "../components/AuthenticationModel";
import AuthContext from "../features/context/authContext";


const DetailScreen = ({ navigation, route }) => {
  const product = route.params.product;
  const [qty,setQTY]=useState(1)
  const {cartItems, setCartItems}= useContext(CartContext)
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, setIsLoggedIn, token } = useContext(AuthContext)

const increment = ()=>{
  setQTY(qty + 1)
}

const decrement =() =>{
  if(qty>1){
    setQTY(qty - 1)
  }
  
}


const addItemToCart = async (product, qty) => {
  if (!isLoggedIn) {
    setModalVisible(!modalVisible)
    return
  }
 const data = {
  product_id: product.id,
  price: product.price,
  image_url: product.image_url,
  title: product.title,
  qty
 }
  try {
    let res = await fetch(`${URL}/carts/items`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      ToastAndroid.show("item added to cart!", ToastAndroid.BOTTOM)
      res = await fetch(`${URL}/carts`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.ok) {
        const carts = await res.json()
        setCartItems(carts)
      }
    } else if (res.status === 401) {
      setIsLoggedIn(false)
    } else {
      console.log(res)
      ToastAndroid.show("Unable to load data! Please check you internet connection", ToastAndroid.BOTTOM)
    }
  } catch (err) {
    
  }
}




  return (
    <SafeAreaView style={styles.container}>
      <View>
            <Pressable onPress={() => navigation.goBack()}> 
             <MaterialCommunityIcons  name ="arrow-left-bold-circle" size={35 } color={'black'} style={styles.goodsIcon} />
            </Pressable>
      </View>
      <View style={styles.header}>
        <Image source={{uri: `${URL}/img/${product?.image_url}`}} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.details}>
          <View>
            <Text style={styles.title}>{product?.title}</Text>
            <Text style={styles.subtitle}>{product?.condition}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Pressable 
              onPress={decrement}
            style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{qty}</Text>
            <Pressable 
            onPress={increment}
            style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <ScrollView style={styles.descriptionScrollView}>
            <Text style={styles.descriptionText}>
              {product?.description}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.cartPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total price</Text>
            <Text style={styles.totalPrice}>${product?.price}</Text>
          </View>

          <Pressable 
            onPress={() => addItemToCart(product, qty)}
          style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
      <View>
          <AuthenticationModal 
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
          />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6fa",
   
  },
  header: {
    marginBottom: 0,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 4,
    left: 3,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "black",
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 7,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 19,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 17,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    color: "black",
    fontSize: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "black",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  quantityText: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  descriptionContainer: {
    marginTop: 15,
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionScrollView: {
    height: 70,
    padding: 1,
  },
  descriptionText: {
    color: "black",
    fontSize: 15,
  },
  cartPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
  ,
  priceContainer: {
    marginTop: 1,
  },
  totalPriceText: {
    color: "black",
    fontSize:14,
    marginBottom: 4,
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: "black",
    paddingHorizontal: 23,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 1,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  goodsIcon: {
    marginBottom:12,
    alignItems: 'flex-start',
    marginLeft: 16
  },
});