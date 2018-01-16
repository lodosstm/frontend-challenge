function validateDate (str) {
	const date = String(parseInt(str)).length;
	if (date === 4) return true;
	return false;
}


export default  validateDate;
