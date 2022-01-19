// Librairies
import React from 'react';
import { AppModalStack } from './Navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import StartupScreen from '../screens/StartupScreen';

export const AppNavigator = () => {
	const didTryAutoLogin = useSelector((state) => state.didTryAutoLogin);
	return (
		<NavigationContainer>
			{didTryAutoLogin && <AppModalStack />}
			{!didTryAutoLogin && <StartupScreen />}
		</NavigationContainer>
	);
};
