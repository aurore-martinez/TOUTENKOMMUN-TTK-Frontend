import { SafeAreaView, StatusBar, TouchableOpacity, Text, View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import Global, { Colors, iconPadding } from '../../styles/Global';

export default function SignUpScreenPart2({ route, navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState(false);

	const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const handleNavigate = () => {
		if (email && EMAIL_REGEX.test(email) && password) {
			navigation.navigate('SignUpPart3', { ...route.params, email, password });
		} else {
			setEmailError(true);
		}
	};

	return (
		<SafeAreaView style={Global.container} >

			<View style={Global.title}>
				<Text style={Global.h1}>Toutenkommun</Text>
				<Text style={[Global.h5, { textAlign: 'center' }]}>Maintenant, c'est adresse mail et mot de passe !</Text>
			</View>

			<View style={{ marginTop: 20, rowGap: 15, alignItems: 'center' }}>
				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='at' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Email'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						keyboardType="email-address"
						textContentType="emailAddress"
						autoComplete="email"
						inputMode='email'
						value={email}
						onChangeText={(value) => { setEmail(value.trim()); setEmailError(false); }}
						onBlur={() => !EMAIL_REGEX.test(email) && setEmailError(true)}/>
				</View>

				{emailError && <Text style={{ color: 'red', fontStyle: 'italic' }}>Adresse email invalide</Text>}

				<View style={Global.inputWithIcon}>
					<FontAwesome name='lock' size={20} color='#353639' style={{ padding: iconPadding }} />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder="Mot de passe"
						autoCapitalize="none"
						textContentType="password"
						autoComplete="new-password"
						secureTextEntry={true}
						onChangeText={(value) => setPassword(value.trim())}
						value={password}
						placeholderTextColor='#353639'
					/>
				</View>
			</View>

			<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
				<TouchableOpacity style={Global.filledButtonWithIcon} onPress={handleNavigate}>
					<FontAwesome name='hand-o-right' size={20} color='white' />
					<Text style={Global.textBtnWithIcon}>Continuer</Text>
				</TouchableOpacity>
			</View>

			<StatusBar barStyle='default' backgroundColor={Colors.ttkGreen} />
		</SafeAreaView>
	);
}