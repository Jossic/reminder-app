import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

const Note = ({ item }) => {
	return (
		<View style={styles.note}>
			<Text style={styles.noteText}>{item.content}</Text>
		</View>
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
	},
});
