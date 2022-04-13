import { MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';

const Search = ({ onSearch, searchValue, onChange }) => {
	return (
		<div className="searchForm">
			<form className="d-flex" onSubmit={onSearch}>
				<input
					type="search"
					className="form-control"
					placeholder="Search Blog..."
					value={searchValue}
					onChange={onChange}
				/>
				<MDBBtn type="submit">Search</MDBBtn>
			</form>
		</div>
	);
};

export default Search;
