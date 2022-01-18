import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as globalActions from '../../store/actions/index';

const Note = ({ item }) => {
	const dispatch = useDispatch();
	const onPressHandler = () => {
		Alert.alert('Que souhaitez-vous faire ?', undefined, [
			{ text: 'Annuler', style: 'cancel' },
			{
				text: 'Supprimer',
				style: 'destructive',
				onPress: () => dispatch(globalActions.deleteNote(item.id)),
			},
		]);
	};

	return (
		<TouchableOpacity activeOpacity={0.8} onLongPress={onPressHandler}>
			<View style={styles.note}>
				<Text style={styles.noteText}>{item.content}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Note;

const styles = StyleSheet.create({
	note: {
		backgroundColor: 'white',
		padding: 15,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 15,
	},
});
