import React from 'react';
import {
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from 'react-native-vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as globalActions from '../store/actions/index';

const AddNoteScreen = ({ navigation, route }) => {
	const project = route.params.project;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const userId = useSelector((state) => state.userId);
	const token = useSelector((state) => state.token);

	// Fonction
	const onSubmit = (data) => {
		console.log(`data =>`, data);
		const note = {
			content: data.name,
			createdAt: new Date(),
			projectId: project.id,
		};

		dispatch(globalActions.addNote(note, userId, token));
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<Text style={styles.title}>Ajouter une note</Text>
				<View style={styles.inputContainer}>
					<Text style={styles.projectName}>{project.name}</Text>
					<Controller
						render={({ field: { onChange, value } }) => (
							<TextInput
								placeholder='Tapez quelque chose...'
								style={styles.input}
								value={value}
								onChangeText={onChange}
								multiline
								autoFocus
							/>
						)}
						name='name'
						control={control}
						rules={{ required: true }}
					/>
				</View>

				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.submit}
					onPress={handleSubmit(onSubmit)}>
					<Text style={styles.submitText}>Ajouter</Text>
					<Ionicons name='arrow-forward' size={23} color='white' />
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.close}
					onPress={() => navigation.goBack()}>
					<Ionicons name='close' size={23} color='white' />
				</TouchableOpacity>
			</SafeAreaView>
		</View>
	);
};

export default AddNoteScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primaryFaded,
		paddingHorizontal: 25,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginVertical: 30,
		alignSelf: 'center',
		marginTop: Platform.OS === 'android' ? 50 : 30,
	},
	close: {
		backgroundColor: Colors.primary,
		height: 50,
		width: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		position: 'absolute',
		bottom: 50,
	},
	inputContainer: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	input: {
		maxHeight: 150,
		fontSize: 16,
	},
	submitText: {
		color: 'white',
		fontSize: 17,
	},
	submit: {
		backgroundColor: Colors.primary,
		padding: 10,
		width: 130,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		alignSelf: 'center',
		marginTop: 30,
		borderRadius: 10,
	},
	projectName: {
		fontWeight: 'bold',
		color: Colors.primary,
	},
});
