import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import { nanoid } from "nanoid";
import styles from "./App.module.css"; // Импортируем стили

const App = () => {
	// Инициализация начального состояния контактов
	const [contacts, setContacts] = useState([
		{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
		{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
		{ id: "id-3", name: "Eden Clements", number: "645-17-79" },
		{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
	]);

	const [filter, setFilter] = useState("");

	// Эффект для загрузки контактов из localStorage при монтировании
	useEffect(() => {
		const savedContacts = JSON.parse(localStorage.getItem("contacts"));
		if (savedContacts) {
			setContacts(savedContacts);
		}
	}, []);

	// Эффект для сохранения контактов в localStorage при их изменении
	useEffect(() => {
		localStorage.setItem("contacts", JSON.stringify(contacts));
	}, [contacts]);

	// Функция добавления нового контакта
	const addContact = (name, number) => {
		const newContact = {
			id: nanoid(), // Генерируем уникальный ID для нового контакта
			name,
			number: formatPhoneNumber(number), // Убедимся, что номер в нужном формате
		};

		// Проверка на наличие контакта с таким же именем
		const isDuplicate = contacts.some(
			(contact) => contact.name.toLowerCase() === name.toLowerCase()
		);
		if (isDuplicate) {
			alert(`${name} is already in contacts.`);
			return;
		}

		setContacts((prevContacts) => [...prevContacts, newContact]);
	};

	// Функция для форматирования номера телефона
	const formatPhoneNumber = (value) => {
		const digits = value.replace(/\D/g, ""); // Удаляем все нецифровые символы
		if (digits.length <= 3) {
			return digits;
		} else if (digits.length <= 5) {
			return `${digits.slice(0, 3)}-${digits.slice(3)}`;
		} else if (digits.length <= 7) {
			return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
		} else {
			return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(
				5,
				7
			)}-${digits.slice(7, 8)}`;
		}
	};

	// Функция удаления контакта
	const deleteContact = (contactId) => {
		setContacts((prevContacts) =>
			prevContacts.filter((contact) => contact.id !== contactId)
		);
	};

	// Функция для обновления фильтра
	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	// Получаем отфильтрованные контакты
	const getFilteredContacts = () => {
		const normalizedFilter = filter.toLowerCase();
		return contacts.filter((contact) =>
			contact.name.toLowerCase().includes(normalizedFilter)
		);
	};

	// Рендер компонентов
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Phonebook</h1>
			<ContactForm onAddContact={addContact} />
			<SearchBox
				value={filter}
				onChange={handleFilterChange}
			/>
			<ContactList
				contacts={getFilteredContacts()}
				onDeleteContact={deleteContact}
				className={styles.contactList} // Добавляем класс для списка контактов
			/>
		</div>
	);
};

export default App;
