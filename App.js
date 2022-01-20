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

			// const message = {
			// 	to: 'ExponentPushToken[TW9iZjDtHeGSGuU1yXiZc4]',
			// 	title: 'Ma notification',
			// 	body: 'Message de la notif',
			// };

			// await fetch('https://exp.host/--/api/v2/push/send', {
			// 	method: 'post',
			// 	headers: {
			// 		Accept: 'application/json',
			// 		'Accept-encoding': 'gzip, deflate',
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify(message),
			// });
		};
		getPermissions();
	}, []);
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
