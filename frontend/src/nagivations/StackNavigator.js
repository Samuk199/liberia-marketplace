import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import CartScreen from "../screens/Cartscreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductListScreen from "../screens/ProductListScreen";
import AddProduct from "../screens/AddProducts";




const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName="detail-Screen"
        screenOptions={{
          headerStyle:{
            backgroundColor:"#e6e6fa"
          },
          headerShown:false
        }}
    > 
      <Stack.Screen name="Home-screen" component={HomeScreen} />
      <Stack.Screen name="product-screen" component={ProductListScreen} />
      <Stack.Screen name="detail-screen" component={DetailScreen} />
      <Stack.Screen name="add-product" component={AddProduct} />
      <Stack.Screen name="payment-screen" component={PaymentScreen} />
    </Stack.Navigator>
  )
}


 const CartStackNavigator = () => {
    

    return(
        <Stack.Navigator>
        <Stack.Screen name="Cart-screen" component={CartScreen} />
      </Stack.Navigator>
    )
 }

 const PaymentStackNavigator = () => {
    return(
        <Stack.Navigator>
        <Stack.Screen name="Payment-screen" component={PaymentScreen} />
      </Stack.Navigator>
    )
 }

 

 const ProfileStackNavigator = () => {
    return(
        <Stack.Navigator>
        <Stack.Screen name="Profile-screen" component={ProfileScreen} />
      </Stack.Navigator>
    )
 }

 const AddProductStackNavigator = () => {
  return(
      <Stack.Navigator>
      <Stack.Screen name="Add-Product" component={AddProduct} />
    </Stack.Navigator>
  )
}
 

  export { MainStackNavigator, CartStackNavigator,PaymentStackNavigator, ProfileStackNavigator,AddProductStackNavigator}