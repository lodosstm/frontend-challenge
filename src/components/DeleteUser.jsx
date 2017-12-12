import React from 'react';


function DeleteUser(id) {
	const deleteQestion = confirm('delete?');
	if (deleteQestion) {
		alert('delete user:' + id);


		fetch('http://localhost:3000/users/' + id, {
			method: 'delete'
		})
			.then(response => response.json());

	}



}



export default DeleteUser;
