import axios from '../../axios-instance';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_NOTE = 'ADD_NOTE';

export const addProject = (project) => {
	return (dispatch) => {
		axios
			.post('/projects.json', project)
			.then((response) => {
				console.log(`response =>`, response);
				const newProject = {
					id: response.data.name,
					name: project.name,
				};
				dispatch({ type: ADD_PROJECT, project: newProject });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
			});
	};
};
export const addNote = (note) => {
	return (dispatch) => {
		axios
			.post('/notes.json', note)
			.then((response) => {
				const newNote = {
					id: response.data.name,
					content: note.content,
					createdAt: note.createdAt,
					projectId: note.projectId,
				};
				dispatch({ type: ADD_NOTE, note: newNote });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
			});
	};
};
