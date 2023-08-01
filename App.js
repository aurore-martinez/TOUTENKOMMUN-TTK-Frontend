import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from './screens/login/SignInScreen';
import SignUpScreen from './screens/login/SignUpScreen';
import CreateOrJoinScreen from './screens/community/CreateOrJoinScreen';
import JoinScreen from './screens/community/JoinScreen';
import CreateScreen from './screens/community/CreateScreen';
import ListAndMapScreen from './screens/borrow/ListAndMapScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ChatScreen from './screens/chat/ChatScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import users from './reducers/users';

const store = configureStore({
  reducer: { users },
});

/**
 * La liste des écrans de la tab "Communauté"
 * @returns void
 */
const CommunityStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="CreateOrJoin" component={CreateOrJoinScreen} />
			<Stack.Screen name="Join" component={JoinScreen} />
			<Stack.Screen name="Create" component={CreateScreen} />
		</Stack.Navigator>
	);
};

const TabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => {

				if (route.name === "Profil") {
					return <FontAwesome name="user" size={size} color={color} />
				} else if (route.name === "Prêt") {
					return <FontAwesome5 name="tools" size={size} color={color} />
				} else if (route.name === "Communauté") {
					return <FontAwesome name="group" size={size} color={color} />
				} else if (route.name === "Chat") {
					return <FontAwesome name="comments-o" size={size} color={color} />
				}
			},
			tabBarActiveTintColor: '#2196f3',
			tabBarInactiveTintColor: 'gray',
			headerShown: false,
		})}>
			<Tab.Screen name="Profil" component={ProfileScreen} />
			<Tab.Screen name="Prêt" component={ListAndMapScreen} />
			<Tab.Screen name="Communauté" component={CommunityStackNavigator} />
			<Tab.Screen name="Chat" component={ChatScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	const [fontsLoaded] = useFonts({
		'Tuffy-Regular': require('./assets/fonts/Tuffy-Regular.ttf'),
		'Tuffy-Bold': require('./assets/fonts/Tuffy-Bold.ttf'),
		'Tuffy-Italic': require('./assets/fonts/Tuffy-Italic.ttf')
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="SignIn" component={SignInScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="TabNavigator" component={TabNavigator} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}