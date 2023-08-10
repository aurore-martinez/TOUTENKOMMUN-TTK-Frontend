import { Platform, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { login } from '../../reducers/users';
import { BACKEND_URL } from '../../Constants';
import Global, { Colors, ttkFont, btnRadius, btnPadding, iconPadding } from '../../styles/Global';

export default function SignUpScreenPart3({ route, navigation }) {
	const [adresse, setAdresse] = useState(null);
	const [ville, setVille] = useState(null);
	const [codePostal, setCodePostal] = useState(null);
	const [apiAdresse, setApiAdresse] = useState(null);

	/**
	 * Fonction envoyant les inputs saisies au backend
	 */

	const handleNavigate = () => {
    navigation.navigate('SignUpPart4', { ...route.params, ...apiAdresse });
  };

	const fetchApiGouv = async () => {
		let adresseString = [adresse.trim(), ville.trim(), codePostal.trim()];
		adresseString = adresseString.join(' ').replace(/\s/g, '+');
		console.log(adresseString);

		const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresseString}`);
		const localisation = await response.json();
		console.log("loc found", JSON.stringify(localisation.features[0]));

		setApiAdresse({
			longitude: localisation.features[0].geometry.coordinates[0],
			latitude: localisation.features[0].geometry.coordinates[1],
			street: localisation.features[0].properties.name,
			city: localisation.features[0].properties.city,
			zipCode: localisation.features[0].properties.postcode
		});
	};

	return (
		<SafeAreaView style={Global.container} >
			<View style={Global.title}>
				<Text style={Global.h1}>Toutenkommun</Text>
				<Text style={[Global.h5, { textAlign: 'center' }]}>On va avoir besoin de votre adresse !</Text>
			</View>

			<View style={{ marginTop: 20, rowGap: 15, alignItems: 'center' }}>
				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='home' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Adresse'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						autoComplete='address-line1'
						textContentType='fullStreetAddress'
						value={adresse}
						onChangeText={(value) => setAdresse(value)} />
				</View>

				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='home' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Ville'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						autoComplete='postal-address-region'
						value={ville}
						onChangeText={(value) => setVille(value)} />
				</View>

				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='home' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Code Postal'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						autoComplete='postal-code'
						textContentType='postalCode'
						keyboardType='numeric'
						value={codePostal}
						onChangeText={(value) => setCodePostal(value)} />
				</View>

				{apiAdresse && (
          <View style={{ width: Dimensions.get('screen').width * 0.85 }}>
            <Text>Adresse trouvée :</Text>
            <Text>Rue : {apiAdresse.street}</Text>
            <Text>Ville : {apiAdresse.city}</Text>
            <Text>Code postal : {apiAdresse.zipCode}</Text>
          </View>
				)}
			</View>

			<View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
				<TouchableOpacity style={[Global.filledButtonWithIcon, { backgroundColor: '#CE8D2C', borderColor: '#CE8D2C' }]} onPress={fetchApiGouv}>
					<FontAwesome name='refresh' size={20} color='white' />
					<Text style={Global.textBtnWithIcon}>Chercher une adresse</Text>
				</TouchableOpacity>

				{apiAdresse && (
					<TouchableOpacity style={Global.filledButtonWithIcon} onPress={handleNavigate}>
						<FontAwesome name='hand-o-right' size={20} color='white' />
						<Text style={Global.textBtnWithIcon}>Continuer</Text>
					</TouchableOpacity>
				)}
			</View>

			<StatusBar barStyle='default' backgroundColor={Colors.ttkGreen} />
		</SafeAreaView>
	);
}
