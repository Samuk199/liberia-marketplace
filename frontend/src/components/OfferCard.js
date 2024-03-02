import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { URL } from '../screens/Constants';

const OfferCard = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.discountText}>{product?.title}</Text>
        <Text style={styles.priceText}>${product?.price}</Text>
      </View>
      <View>
        <Image source={{ uri: `${URL}/img/${product?.image_url}` }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: 370,
    paddingVertical: 2,
    marginRight: 10,
    maxHeight: 250,
    backgroundColor: '#e6e6fa',
    borderRadius: 10,
    marginEnd: 1,
    marginLeft: 1,
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 88,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 80,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#e6e6fa',
    backgroundColor: 'black',
    paddingLeft: 12,
  },
  image: {
    height: 238,
    width: 210,
    borderRadius: 15,
    borderColor:'black',
    marginTop: 2,
    marginHorizontal: 2,
    marginLeft: 12,
    marginRight: 1,
  },
});

export default OfferCard;