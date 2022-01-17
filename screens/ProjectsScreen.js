import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Colors from '../constants/Colors';

const ProjectsScreen = () => {
	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<Text style={styles.title}>Projets</Text>
				<View style={styles.emptyProject}>
					<Image
						source={require('../assets/folder.png')}
						style={styles.image}
					/>
					<Text>Commencez par créer votre premier projet.</Text>
					<TouchableOpacity activeOpacity={0.8}>
						<LinearGradient
							colors={['#A996F2', '#8F79FC']}
							style={styles.addButton}>
							<Text style={styles.addButtonText}>
								Créer un projet
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default ProjectsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.secondary,
		paddingHorizontal: 25,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 30,
		marginTop: Platform.OS === 'android' ? 50 : 30,
	},
	image: {
		width: 150,
		height: 150,
		marginBottom: 15,
	},
	addButton: {
		padding: 10,
		borderRadius: 5,
		marginTop: 30,
		alignItems: 'center',
	},
	addButtonText: {
		color: 'white',
		fontSize: 18,
	},
	emptyProject: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
