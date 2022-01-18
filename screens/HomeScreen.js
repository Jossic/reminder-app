import React, { useEffect } from 'react';
import {
	FlatList,
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as globalActions from '../store/actions/index';
import Note from '../components/Note/Note';

const HomeScreen = ({ navigation }) => {
	const state = useSelector((state) => state);
	const { notes, projects } = state;
	const loadingNotes = useSelector((state) => state.loadingNotes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(globalActions.getNotes());
		dispatch(globalActions.getProjects());
	}, []);

	if (loadingNotes) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		);
	}

	// Variables
	const date = moment().format('LL');
	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView>
					<Text style={styles.date}>{date}</Text>
					<View style={styles.cards}>
						<LinearGradient
							colors={['#ED89AF', '#F45384']}
							style={styles.card}>
							<Text style={styles.cardNumber}>
								{notes.length}
							</Text>
							<Text style={styles.cardText}>Notes</Text>
						</LinearGradient>
						<LinearGradient
							colors={['#FED3A0', '#FFA63E']}
							style={styles.card}>
							<Text style={styles.cardNumber}>
								{projects.length}
							</Text>
							<Text style={styles.cardText}>Projets</Text>
						</LinearGradient>
					</View>
					<Text style={styles.title}>Notes ({notes.length})</Text>
					{!notes[0] ? (
						<>
							<Image
								source={require('../assets/empty.png')}
								style={styles.image}
							/>
							<Text>
								Commencez par créer votre premier projet pour
								ajouter votre première note par la suite.
							</Text>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() =>
									navigation.navigate('TabProjects')
								}>
								<LinearGradient
									colors={['#A996F2', '#8F79FC']}
									style={styles.addButton}>
									<Text style={styles.addButtonText}>
										Voir mes projets
									</Text>
								</LinearGradient>
							</TouchableOpacity>
						</>
					) : (
						<FlatList
							data={notes}
							renderItem={({ item }) => <Note item={item} />}
						/>
					)}
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.secondary,
		// alignItems: 'center',
		// justifyContent: 'center',
		paddingHorizontal: 25,
	},
	date: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 30,
		marginTop: Platform.OS === 'android' ? 50 : 30,
	},
	cards: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	card: {
		width: '47%',
		height: 150,
		padding: 15,
		marginTop: 15,
		borderRadius: 10,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	cardNumber: { fontSize: 50, color: 'white' },
	cardText: { color: 'white' },
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 45,
		marginBottom: 15,
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
