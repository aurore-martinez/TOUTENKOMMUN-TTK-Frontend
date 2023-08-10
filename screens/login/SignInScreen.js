import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, TextInput, Dimensions, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BACKEND_URL } from '../../Constants';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/users';
import Global, { Colors, ttkFont, btnRadius, btnPadding, iconPadding } from '../../styles/Global';

export default function SignInScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(false);

	const dispatch = useDispatch();

	/**
	 * Fonction envoyant le pseudo et le mot de passe au backend
	 */
	const handleSignIn = async () => {
		if (email !== '' && password !== '') {
			const response = await fetch(`${BACKEND_URL}/users/signin`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const hasAccount = await response.json();
			if (hasAccount.result) {
				setEmail('');
				setPassword('');
				dispatch(login(hasAccount.token));
				navigation.navigate('TabNavigator', { screen: 'Prêt' });
			} else {
				console.log('Error', hasAccount.error);
				setEmailError(true);
			}
		}
	};

	return (
		<SafeAreaView style={Global.container}>
			<View style={Global.title}>
				<Text style={Global.h1}>Toutenkommun</Text>
				<Text style={Global.h5}>Connectes-toi et partage !</Text>
			</View>

			<View style={Global.buttonsContainers}>
				<TouchableOpacity style={[Global.btnRes, { backgroundColor: '#3B5998' }]} activeOpacity={0.8}>
					<FontAwesome name='facebook' size={20} color='#F8FCFB' />
					<Text style={Global.textBtnWithIcon}>Facebook</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[Global.btnRes, { backgroundColor: '#DE4B39' }]} activeOpacity={0.8}>
					<FontAwesome name='google' size={20} color='#F8FCFB' />
					<Text style={Global.textBtnWithIcon}>Google</Text>
				</TouchableOpacity>
			</View>

			<View style={{ rowGap: 30, alignItems: 'center' }}>
				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='user' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Email'
						placeholderTextColor='#353639'
						autoCapitalize='none'
						inputMode='email'
						value={email}
						onChangeText={(e) => setEmail(e.trim())} />
				</View>

				<View style={Global.inputWithIcon}>
					<FontAwesome style={{ padding: iconPadding }} name='lock' size={20} color='#353639' />
					<TextInput
						style={[{ width: '85%' }, Global.input]}
						placeholder='Mot de passe'
						placeholderTextColor='#353639'
						value={password}
						secureTextEntry={true}
						onChangeText={(e) => setPassword(e.trim())} />
				</View>

				<TouchableOpacity style={Global.filledButtonWithIcon} onPress={handleSignIn}>
					<FontAwesome name='hand-o-right' size={20} color='white' />
					<Text style={Global.textBtnWithIcon}>Valider</Text>
				</TouchableOpacity>
			</View>

			<View style={{ alignItems: 'center', rowGap: 20 }}>
				<View style={styles.bar} />
				<View style={styles.createContent}>
					<Text style={Global.h5}>Pas encore sur Toutenkommun ?</Text>
					<Text style={Global.h5}>Crée un compte et rejoins-nous !</Text>
				</View>

				<TouchableOpacity style={Global.outlinedButtonWithIcon} onPress={() => navigation.navigate('SignUp')}>
					<FontAwesome name='user-plus' size={20} color={Colors.ttkGreen} />
					<Text style={[Global.textBtnWithIcon, { color: Colors.ttkGreen }]}>Créer un compte</Text>
				</TouchableOpacity>
			</View>

			<StatusBar barStyle='default' backgroundColor={Colors.ttkGreen} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#F8FCFB',
		fontFamily: 'Tuffy-Regular'
	},
	h1: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#353639',
	},
	h5: {
		fontSize: 20,
		color: '#353639',
	},
	btnConnect: {
		height: '15%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	textBtnWithIcon: {
		color: 'white',
		fontSize: 20,
		fontFamily: ttkFont,
		fontWeight: 'bold',
		paddingLeft: 10
	},
	inputContent: {
		height: '25%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	userContent: {
		flexDirection: 'row',
		height: '30%',
		width: '87%',
		borderWidth: 2,
		borderColor: '#198EA5',
		borderRadius: 10,
		paddingLeft: '5%',
		alignItems: 'center'
	},
	mdpContent: {
		flexDirection: 'row',
		height: '30%',
		width: '87%',
		borderWidth: 2,
		borderColor: '#198EA5',
		borderRadius: 10,
		paddingLeft: '5%',
		alignItems: 'center'
	},
	handIcon: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		marginRight: 10
	},
	btnTextValidate: {
		color: 'white',
		fontSize: 20,
		fontFamily: ttkFont,
		fontWeight: 'bold',
		marginRight: 16
	},
	bar: {
		borderBottomColor: Colors.ttkGreen,
		borderBottomWidth: 2,
		width: Dimensions.get('screen').width * 0.85,
		marginTop: 40,
	},
	createContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnCreateContent: {
		height: '15%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTextCreate: {
		color: '#198EA5',
		fontSize: 20,
		fontWeight: 'bold'
	},
	error: {
		color: 'red',
	},
});