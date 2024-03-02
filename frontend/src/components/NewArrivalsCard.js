import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { URL } from '../screens/Constants';


const NewArrivalsCard = ({title,image,description,price}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: `${URL}/img/${image}`}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 150,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 12,
    height: 160,
    width: 145,
    margin:5,
  },
  textContainer: {
    marginTop: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 10,
  },
  price: {
    marginBottom:8,
    fontWeight: 'bold',
    fontSize:14,
  },
});

export default NewArrivalsCard;