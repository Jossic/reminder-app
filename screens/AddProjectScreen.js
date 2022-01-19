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

const AddProjectScreen = ({ navigation }) => {
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
		const project = {
			name: data.name,
		};

		dispatch(globalActions.addProject(project, userId, token));
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<Text style={styles.title}>Ajouter un projet</Text>

				<View style={styles.inputContainer}>
					<Controller
						control={control}
						render={({ field: { value, onChange } }) => (
							<TextInput
								placeholder='Tapez quelque chose...'
								value={value}
								onChangeText={onChange}
								multiline={true}
								style={styles.input}
								autoFocus
							/>
						)}
						name='name'
						rules={{
							required: true,
						}}
					/>
				</View>

				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.submit}
					onPress={handleSubmit(onSubmit)}>
					<Text style={styles.submitText}>Créer</Text>
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

export default AddProjectScreen;

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
});
