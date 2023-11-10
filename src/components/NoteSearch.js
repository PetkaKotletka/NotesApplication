import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function NoteSearch({ onSearch, setSearchTerm, searchTerm }) {
	const handleSearch = (e) => {
		e.preventDefault();
    	onSearch(searchTerm.trim());
	};

	const handleChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		onSearch(term);
	};

	return (
		<Form className="mb-3" onSubmit={handleSearch}>
			<FormControl
				type="text"
				placeholder="Search notes..."
				value={searchTerm}
				onChange={handleChange}
			/>
		</Form>
	);
}