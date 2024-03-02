import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import handleDelete from '../features/deleteCart';
import { URL } from '../screens/Constants';
import AuthContext from '../features/context/authContext';


const totalCost = ( product ) => {
  if (!product) return 0
  console.log(product, typeof product.price, typeof product.qty)
  return (product.price * product.qty).toFixed(2);
}


const CartItems = ({ product, cartItems, setCartItems, token, isLoggedIn, setIsLoggedIn }) => {
  return (
  <View style={{ flexDirection: "row" }}>
      <View style={{ padding: 8 }}>
        <Image source={{uri: `${URL}/img/${product?.image_url}`}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.boldText}>{product?.title}</Text>
          <Text style={styles.boldText}>qty: {product?.qty}</Text>
          <Text style={styles.boldText}>${totalCost(product)}</Text>
        </View>
        <View>
          <Pressable style={styles.button} onPress={(event) => handleDelete(event, product.id, cartItems, setCartItems, token, isLoggedIn, setIsLoggedIn)}>
            <MaterialIcons name='delete-outline' size={17} />
            <Text>Remove</Text>
          </Pressable>
        </View>
        </View>
      </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: 80,
    height: 80,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#a2a2a2",
    padding: 5,
    borderRadius: 4,
  },
});