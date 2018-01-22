export default class Employee {
	constructor(id, photo, firstName, lastName, position, skills, gender, dateOfBirthday, qualification) {
	this.id = id;
	this.photo = photo;
	this.firstName = firstName;
	this.lastName = lastName;
	this.position = position;
	this.skills = skills;
	this.gender = gender;
	this.dateOfBirthday = dateOfBirthday;
	this.qualification = qualification;
	}
	setFirstName(fName) {

		this.firstName = fName;
	}
	setLastName(lastName) {

		this.lastName = lastName;
	}
	setPosition(position) {

		this.position = position;
	}
	addSkill(skill) {

		this.skills.push(skill);
	}
	deleteSkill(key) {

		this.skills.splice(key, 1);
	}
	getSkills() {

		return this.skills;
	}
	setDateOfBirthday(date) {

		this.dateOfBirthday = date;
	}
	setGender(gender) {

		this.gender = gender;
	}
	setQualification(qualification) {

		this.qualification = qualification;
	}

	getFilledProfile() {
		let persents = 0;
		if(this.photo != `https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png`)
			persents = persents + 20;
		if(this.firstName != null && this.firstName != "")
			persents = persents + 5;
		if(this.lastName != null && this.lastName != "")
			persents = persents + 5;
		if(this.gender != null)
			persents = persents + 5;
		persents = persents + 5 * this.skills.length;
		if(this.position != null && this.position != "")
			persents = persents + 10;
		if(this.dateOfBirthday != null && this.dateOfBirthday != "")
			persents = persents + 5;
		if(this.qualification != null && this.qualification != "")
			persents = persents + 10;
		return persents;
	}
}



