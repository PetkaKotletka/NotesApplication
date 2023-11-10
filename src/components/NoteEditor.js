import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function NoteEditor({ onSubmit }) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const contentRef = useRef(null);

	useEffect(() => {
		contentRef.current.focus();
	}, []);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const handleSave = (e) => {
		e.preventDefault();
		const newNote = {
			id: uuidv4(),
			title: title,
			content: content,
		};
		onSubmit(newNote);
		setTitle('');
		setContent('');
	};

	return (
		<Form onSubmit={handleSave}>
			<Form.Group className="mb-3" controlId="titleInput">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="Title"
					value={title}
					onChange={handleTitleChange}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="contentInput">
				<Form.Label>Note</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					ref={contentRef}
					value={content}
					onChange={handleContentChange}
				/>
			</Form.Group>

			<Button className="mb-3" variant="primary" type="submit">
				Save
			</Button>
		</Form>
	);
}