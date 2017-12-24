function convertDate(str) {
	let date = new Date(str);

	const opt = {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric'
	};

	return date.toLocaleString("ru", opt);
}

export default convertDate;
