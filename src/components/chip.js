const theme = {
	chipsContainer: {
		display: "flex",
		position: "relative",
		border: "1px solid #ccc",
		backgroundColor: '#fff',
		font: "1em Arial",
		minHeight: 60,
		alignItems: "center",
		flexWrap: "wrap",
		padding: "2.5px",
		borderRadius: 5,
		':focus': {
			border: "1px solid #aaa",
		}
	},
	container: {
		flex: 1,
	},
	containerOpen: {

	},
	input: {
		border: 'none',
		outline: 'none',
		boxSizing: 'border-box',
		width: '100%',
		padding: 5,
		margin: 2.5
	},
	suggestionsContainer: {

	},
	suggestionsList: {
		position: 'absolute',
		border: '1px solid #ccc',
		zIndex: 10,
		left: 0,
		top: '100%',
		width: '100%',
		backgroundColor: '#fff',
		listStyle: 'none',
		padding: 0,
		margin: 0,
	},
	suggestion: {
		padding: '5px 15px'
	},
	suggestionHighlighted: {
		background: '#ddd'
	},
	sectionContainer: {

	},
	sectionTitle: {

	},

};

export default theme;

export const chipTheme = {
	chip: {
		padding: "12.5px 25px",
		background: "#F4AD49",
		margin: "2.5px",
		borderRadius: 3,
		cursor: 'default',
		color: 'white',

	},
	chipSelected: {
		background: '#888',
	},
	chipRemove: {
		fontWeight: "bold",
		fontSize: 18,
		cursor: "pointer",
		':hover': {
			color: 'black',
		}
	}
};
