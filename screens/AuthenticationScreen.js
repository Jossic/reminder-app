import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Colors from '../constants/Colors';

// Redux
import { useDispatch } from 'react-redux';
import * as globalActions from '../store/actions/index';

const AuthenticationScreen = ({ navigation }) => {
	const [loginMode, setLoginMode] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		console.log(`data =>`, data);
		const { email, password } = data;
		if (loginMode) {
			// Connexion
		} else {
			// Inscription
			dispatch(globalActions.signup(email, password));
		}

		// userId
		// token
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
			<View style={styles.container}>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.container2}>
						<Text style={styles.title}>Reminder</Text>
						<Text style={styles.slogan}>
							Stockez toutes vos idées
						</Text>

						<View style={[styles.form, { marginTop: 50 }]}>
							<Text style={styles.label}>Mail</Text>
							<View style={[styles.inputContainer]}>
								<Controller
									control={control}
									render={({
										field: { value, onChange },
									}) => (
										<TextInput
											placeholder='Email...'
											keyboardType='email-address'
											value={value}
											onChangeText={onChange}
											style={styles.input}
											autoFocus
											autoCorrect={false}
										/>
									)}
									name='email'
									rules={{
										required: {
											value: true,
											message:
												'Merci de renseigner votre mail',
										},
										pattern: {
											value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message:
												'Merci de renseigner un mail valide',
										},
									}}
								/>
							</View>
							{errors.email && (
								<Text style={styles.error}>
									{errors.email.message}
								</Text>
							)}
							<Text style={{ ...styles.label, marginTop: 15 }}>
								Password
							</Text>
							<View style={styles.inputContainer}>
								<Controller
									control={control}
									render={({
										field: { value, onChange },
									}) => (
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
										required: {
											value: true,
											message:
												'Merci de renseigner votre password',
										},
										minLength: {
											value: 6,
											message:
												'Le password doit comporter mini 6 caractères',
										},
									}}
								/>
							</View>
							{errors.password && (
								<Text style={styles.error}>
									{errors.password.message}
								</Text>
							)}
						</View>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.submit}
							onPress={handleSubmit(onSubmit)}>
							<Text style={styles.submitText}>
								{loginMode ? 'Se connecter' : 'Créer un compte'}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							activeOpacity={0.8}
							// style={styles.submit}
							onPress={() => setLoginMode(!loginMode)}>
							<Text style={styles.switchButton}>
								{!loginMode
									? 'Déja un compte ? Se connecter'
									: 'Pas de compte ? Créer un compte'}
							</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		</KeyboardAvoidingView>
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
		width: '100%',
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
		marginTop: 40,
		borderRadius: 10,
	},
	form: {
		marginTop: 30,
		padding: 30,
		backgroundColor: '#95a5a6',
		borderRadius: 5,
		width: Dimensions.get('window').width * 0.85,
	},
	label: {
		marginBottom: 5,
		color: Colors.primary,
		fontWeight: 'bold',
	},
	error: {
		color: 'red',
		marginTop: 5,
	},
	switchButton: {
		color: 'white',
		marginTop: 30,
	},
});
