import {
	ADD_NOTE,
	ADD_PROJECT,
	DELETE_NOTE,
	DELETE_PROJECT,
	END_LOADING,
	GET_NOTES,
	GET_PROJECTS,
	START_LOADING,
	AUTHENTICATE,
	SET_TRY_LOGIN,
	FETCH_REFRESH_TOKEN,
	LOGOUT,
} from '../actions';
import moment from 'moment';

const initialState = {
	notes: [],
	projects: [],
	loadingNotes: false,
	userId: null,
	token: null,
	didTryAutoLogin: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PROJECT:
			return {
				...state,
				projects: [action.project, ...state.projects],
			};
		case ADD_NOTE:
			return {
				...state,
				notes: [action.note, ...state.notes],
			};
		case GET_PROJECTS:
			const projects = [...action.projects];

			projects.sort((a, b) => {
				let dateA = moment(a.createdAd),
					dateB = moment(b.createdAd);
				return dateB - dateA;
			});
			return {
				...state,
				projects,
			};
		case GET_NOTES:
			const notes = [...action.notes];

			notes.sort((a, b) => {
				let dateA = moment(a.createdAd),
					dateB = moment(b.createdAd);
				return dateB - dateA;
			});
			return {
				...state,
				notes,
			};
		case DELETE_PROJECT:
			let currentProject = [...state.projects];
			currentProject = currentProject.filter(
				(project) => project.id !== action.projectId
			);
			return {
				...state,
				projects: [...currentProject],
			};
		case DELETE_NOTE:
			let currentNotes = [...state.notes];
			currentNotes = currentNotes.filter(
				(note) => note.id !== action.noteId
			);
			return {
				...state,
				notes: [...currentNotes],
			};
		case START_LOADING:
			return {
				...state,
				loadingNotes: true,
			};
		case END_LOADING:
			return {
				...state,
				loadingNotes: false,
			};
		case AUTHENTICATE:
			return {
				...state,
				userId: action.userId,
				token: action.token,
			};
		case SET_TRY_LOGIN:
			return {
				...state,
				didTryAutoLogin: true,
			};
		case FETCH_REFRESH_TOKEN:
			return {
				...state,
				userId: action.userId,
				token: action.token,
				didTryAutoLogin: true,
			};
		case LOGOUT:
			return {
				...state,
				userId: null,
				token: null,
			};
		default:
			return state;
	}
};
