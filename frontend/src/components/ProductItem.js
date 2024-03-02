import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { URL } from '../screens/Constants';

const ProductItem = ({ image_url, title, description, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Image source={{ uri: `${URL}/img/${image_url}` }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6fa',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    //marginRight: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  details: {
    flex: 1,
    paddingLeft: 9,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  priceContainer: {
    marginTop: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});