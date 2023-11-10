import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Note from './Note';
import NoteEditor from './NoteEditor';
import NoteSearch from './NoteSearch';

export default function NoteList() {
	const [notes, setNotes] = useState([]);
	const [filteredNotes, setFilteredNotes] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const deleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
	};

	const addNote = (note) => {
		if (note.title.trim() && note.content.trim()) {
			const updatedNotes = [note, ...notes];
			setNotes(updatedNotes);
		}
	}

	const handleSearch = (term) => {
		const newFilteredNotes = term
			? notes.filter((note) =>
				note.title.toLowerCase().includes(term.toLowerCase()) ||
				note.content.toLowerCase().includes(term.toLowerCase()))
			: notes;
		setFilteredNotes(newFilteredNotes);
	};

	useEffect(() => {
		setSearchTerm('');
		handleSearch('');
		if (notes.length) {
			console.log('Saved notes:', JSON.stringify(notes));
			localStorage.setItem('notes', JSON.stringify(notes));
		}
	}, [notes]);

	useEffect(() => {
		const storedNotes = localStorage.getItem('notes');
		if (storedNotes) {
			const parsedNotes = JSON.parse(storedNotes);
			if (Array.isArray(parsedNotes) && parsedNotes.length) {
				console.log('Loaded notes:', parsedNotes);
				setNotes(parsedNotes);
			}
		}
	}, []);

	return (
		<Container fluid className="h-100">
			<Row className="justify-content-center">
				<Col md={6}>
					<h1 className="text-center">
						Notes application
					</h1>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={6}>
					<NoteSearch onSearch={handleSearch} 
								setSearchTerm={setSearchTerm} 
								searchTerm={searchTerm}/>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={6}>
					<h1 className="text-center">
						Add note
					</h1>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={6}>
					<NoteEditor onSubmit={addNote} />
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col md={6}>
					<ul className="list-unstyled">
						{filteredNotes.map((note) => (
							<Note
								key={note.id}
								id={note.id}
								title={note.title}
								content={note.content}
								deleteNote={deleteNote}
							/>
						))}
					</ul>
				</Col>
			</Row>
		</Container>
	);
}