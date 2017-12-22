class userService{

	constructor(){
		this.users = [];
	}

	fetchUsersList(){
		return fetch('http://localhost:3000/users/?completed=1')
			.then(response => response.json())
			.catch(function(err) {
				console.log('cant get users, Fetch Error :-S', err);
			});
	}

	fetchUserDetail(id) {
		return fetch('http://localhost:3000/users/' + id)
			.then(response => response.json())
			.catch(function(err) {
				console.log('cant get user id:' + id + ', Fetch Error :-S', err);
			});
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
			.then(response => response.json())
			.catch(function(err) {
				console.log('cant create new user, Fetch Error :-S', err);
			});
	}

	deleteUser(id) {

		return fetch('http://localhost:3000/users/' + id, {
			method: 'delete'
		})
			.then(response => response.json())
			.catch(function(err) {
				console.log('cant delete user id:' + id + ', Fetch Error :-S', err);
			});


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
			.then(response => response.json())
			.catch(function(err) {
				console.log('cant save user id:' + id + 'Fetch Error :-S', err);
			});

	}








}

export default new userService();

