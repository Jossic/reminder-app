import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../axios-instance';
import Keys from '../../constants/Keys';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_NOTE = 'ADD_NOTE';
export const GET_NOTES = 'GET_NOTES';
export const GET_PROJECTS = 'GET_PROJECTS';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_TRY_LOGIN = 'SET_TRY_LOGIN';
export const FETCH_REFRESH_TOKEN = 'FETCH_REFRESH_TOKEN';

export const addProject = (project, userId, token) => {
	return (dispatch) => {
		axios
			.post(`/projects/${userId}.json?auth=${token}`, project)
			.then((response) => {
				console.log(`response =>`, response);
				const newProject = {
					id: response.data.name,
					name: project.name,
					logo: project.logo,
				};
				dispatch({ type: ADD_PROJECT, project: newProject });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
			});
	};
};
export const addNote = (note, userId, token) => {
	return (dispatch) => {
		axios
			.post(`/notes/${userId}.json?auth=${token}`, note)
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

export const getNotes = (userId, token) => {
	return (dispatch) => {
		dispatch({ type: START_LOADING });
		axios
			.get(`/notes/${userId}.json?auth=${token}`)
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
				dispatch({ type: END_LOADING });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
				dispatch({ type: END_LOADING });
			});
	};
};

export const getProjects = (userId, token) => {
	return (dispatch) => {
		axios
			.get(`/projects/${userId}.json?auth=${token}`)
			.then((response) => {
				const projects = [];
				for (const key in response.data) {
					projects.push({
						id: key,
						name: response.data[key].name,
						logo: response.data[key].logo,
					});
				}
				dispatch({ type: GET_PROJECTS, projects });
			})
			.catch((error) => {
				console.log(`catch error =>`, error);
			});
	};
};

export const deleteNote = (noteId, userId, token) => {
	return (dispatch) => {
		axios
			.delete(`/notes/${userId}/${noteId}.json?auth=${token}`)
			.then((response) => {
				dispatch({ type: DELETE_NOTE, noteId });
			});
	};
};

export const deleteProject = (projectId, userId, token) => {
	return (dispatch) => {
		axios
			.delete(`/projects/${userId}/${projectId}.json?auth=${token}`)
			.then((response) => {
				dispatch({ type: DELETE_PROJECT, projectId });
			});
	};
};

export const signup = (email, password) => {
	return async (dispatch) => {
		await axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Keys.firebase}`,
				{
					email,
					password,
					returnSecureToken: true,
				}
			)
			.then((response) => {
				saveDateToStorage(
					response.data.idToken,
					response.data.refreshToken
				);

				dispatch({
					type: AUTHENTICATE,
					userId: response.data.localId,
					token: response.data.idToken,
				});
			})
			.catch((error) => {
				console.log(`catch signup error =>`, error.response.data.error);
				throw new Error(error.response.data.error.message);
			});
	};
};
export const signin = (email, password) => {
	return async (dispatch) => {
		await axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.firebase}`,
				{
					email,
					password,
					returnSecureToken: true,
				}
			)
			.then((response) => {
				saveDateToStorage(
					response.data.idToken,
					response.data.refreshToken
				);

				dispatch({
					type: AUTHENTICATE,
					userId: response.data.localId,
					token: response.data.idToken,
				});
			})
			.catch((error) => {
				console.log(`catch signin error =>`, error.response.data.error);
				throw new Error(error.response.data.error.message);
			});
	};
};
export const setDidTry = () => {
	return {
		type: SET_TRY_LOGIN,
	};
};
export const fetchRefreshToken = (refreshToken) => {
	return async (dispatch) => {
		await axios
			.post(
				`https://securetoken.googleapis.com/v1/token?key=${Keys.firebase}`,
				{
					refreshToken,
					grantType: 'refresh_token',
				}
			)
			.then((response) => {
				dispatch({
					type: FETCH_REFRESH_TOKEN,
					token: response.data.id_token,
					refreshToken: response.data.refresh_token,
					userId: response.data.user_id,
				});
				saveDateToStorage(
					response.data.id_token,
					response.data.refresh_token
				);
			})
			.catch((error) => {
				console.log(
					`catch fetchRefreshToken error =>`,
					error.response.data.error
				);
				// throw new Error(error.response.data.error.message);
			});
	};
};

export const logout = () => {
	AsyncStorage.removeItem('userData');
	return {
		type: LOGOUT,
	};
};

const saveDateToStorage = (token, refreshToken) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			refreshToken,
		})
	);
};
