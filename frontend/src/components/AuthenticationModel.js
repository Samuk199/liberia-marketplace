import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, ToastAndroid, ScrollView, ActivityIndicator} from 'react-native';
import { URL } from '../screens/Constants';
import AuthContext from '../features/context/authContext';
import Apploader from './Apploader';

const AuthenticationModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState('Login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [delivery_address, setDeliveryAddress] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);



  const {setCurrentUser, isLoggedIn, setIsLoggedIn, setToken} = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      const emptyFieldsArray = [];
      if (!email) emptyFieldsArray.push('Email');
      if (!password) emptyFieldsArray.push('Password');
      setEmptyFields(emptyFieldsArray)
      ToastAndroid.show("Please enter both email and password", ToastAndroid.BOTTOM);
      return;
    }

    setLoading(true)

    try {
      res = await fetch(`${URL}/login`, {
      method: "POST",
      body: JSON.stringify({username: email, password}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    if (res.ok) {
      const resBody = await res.json()
      ToastAndroid.show("Login successful", ToastAndroid.BOTTOM);
      setModalVisible(false)
      setCurrentUser(resBody.user)
      setToken(resBody.access_token)
      setIsLoggedIn(true)
      setLoading(false)
    }else{
      setLoading(false)
      ToastAndroid.show("Login Failed", ToastAndroid.BOTTOM);
    }
  } catch (err) {
    setLoading(false)
    ToastAndroid.show("Can't login right now! Try again later", ToastAndroid.BOTTOM);
    console.log(err)
  }
  }

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !email || !password || !phone || !delivery_address || !role) {
      const emptyFieldsArray = [];
      if (!firstName) emptyFieldsArray.push('First Name');
      if (!lastName) emptyFieldsArray.push('Last Name');
      if (!username) emptyFieldsArray.push('Username');
      if (!email) emptyFieldsArray.push('Email');
      if (!password) emptyFieldsArray.push('Password');
      if (!phone) emptyFieldsArray.push('Phone');
      if (!delivery_address) emptyFieldsArray.push('Delivery Address');
      if (!role) emptyFieldsArray.push('Role');
      setEmptyFields(emptyFieldsArray);
      ToastAndroid.show("Please fill in all the required fields", ToastAndroid.BOTTOM);
      return;

    }
    try {
      data = {
        firstname: firstName,
        lastname: lastName,
        email,
        username,
        password,
        phone,
        role,
        delivery_address

      }
      res = await fetch(`${URL}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    if (res.ok) {
      ToastAndroid.show("Register successful", ToastAndroid.BOTTOM);
      setType('Login')
    } else {
      ToastAndroid.show("Registration Failed", ToastAndroid.BOTTOM);
    }
  } catch (err) {
    ToastAndroid.show("Can't register a user right now! Try again later", ToastAndroid.BOTTOM);
    console.log(err)
  }
  };

  useEffect(() => {

  }, [isLoggedIn, emptyFields]);

  const renderEmptyFields = () => {
    return emptyFields.map((field, index) => (
      <Text key={index} style={styles.warningText}>{field} is required!</Text>
    ));
  };
  return ( 
  
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {type === 'Login' ? (
  <TouchableOpacity style={styles.container}>
    <View style={styles.modalContent}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={[styles.input, emptyFields.includes('Email') && styles.inputError]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emptyFields.includes('Email') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter your email</Text>}
              
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={[styles.input, emptyFields.includes('Password') && styles.inputError]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {emptyFields.includes('Password') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter your password</Text>}
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="black" />}
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Not a user? </Text>
        <TouchableOpacity onPress={() => setType('Register')}>
          <Text style={styles.switchLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
          </TouchableOpacity>
        ) : (

          <ScrollView>
            
          <TouchableOpacity style={styles.container}>
            
            <View style={styles.modalContent}>
              
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('First Name') && styles.inputError]}
                value={firstName}
                onChangeText={setFirstName}
              />
              {emptyFields.includes('First Name') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter  your first name</Text>}
              
              
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('Last Name') && styles.inputError]}
                value={lastName}
                onChangeText={setLastName}
              />
              {emptyFields.includes('Last Name') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter  your last name</Text>}


              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('Username') && styles.inputError]}
                value={username}
                onChangeText={setUsername}
              />
              {emptyFields.includes('Username') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter username</Text>}

              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('Phone') && styles.inputError]}
                value={phone}
                onChangeText={setPhone}
              />
                {emptyFields.includes('Phone') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter your phone number</Text>}

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('Email') && styles.inputError]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              {emptyFields.includes('Email') && <Text style={[styles.errorText, { color: 'red' }] }>Please enter your email</Text>}


              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('Password') && styles.inputError]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
               {emptyFields.includes('Password') && <Text style={[styles.errorText, { color: 'red' }]}>Please enter your password</Text>}


              <Text style={styles.label}>Delivery Address:</Text>
              <TextInput
                style={[styles.input, emptyFields.includes('Delivery Address') && styles.inputError]}
                value={delivery_address}
                onChangeText={setDeliveryAddress}
              />
              {emptyFields.includes('Delivery Address') && <Text style={[styles.errorText, { color: 'red'}] }>Please enter your delivery address</Text>}


              <Text style={styles.label}>Role:</Text>
              <TextInput
                 style={[styles.input, emptyFields.includes('Role') && styles.inputError]}
                value={role}
                onChangeText={setRole}
              />
              {emptyFields.includes('Role') && <Text style={[styles.errorText, { color: 'red' }]}>Please  Select  your role</Text>}


              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Already a user? </Text>
                <TouchableOpacity onPress={() => setType('Login')}>
                  <Text style={styles.switchLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          </ScrollView> 
   

        )}
      </Modal>
    </View>
  
  );
};

export default AuthenticationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#e6e6fa',
    padding: 27,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    color: 'black',
  },
  switchLink: {
    fontWeight: 'bold',
    marginLeft: 4,
  },


  errorInput: {
    borderBottomColor: 'red',
    borderBottomWidth: 1
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});