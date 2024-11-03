import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css"; // Импорт стилей

const ContactForm = ({ onAddContact }) => {
	const formik = useFormik({
		initialValues: {
			name: "",
			number: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(3, "Must be at least 3 characters")
				.max(50, "Must be 50 characters or less")
				.required("Required"),
			number: Yup.string()
				.min(7, "Must be 7 characters")
				.max(7, "Must be 7 characters")
				.required("Required"),
		}),
		onSubmit: (values, { resetForm }) => {
			onAddContact(values.name, values.number);
			resetForm();
		},
	});

	return (
		<form
			className={styles.contactForm}
			onSubmit={formik.handleSubmit}
		>
			<div>
				<label htmlFor="name">Name</label>
				<input
					className={styles.input}
					id="name"
					type="text"
					{...formik.getFieldProps("name")}
				/>
				{formik.touched.name && formik.errors.name ? (
					<div>{formik.errors.name}</div>
				) : null}
			</div>
			<div>
				<label htmlFor="number">Number</label>
				<input
					className={styles.input}
					id="number"
					type="tel"
					{...formik.getFieldProps("number")}
				/>
				{formik.touched.number && formik.errors.number ? (
					<div>{formik.errors.number}</div>
				) : null}
			</div>
			<button
				className={styles.button}
				type="submit"
			>
				Add contact
			</button>
		</form>
	);
};

export default ContactForm;
