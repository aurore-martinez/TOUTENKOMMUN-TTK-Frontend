import { Platform, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { login } from '../../reducers/users';
import { BACKEND_URL } from '../../Constants';
import Global, { Colors, ttkFont, btnRadius, btnPadding, iconPadding } from '../../styles/Global';

export default function SignUpScreenPart4({ route, navigation }) {
  // console.log('Route params', route.params);
  const [phone, setPhone] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const dispatch = useDispatch();

  /**
   * Fonction envoyant les inputs saisies au backend
   */

  const handleSignUp = async () => {
    const { city, email, firstname, lastname, latitude, longitude, password, street, username, zipCode } = route.params;

    const response = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstname, lastname, username, phone, address: { city, street, zipCode, latitude, longitude } })
    });

    const hasAccount = await response.json();
    if (hasAccount.result) {
      dispatch(login(hasAccount.token));
      navigation.navigate('TabNavigator', { screen: 'Communauté' });
    } else {
      console.log('Error', hasAccount.error);
    }
  };

  return (
    <SafeAreaView style={Global.container} >
      <View style={Global.title}>
        <Text style={Global.h1}>Toutenkommun</Text>
        <Text style={[Global.h5, { textAlign: 'center' }]}>Dernière étape !</Text>
      </View>

      <TouchableOpacity style={{ width: Dimensions.get('screen').width * 0.85, alignSelf: 'center', marginTop: 20 }} onPress={() => {
        setPhone(null);
        handleSignUp();
      }}>
        <Text style={{ textAlign: 'right', fontFamily: ttkFont, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.4)' }}>Passer</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 30, rowGap: 15, alignItems: 'center' }}>
        <View style={Global.inputWithIcon}>
          <FontAwesome style={{ padding: iconPadding }} name='phone' size={20} color='#353639' />
          <TextInput
            style={[{ width: '85%' }, Global.input]}
            placeholder='Téléphone'
            placeholderTextColor='#353639'
            autoCapitalize='none'
            autoComplete='tel'
            textContentType='telephoneNumber'
            value={phone}
            onChangeText={(value) => setPhone(value)} />
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity style={Global.filledButtonWithIcon} onPress={() => phone && handleSignUp()}>
          <FontAwesome name='thumbs-up' size={20} color='white' />
          <Text style={Global.textBtnWithIcon}>Terminer</Text>
        </TouchableOpacity>
      </View>

      <StatusBar barStyle='default' backgroundColor={Colors.ttkGreen} />
    </SafeAreaView>
  );
}