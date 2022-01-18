import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Colors from '../constants/Colors';

const AuthenticationScreen = ({ navigation }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(`data =>`, data);
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container2}>
					<Text style={styles.title}>Reminder</Text>
					<Text style={styles.slogan}>Stockez toutes vos idées</Text>

					<View style={[styles.form, { marginTop: 50 }]}>
						<Text style={styles.label}>Mail</Text>
						<View style={[styles.inputContainer]}>
							<Controller
								control={control}
								render={({ field: { value, onChange } }) => (
									<TextInput
										placeholder='Email...'
										keyboardType='email-address'
										value={value}
										onChangeText={onChange}
										style={styles.input}
										autoFocus
										autoCorrect={false}
										autoCapitalize={false}
									/>
								)}
								name='email'
								rules={{
									required: true,
								}}
							/>
						</View>
						<Text style={{ ...styles.label, marginTop: 15 }}>
							Password
						</Text>
						<View style={styles.inputContainer}>
							<Controller
								control={control}
								render={({ field: { value, onChange } }) => (
									<TextInput
										placeholder='Password...'
										value={value}
										onChangeText={onChange}
										style={styles.input}
										secureTextEntry={true}
									/>
								)}
								name='password'
								rules={{
									required: true,
								}}
							/>
						</View>
					</View>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.submit}
						onPress={handleSubmit(onSubmit)}>
						<Text style={styles.submitText}>Créer un compte</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
		paddingHorizontal: 25,
	},
	container2: {
		flex: 1,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 25,
	},
	title: {
		fontSize: 30,
		textTransform: 'uppercase',
		color: 'white',
		fontWeight: 'bold',
	},
	slogan: {
		color: 'white',
		paddingHorizontal: 15,
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
		width: Dimensions.get('window').width * 0.7,
	},
	input: {
		maxHeight: 150,
		fontSize: 16,
	},
	submitText: {
		color: Colors.primary,
		fontSize: 17,
	},
	submit: {
		backgroundColor: Colors.secondary,
		padding: 10,
		width: 200,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 30,
		borderRadius: 10,
	},
	form: {
		marginTop: 30,
		padding: 30,
		backgroundColor: '#95a5a6',
		borderRadius: 5,
	},
	label: {
		marginBottom: 5,
		color: Colors.primary,
	},
});
