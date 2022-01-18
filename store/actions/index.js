import axios from '../../axios-instance';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_NOTE = 'ADD_NOTE';
export const GET_NOTES = 'GET_NOTES';
export const GET_PROJECTS = 'GET_PROJECTS';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_PROJECT = 'DELETE_PROJECT';

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

export const getNotes = () => {
	return (dispatch) => {
		axios
			.get('/notes.json')
			.then((response) => {
				const notes = [];
				for (const key in response.data) {
					notes.push({
						id: key,
						content: response.data[key].content,
						createdAt: response.data[key].createdAt,
						projectId: response.data[key].projectId,
					});
				}
				dispatch({ type: GET_NOTES, notes });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
			});
	};
};

export const getProjects = () => {
	return (dispatch) => {
		axios
			.get('/projects.json')
			.then((response) => {
				const projects = [];
				for (const key in response.data) {
					projects.push({
						id: key,
						name: response.data[key].name,
					});
				}
				dispatch({ type: GET_PROJECTS, projects });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
			});
	};
};

export const deleteNote = (noteId) => {
	return (dispatch) => {
		axios.delete(`/notes/${noteId}.json`).then((response) => {
			dispatch({ type: DELETE_NOTE, noteId });
		});
	};
};

export const deleteProject = (projectId) => {
	return (dispatch) => {
		axios.delete(`/projects/${projectId}.json`).then((response) => {
			dispatch({ type: DELETE_PROJECT, projectId });
		});
	};
};
