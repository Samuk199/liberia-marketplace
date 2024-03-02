import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, ScrollViewBase } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OfferCard from '../components/OfferCard';
import NewArrivalsCard from '../components/NewArrivalsCard';
import AuthenticationModal from '../components/AuthenticationModel';
import AuthContext from '../features/context/authContext';
import { getProducts,} from '../features/Product';
import ProductContext from '../features/context/ProductContext';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {isLoggedIn,currentUser} = useContext(AuthContext)
  const { Products, setProducts } = useContext(ProductContext);
  const [offerProduct, setOfferProduct] = useState(null);
  const [search, setSearch] = useState('')
  const [products, setproducts] = useState([])

const productSearch = async () => {
  const products = await getProducts()
  if (search.length > 1) {
    data = products.filter(({title}) => title.toLowerCase().includes(search.toLowerCase()))
    setProducts(data)
    setOfferProduct(selectOfferProduct(data))
  }
}

const fetchAllProducts = async () => {
  const result = await getProducts();
  setProducts(result);
  setproducts(result)
  setOfferProduct(selectOfferProduct(result))
}

const selectOfferProduct = (products) => {
  const idx = parseInt(Math.random() * products.length)
  if (idx <= products.length - 1) {
    return products[idx]
  }

  return {}
}
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAllProducts()
  }, [navigation]);


  return (
    <ScrollView>

  
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menuIcon}>
          <MaterialIcons name="menu" size={24} color="#111" />
        </View>
        {!isLoggedIn &&<View>
          <Pressable onPress={()=>setModalVisible(!modalVisible)}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View>}
      </View>
      <View style={styles.container}>
  <View style={styles.blueBorder}>
    <View>
      <Text style={styles.welcomeText}>
        Welcome {isLoggedIn ? <Text style={styles.fontBoldText}>{currentUser?.name}</Text> : "to Liberia MarketPlace"}
      </Text>
    </View>
  </View>
</View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Pressable onPress={productSearch}>
          <MaterialIcons name="shopping-search" size={25} color="#111" />
          </Pressable>
          <TextInput
            placeholder="Search for Products..."
            placeholderTextColor="black"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View>
          <Pressable onPress={()=> navigation.navigate("detail-screen", {
           product: offerProduct 
          })}>
            <OfferCard product={offerProduct } />
          </Pressable>
        </View>

        <View style={styles.newArrivalsContainer}>
          <View style={styles.newArrivalsHeader}>
            <Text style={styles.newArrivalsHeaderText}>New Arrivals</Text>
            <Pressable onPress={()=> navigation.navigate("product-screen")}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.newArrivalsScrollView} horizontal showsHorizontalScrollIndicator={false} key={Products?.length}>
          {products?.map(product =>
           <Pressable key={product.id} onPress={()=> navigation.navigate("detail-screen",{
              product
           })}>
           <NewArrivalsCard
             title={product?.title}
             image={product?.image_url}
             description={product?.description}
             price={product.price}
           />
         </Pressable>
          )}          
          </ScrollView>
        </View>
        <View>
          <AuthenticationModal 
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 40,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    paddingHorizontal: 13,
    marginLeft: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 1,
  },

searchContainer: {
    marginTop: 10,
    marginEnd: 10,
    marginLeft:4,
    marginRight:4,
    fontBoldText:"bold",
    paddingHorizontal: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,

  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#111',
  },
  newArrivalsContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  newArrivalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newArrivalsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  viewAllText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  newArrivalsScrollView: {
    marginTop: 4,
  },
});

export default HomeScreen;
