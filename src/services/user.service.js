class userService{

	constructor(){
		this.users = [];
	}

	fetchUsersList(){
		return fetch('http://localhost:3000/users/?completed=1')
			.then(response => response.json());
	}

	fetchUserDetail(id) {
		return fetch('http://localhost:3000/users/' + id)
			.then(response => response.json());
	}

	createEmptyUser() {

		return fetch('http://localhost:3000/users/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: '',
				surname: '',
				gender: '',
				completed: '',
				job: '',
				photo: '',
				skills: [],
				info: '',
				birthday: ''
			}),
		})
			.then(response => response.json());
	}

	deleteUser(id) {

		return fetch('http://localhost:3000/users/' + id, {
			method: 'delete'
		})
			.then(response => response.json());


	}

	saveUser({id, name, surname, gender, completed, job, photo, skills, info, birthday}) {


		return fetch('http://localhost:3000/users/' + id, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				surname: surname,
				gender: gender,
				completed: completed,
				job: job,
				photo: photo,
				skills: skills,
				info: info,
				birthday: birthday
			}),
		})
			.then(response => response.json());

	}








}

export default new userService();

