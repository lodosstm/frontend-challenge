

function calculateUserFilled({name, surname, gender, birthday, info, skills, job, photo}) {
	let userFilled = 0;
	if (name) userFilled += 5;
	if (surname) userFilled += 5;
	if (gender) userFilled += 5;
	if (birthday) userFilled += 5;
	if (info) userFilled += 10;
	if (skills) {
		for (let i = 0; i < skills.length; i++) {
			if ( i > 4) break;
			userFilled += 5;
		}
	}
	if (job) userFilled += 10;
	if (photo) userFilled += 20;



	return userFilled;
}

export default calculateUserFilled;
