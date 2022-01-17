const initialState = {
	notes: [],
	projects: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'value':
			break;

		default:
			return state;
	}
};
