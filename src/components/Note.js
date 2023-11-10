import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Note({ id, title, content, deleteNote }) {
	return (
		<li>
			<Card>
				<Card.Header>{title}</Card.Header>
				<Card.Body>
					<Card.Text>{content}</Card.Text>
					<Button variant="danger" onClick={() => deleteNote(id)}>
						Delete
					</Button>
				</Card.Body>
			</Card>
		</li>
	);
}