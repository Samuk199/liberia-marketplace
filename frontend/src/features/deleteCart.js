import { ToastAndroid } from "react-native"
import { URL } from "../screens/Constants"

function deleteCart (productId, cartItems, setCartItems) {
    const carts = cartItems.filter((ele) => ele.id !== productId)
    setCartItems([...carts])
}

const deleteCardFromDB = async (cart_id, token, isLoggedIn, setIsLoggedIn) => {
    if (!isLoggedIn) {
        setIsLoggedIn(false)
        return
    }
    console.log(cart_id, "Product Id")
    try {
      const res = await fetch(`${URL}/carts/items/${cart_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.ok) {
        ToastAndroid.show("Cart remove successfully", ToastAndroid.BOTTOM)
      } else if (res.status === 401) {
        setIsLoggedIn(false)
      } else {
        console.log(res)
        ToastAndroid.show("Unable to remove this cart item! Please check you internet connection", ToastAndroid.BOTTOM)
      }
    } catch (err) {
      ToastAndroid.show("An unknown error occurred! Please try again", ToastAndroid.BOTTOM)
      console.log(err)
    }
}

async function handleDelete(event, productId, cartItems, setCartItems, token, isLoggedIn, setIsLoggedIn) {
    console.log(productId)
    deleteCart(productId, cartItems, setCartItems)
    deleteCardFromDB(productId, token, isLoggedIn, setIsLoggedIn)
}

export default handleDelete;