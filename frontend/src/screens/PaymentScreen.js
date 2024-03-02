import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native';
import orangemoney from "../../assets/orangemoney.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const PaymentScreen = ({ navigation, route }) => {
  const [inputNumber, setInputNumber] = useState('');
  const orderInfo = route.params?.order
  console.log(orderInfo, "Order")

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: "Payment",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#e6e6fa"
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
            <Pressable onPress={() => navigation.goBack()}> 
             <MaterialCommunityIcons  name ="arrow-left-bold-circle" size={35 } color={'black'} style={styles.goodsIcon} />
            </Pressable>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderText}>Order Tracking ID: {orderInfo?.id}</Text>
        <Text style={styles.orderText}>Total Price: ${orderInfo?.total_price} USD</Text>
        <Text style={styles.orderText}>Payment Status: {orderInfo?.payment_status}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Pay in Person with OrangeMoney</Text>
        <Image source={orangemoney} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6fa",
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 4,
    textAlign: "center",
  },
  image: {
    width: 260,
    height: 130,
    resizeMode: 'contain',
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 2,
    padding:12,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 5,
    paddingLeft: 10,
  },
  goodsIcon: {
    marginTop:40,
    alignItems: 'flex-start',
    marginLeft:15,
  },
  orderContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6fa',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginTop: 100,
  },
  orderText: {
    fontWeight: 'bold',
    color: '#333333',
    marginTop:14,
    marginBottom: 10,
  },
});

export default PaymentScreen;