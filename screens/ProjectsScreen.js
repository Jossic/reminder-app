import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProjectsScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Projects</Text>
		</View>
	);
};

export default ProjectsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
