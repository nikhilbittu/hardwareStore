import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../../../src/assets/colors/customColor';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleRegister = () => {
    auth()
      .createUserWithEmailAndPassword(userEmail, password)
      .then(() => {
        ToastAndroid.show('Sucessfully Registerd', ToastAndroid.SHORT);
        // navigation.navigate('LogIn');
        navigation.replace('LogIn');
      })
      .catch(error => {
        console.log(`errorcode : ${error.code} and error : ${error}`);
        ToastAndroid.show(`${error}`, ToastAndroid.LONG);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../src/assets/images/background.png')}>
        <View>
          <Text style={styles.heading}>Create Your Account</Text>
          <View style={styles.inputWrapper}>
            <Feather name="user" style={styles.iconStyle} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => setUserName(text)}
              value={username}
              placeholder="Enter Your Name"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="mail" style={styles.iconStyle} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => setuserEmail(text)}
              value={userEmail}
              keyboardType="email-address"
              placeholder="Enter Your  Email "
            />
          </View>
          <View style={styles.inputWrapper}>
            <Feather name="lock" style={styles.iconStyle} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Enter Your Password"
              secureTextEntry={isPasswordShow ? false : true}
            />
            <Feather
              name={isPasswordShow ? 'eye' : 'eye-off'}
              style={styles.iconStyle}
              onPress={() => setIsPasswordShow(!isPasswordShow)}
            />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => handleRegister()}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyles}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.accountWrapper}>
          <Text>Already have a account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.textButton}>LogIn</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'coral',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: customColor.white,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: customColor.blue,
    margin: 8,
  },
  inputs: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    // color: 'white',

    // borderWidth: 1,
    // borderColor: 'blue',
    // borderRadius: 5,
    // backgroundColor: 'white',
  },
  iconStyle: {
    fontSize: 25,
    marginHorizontal: 10,
    alignSelf: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    // borderColor: 'black',
    // borderWidth: 2,
    // backgroundColor: 'yellow',
    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    // justifyContent: 'center',
    // borderColor: '#000000', // black color
  },
  buttonStyles: {
    backgroundColor: customColor.primaryColor,
    height: 40,
    // padding: 5,
    // marginLeft: 20,
    borderRadius: 4,
    // borderWidth: 2,
    // borderColor: 'blue',
    paddingHorizontal: 20,
    marginHorizontal: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    // paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  accountWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textButton: {
    paddingLeft: 5,
    color: customColor.primaryColor,
  },
});

export default Register;
