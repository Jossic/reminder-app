// Librairies
import React from 'react';
import {
	AppModalStack,
	AuthenticatorStackNavigator,
	StartupStackNavigator,
} from './Navigators';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export const AppNavigator = () => {
	const didTryAutoLogin = useSelector((state) => state.didTryAutoLogin);
	const isAuth = !!useSelector((state) => state.userId);
	return (
		<NavigationContainer>
			{didTryAutoLogin && !isAuth && <AuthenticatorStackNavigator />}
			{didTryAutoLogin && isAuth && <AppModalStack />}
			{!didTryAutoLogin && <StartupStackNavigator />}
		</NavigationContainer>
	);
};
