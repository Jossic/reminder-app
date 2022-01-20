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
