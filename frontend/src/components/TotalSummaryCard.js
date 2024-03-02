import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import AuthContext from '../features/context/authContext';
import { URL } from '../screens/Constants';

const totalCost = ( products ) => {
    if (!products) return 0
    return products.reduce((prev, product) => prev += product.price * product.qty, 0).toFixed(2)
}


const TotalSummaryCard = ({ products, nagivation }) => {
  const {isLoggedIn, setIsLoggedIn, token} = useContext(AuthContext)

  const handleProceedToOrder = async () => {
    if (!products) {
      ToastAndroid.show("Shopping Cart is empty! Please add items", ToastAndroid.BOTTOM)
      return
    }
    if (!isLoggedIn) {
      setIsLoggedIn(false)
      return
    }
      try {
        const res = await fetch(`${URL}/orders`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        if (res.ok) {
          const order = await res.json()
          nagivation.navigate("payment-screen", {order})
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
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.boldText}>Total Price:</Text>
        <Text style={styles.extraBoldText}>$ {totalCost(products)} USD</Text>
      </View>
      <Pressable style={styles.button} onPress={() => handleProceedToOrder()}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </View>
  );
};

export default TotalSummaryCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginRight: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'left',
  },
  extraBoldText: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});