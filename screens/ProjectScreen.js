import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
	FlatList,
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
import Note from '../components/Note/Note';
import Colors from '../constants/Colors';

const ProjectScreen = ({ route, navigation }) => {
	const project = route.params.item;
	const notes = useSelector((state) => state.notes).filter(
		(note) => note.projectId === project.id
	);

	// console.log(`project =>`, project);

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.close}
					onPress={() => navigation.goBack()}>
					<Ionicons name='arrow-back' size={23} color='white' />
				</TouchableOpacity>

				<FlatList
					data={notes}
					renderItem={({ item }) => <Note item={item} />}
					ListHeaderComponent={() => (
						<>
							<View style={styles.header}>
								<Image
									source={
										project.logo
											? { uri: project.logo }
											: require('../assets/default-logo.jpeg')
									}
									style={styles.logo}
								/>

								<Text style={styles.title}>{project.name}</Text>
							</View>
							{notes[0] ? (
								<TouchableOpacity
									activeOpacity={0.8}
									style={{ marginBottom: 30 }}
									onPress={() =>
										navigation.navigate('addNote', {
											project,
										})
									}>
									<View style={styles.smallAddButton}>
										<Text style={styles.smallAddButtonText}>
											Ajouter
										</Text>
									</View>
								</TouchableOpacity>
							) : (
								<>
									<Image
										source={require('../assets/empty.png')}
										style={styles.image}
									/>
									<Text>
										Commecez par ajouter votre première
										note.
									</Text>
									<TouchableOpacity
										activeOpacity={0.8}
										onPress={() =>
											navigation.navigate('addNote', {
												project,
											})
										}>
										<LinearGradient
											colors={Colors.linear}
											style={styles.addButton}>
											<Text style={styles.addButtonText}>
												Ajouter une note
											</Text>
										</LinearGradient>
									</TouchableOpacity>
								</>
							)}
						</>
					)}
				/>

				{/* {notes[0] ? (
					<>
						<TouchableOpacity
							activeOpacity={0.8}
							style={{ marginBottom: 30 }}
							onPress={() =>
								navigation.navigate('addNote', { project })
							}>
							<View style={styles.smallAddButton}>
								<Text style={styles.smallAddButtonText}>
									Ajouter
								</Text>
							</View>
						</TouchableOpacity>
						<FlatList
							data={notes}
							renderItem={({ item }) => <Note item={item} />}
						/>
					</>
				) : (
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
								colors={Colors.linear}
								style={styles.addButton}>
								<Text style={styles.addButtonText}>
									Ajouter une note
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</>
				)} */}
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
		marginTop: 15,
		color: 'white',
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
	smallAddButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 30,
		width: 140,
		borderRadius: 15,
		backgroundColor: Colors.primary,
		alignSelf: 'flex-end',
	},
	smallAddButtonText: {
		color: 'white',
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 50,
		alignSelf: 'center',
	},
	header: {
		backgroundColor: Colors.primary,
		marginTop: 15,
		borderRadius: 15,
		padding: 10,
		alignItems: 'center',
		marginBottom: 15,
	},
});
