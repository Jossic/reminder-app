// Librairies
import React from 'react';
import { AppModalStack } from './Navigators';
import { NavigationContainer } from '@react-navigation/native';

export const AppNavigator = () => {
	return (
		<NavigationContainer>
			<AppModalStack />
		</NavigationContainer>
	);
};
