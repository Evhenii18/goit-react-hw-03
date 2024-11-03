import styles from "./SearchBox.module.css"; // Импорт стилей

const SearchBox = ({ value, onChange }) => {
	return (
		<div className={styles.searchBox}>
			<label htmlFor="filter">Find contacts by name</label>
			<input
				id="filter"
				type="text"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchBox;
