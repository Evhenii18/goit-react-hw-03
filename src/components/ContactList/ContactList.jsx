import React from "react";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css"; // Импорт стилей

const ContactList = ({ contacts, onDeleteContact }) => {
	return (
		<ul className={styles.contactList}>
			{contacts.map((contact) => (
				<li
					className={styles.contactItem}
					key={contact.id}
				>
					<Contact
						contact={contact}
						onDeleteContact={onDeleteContact}
					/>
				</li>
			))}
		</ul>
	);
};

export default ContactList;
