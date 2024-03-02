import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput, Button, Image, ToastAndroid, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import productPlaceholder from '../../assets/productPlaceholder.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { URL } from './Constants';
import AuthContext from '../features/context/authContext';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"




const AddProducts = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image_url, setImage_url] = useState(null)
  const [condition, setCondition] = useState('')
  const [loading, setLoading] = useState(false)
  const { token, currentUser, setIsLoggedIn } = useContext(AuthContext)
  const [emptyFields, setEmptyFields] = useState([]);



  const uploadImage = async (uri) => {
    const form = new FormData()
    form.append("file", uri)
    try {
      const file = await FileSystem.uploadAsync(`${URL}/upload_image`, uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (file.status === 200) {
        const body = JSON.parse(file.body)
        setImage_url(body.image_url)
      } else if (res.status === 401) {
        setIsLoggedIn(false)
      } else {
        ToastAndroid.show("Product Image wasn't Uploaded! Please try selecting the image again", ToastAndroid.BOTTOM)
      }
    } catch (err) {
      ToastAndroid.show("wouldn't upload this image", ToastAndroid.BOTTOM)
      console.log(err)
    }
  }
  const selectImage = async () => {
		let result;
		const options = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1
		};
		result = await ImagePicker.launchImageLibraryAsync(options);
		if (!result.canceled) {
			const assets = result.assets[0]
      uploadImage(assets.uri)
		}
	};

  const postProduct = async () => {
    payload = {
      title,
      image_url,
      description,
      price,
      condition
    }
    setLoading(true)

    setEmptyFields([]);

    if (!title) {
      setEmptyFields((prevEmptyFields) => [...prevEmptyFields, 'title']);
    }
    if(!description){
      setEmptyFields((prevEmptyFields)=> [...prevEmptyFields, 'description']);
    }

    if (!price) {
      setEmptyFields((prevEmptyFields) => [...prevEmptyFields, 'price']);
    }

    if (!condition) {
      setEmptyFields((prevEmptyFields) => [...prevEmptyFields, 'condition']);
    }
    if (emptyFields.length > 0) {
      setLoading(false);
      return;
    }

    try {
      let res = await fetch(`${URL}/products/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.ok) {
        ToastAndroid.show("Product Added Successfully", ToastAndroid.BOTTOM)
        setLoading(false)
        navigation.navigate("Home-screen")
      } else if (res.status === 401) {
        setIsLoggedIn(false)
      } else {
        console.log(res)
        ToastAndroid.show("Couldn't add product! Try again", ToastAndroid.BOTTOM)
        setLoading(false)
      }
      
    } catch (err) {
      ToastAndroid.show("Can't add product now! Try again", ToastAndroid.BOTTOM)
      setLoading(false)
      console.log(err)
    }

  }
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    
    <View style={{
      width: "100%",
      height: "100%"
    }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>

          <SafeAreaView style={styles.container}>
            <View style={styles.modalContent}>
            <View>
              <Pressable onPress={() => navigation.goBack()}> 
               <MaterialCommunityIcons  name ="arrow-left-bold-circle" size={35 } color={'black'} style={styles.goodsIcon} />
              </Pressable>
             </View>
              <Image source={(image_url) ? {uri: `${URL}/img/${image_url}` } : productPlaceholder } style={styles.image} />
              <Button title="Select Product Image" onPress={() => selectImage()} />
              <Text style={styles.label}>Title:</Text>
              <TextInput
               style={[styles.input, emptyFields.includes('title') && styles.errorInput]}
                value={title}
                onChangeText={setTitle}
              />
               {emptyFields.includes('title') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter Title!</Text>}
              <Text style={styles.label}>Price$:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('price') && styles.errorInput]}
                value={price}
                onChangeText={setPrice}
                keyboardType='numeric'
              />
              {emptyFields.includes('price') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter Price!</Text>}
              <Text style={styles.label}>Condition:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('price ') && styles.errorInput]}
                value={condition}
                onChangeText={setCondition}
              />
              {emptyFields.includes('description') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter Condition!</Text>}
              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('description') && styles.errorInput]}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                height={50}
              />
              {emptyFields.includes('description') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter Description!</Text>}
              {loading && <Text>Saving Product Please Wait...</Text>}
              <Pressable style={styles.button} onPress={() => postProduct()}>
                <Text style={styles.buttonText}>Add Product</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </ScrollView>
    </View> 
  )

}

export default AddProducts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0,
  },
  modalContent: {
    width: '100%',
    height: "100%",
    backgroundColor: '#f3f6f4',
    padding: 25,
    margin: 0,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: "100%",
    height: "18%",
    padding: "1%",
    borderRadius: 5,
  },
  goodsIcon: {
    marginBottom:22,
    alignItems: 'flex-start',
    marginLeft: -8
  },
});