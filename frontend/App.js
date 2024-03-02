import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from './src/nagivations/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthContext from './src/features/context/authContext';
import ProductContext from './src/features/context/ProductContext';
import CartContext from './src/features/context/cartContext';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  return (
   <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, currentUser,setCurrentUser, token, setToken}}>
     <ProductContext.Provider value={{Products, setProducts, currentProduct, setCurrentProduct}} >
       <CartContext.Provider value={{cartItems, setCartItems}}>
           <NavigationContainer>
           <TabNavigator/>
           </NavigationContainer>
       </CartContext.Provider>
     </ProductContext.Provider>
   </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
