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
import { Ionicons } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';

const ProjectScreen = ({ route, navigation }) => {
	const project = route.params.item;
	const notes = useSelector((state) => state.notes).filter(
		(note) => note.projectId === project.id
	);

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.close}
					onPress={() => navigation.goBack()}>
					<Ionicons name='arrow-back' size={23} color='white' />
				</TouchableOpacity>
				<Text style={styles.title}>{project.name}</Text>
				{notes[0] ? null : (
					<>
						<Image
							source={require('../assets/empty.png')}
							style={styles.image}
						/>
						<Text>Commecez par ajouter votre première note.</Text>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() =>
								navigation.navigate('addNote', { project })
							}>
							<LinearGradient
								colors={['#A996F2', '#8F79FC']}
								style={styles.addButton}>
								<Text style={styles.addButtonText}>
									Ajouter une note
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</>
				)}
			</SafeAreaView>
		</View>
	);
};

export default ProjectScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.secondary,
		paddingHorizontal: 25,
	},
	close: {
		backgroundColor: Colors.primary,
		height: 30,
		width: 30,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: Platform.OS === 'android' ? 50 : 0,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginVertical: 30,
	},
	image: {
		width: 350,
		height: 200,
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
});
