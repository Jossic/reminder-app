// Librairies
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import globalReducer from './store/reducers/index';
import thunk from 'redux-thunk';

// Composants
import { AppNavigator } from './navigation/AppNavigator';

const store = createStore(globalReducer, applyMiddleware(thunk));

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true, // Faire apparaitre la notif meme quand on est sur l'app
		shouldPlaySound: false, // Jouer un son
		shouldSetBadge: false, // Badge si plusieurs notifs push
	}),
});

export default function App() {
	useEffect(() => {
		const getPermissions = async () => {
			const { status } = await Notifications.getPermissionsAsync();

			let finalStatus = status;

			if (status !== 'granted') {
				const { requestStatus } =
					await Notifications.requestPermissionsAsync();
				finalStatus = requestStatus;
			}
		};
		getPermissions();
	}, []);
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
