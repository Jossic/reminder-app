import axios from 'axios';

const instance = axios.create({
	baseURL:
		'https://reminder-app-56dcc-default-rtdb.europe-west1.firebasedatabase.app/',
});
export default instance;
