// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import globalReducer from './store/reducers/index';
import thunk from 'redux-thunk';

// Composants
import { AppNavigator } from './navigation/AppNavigator';

const store = createStore(globalReducer, applyMiddleware(thunk));

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
