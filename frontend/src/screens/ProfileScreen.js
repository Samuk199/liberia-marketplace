import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { ToastAndroid } from 'react-native';
import user from "../../assets/user.jpg";
import AuthContext from '../features/context/authContext';
import AuthenticationModal from '../components/AuthenticationModel';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const ProfileScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    setIsLoggedIn(false)
    ToastAndroid.show("Logged Out Successfully!", ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#e6e6fa"
      },
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
            <Pressable onPress={() => navigation.goBack()}> 
             <MaterialCommunityIcons  name ="arrow-left-bold-circle" size={35 } color={'black'} style={styles.goodsIcon} />
            </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.border}>
          <Image source={user} style={styles.image} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        {isLoggedIn ? (
          <View style={styles.centeredContainer}>
            <Text style={styles.name}>{currentUser?.name} </Text>
            <Text style={styles.email}>{currentUser?.email}</Text>
            <Text style={styles.phone}>{currentUser?.phone}</Text>
          </View>
        ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={()=>setModalVisible(!modalVisible)} style={styles.button}>
            <Text style={styles.buttonText}>Login to view your profile </Text>
          </Pressable>
        </View>
        )}
      </View>
      {isLoggedIn && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        </View>
      )}

        <View>
          <AuthenticationModal 
           modalVisible={modalVisible}
           setModalVisible={setModalVisible}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
    padding: 20,
    justifyContent: 'space-between',
    
  },
  imageContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 2,
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: '100%',
  },
  centeredContainer: {
    alignItems: 'center',
    fontSize: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 12,
    color: 'black',
    marginTop: 3,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  goodsIcon: {
    marginTop:25,
    alignItems: 'flex-start',
    marginLeft:-7,
  },
});

export default ProfileScreen  ;