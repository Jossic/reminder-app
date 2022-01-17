import { ADD_PROJECT } from '../actions';

const initialState = {
	notes: [],
	projects: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_PROJECT:
			return {
				...state,
				projects: [action.project, ...state.projects],
			};
		default:
			return state;
	}
};
