// Librairies
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons';
import Colors from '../constants/Colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import AddProjectScreen from '../screens/AddProjectScreen';
import ProjectScreen from '../screens/ProjectScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';

// Modal navigator
const ModalStack = createStackNavigator();

export const AppModalStack = () => {
	return (
		<ModalStack.Navigator mode='modal'>
			<ModalStack.Screen
				name='Authentication'
				component={AuthenticationScreen}
				options={{ headerShown: false }}
			/>
			<ModalStack.Screen
				name='Home'
				component={AppTab}
				options={{ headerShown: false }}
			/>
			<ModalStack.Screen
				name='addNote'
				component={AddNoteScreen}
				options={{ headerShown: false }}
			/>
			<ModalStack.Screen
				name='addProject'
				component={AddProjectScreen}
				options={{ headerShown: false }}
			/>
		</ModalStack.Navigator>
	);
};

// Bottom tab navigator
const Tab = createBottomTabNavigator();

const AppTab = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'TabHome') {
						iconName = focused ? 'albums' : 'albums-outline';
					} else if (route.name === 'TabProjects') {
						iconName = focused ? 'bookmarks' : 'bookmarks-outline';
					}

					return (
						<Ionicons name={iconName} color={color} size={size} />
					);
				},
			})}
			tabBarOptions={{ activeTintColor: Colors.primary }}>
			<Tab.Screen
				name='TabHome'
				component={HomeScreen}
				options={{ title: 'Notes' }}
			/>
			<Tab.Screen
				name='TabProjects'
				component={AppProjectsStack}
				options={{ title: 'Projets' }}
			/>
		</Tab.Navigator>
	);
};

// Project stack navigator
const ProjectsStack = createStackNavigator();

const AppProjectsStack = () => {
	return (
		<ProjectsStack.Navigator>
			<ProjectsStack.Screen
				name='Projects'
				component={ProjectsScreen}
				options={{ headerShown: false }}
			/>
			<ProjectsStack.Screen
				name='Project'
				component={ProjectScreen}
				options={{ headerShown: false }}
			/>
		</ProjectsStack.Navigator>
	);
};
