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
import moment from 'moment';
import 'moment/locale/fr';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const HomeScreen = () => {
	// Variables
	const date = moment().format('LL');
	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<Text style={styles.date}>{date}</Text>
				<View style={styles.cards}>
					<LinearGradient
						colors={['#ED89AF', '#F45384']}
						style={styles.card}>
						<Text style={styles.cardNumber}>0</Text>
						<Text style={styles.cardText}>Notes</Text>
					</LinearGradient>
					<LinearGradient
						colors={['#FED3A0', '#FFA63E']}
						style={styles.card}>
						<Text style={styles.cardNumber}>0</Text>
						<Text style={styles.cardText}>Projets</Text>
					</LinearGradient>
				</View>
				<Text style={styles.title}>Notes (0)</Text>

				<Image
					source={require('../assets/empty.png')}
					style={styles.image}
				/>
				<Text>
					Commencez par créer votre premier projet pour ajouter votre
					première note par la suite.
				</Text>
				<TouchableOpacity activeOpacity={0.8}>
					<LinearGradient
						colors={['#A996F2', '#8F79FC']}
						style={styles.addButton}>
						<Text style={styles.addButtonText}>
							Voir mes projets
						</Text>
					</LinearGradient>
				</TouchableOpacity>
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
