import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
	Alert,
	FlatList,
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import * as globalActions from '../store/actions/index';

const ProjectsScreen = ({ navigation }) => {
	// Variables
	const projects = useSelector((state) => state.projects);
	const notes = useSelector((state) => state.notes);
	const dispatch = useDispatch();

	const onPressHandler = (projectId) => {
		Alert.alert('Que souhaitez-vous faire ?', undefined, [
			{ text: 'Annuler', style: 'cancel' },
			{
				text: 'Supprimer',
				style: 'destructive',
				onPress: () => {
					const projectsNotes = notes.filter(
						(note) => note.projectId === projectId
					);
					projectsNotes.forEach((note) => {
						dispatch(globalActions.deleteNote(note.id));
					});
					dispatch(globalActions.deleteProject(projectId));
				},
			},
		]);
	};
	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.constainerProject}>
					<Text style={styles.title}>Projets</Text>
					{projects[0] && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => navigation.navigate('addProject')}>
							<View style={styles.smallAddButton}>
								<Text style={styles.smallAddButtonText}>
									Ajouter
								</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>
				{!projects[0] ? (
					<View style={styles.emptyProject}>
						<Image
							source={require('../assets/folder.png')}
							style={styles.image}
						/>
						<Text>Commencez par créer votre premier projet.</Text>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => navigation.navigate('addProject')}>
							<LinearGradient
								colors={['#A996F2', '#8F79FC']}
								style={styles.addButton}>
								<Text style={styles.addButtonText}>
									Créer un projet
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				) : (
					<FlatList
						data={projects}
						renderItem={({ item }) => (
							<TouchableOpacity
								activeOpacity={0.8}
								onLongPress={() => onPressHandler(item.id)}
								onPress={() =>
									navigation.navigate('Project', { item })
								}>
								<View style={styles.project}>
									<Text style={styles.projectText}>
										{item.name}
									</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				)}
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
	project: {
		backgroundColor: Colors.primaryFaded,
		padding: 15,
		marginBottom: 15,
		borderRadius: 15,
	},
	projectText: {
		fontSize: 17,
	},
	constainerProject: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
		marginTop: Platform.OS === 'android' ? 50 : 30,
	},
	smallAddButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 30,
		width: 70,
		borderRadius: 15,
		backgroundColor: Colors.primary,
	},
	smallAddButtonText: {
		color: 'white',
	},
});
