import styles from "./Contact.module.css"; // Импорт стилей

const Contact = ({ contact, onDeleteContact }) => {
	return (
		<div className={styles.contact}>
			<div>
				<p>{contact.name}</p>
				<p>{contact.number}</p>
			</div>
			<button onClick={() => onDeleteContact(contact.id)}>Delete</button>
		</div>
	);
};

export default Contact;
