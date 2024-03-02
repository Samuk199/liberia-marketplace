import React, { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "../components/ProductItem";
import { URL } from '../screens/Constants';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${URL}/products/`, {
        method: "GET"
      });

      if (response.ok) {
        const productList = await response.json();
        setProducts(productList);
      } else {
        throw new Error("Products not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Products",
      headerStyle: {
        backgroundColor: "#e6e6fa"
      },
      headerTitleAlign: "center"
    });

    fetchAllProducts();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {products?.map(product => (
          <Pressable key={product.id} onPress={() => navigation.navigate("detail-screen", { product }
          )}>
            <ProductItem
              title={product?.title}
              image_url={product?.image_url}
              description={product?.description}
              price={product?.price}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom:8,
    backgroundColor: "#e6e6fa"
  },
});

export default ProductListScreen;