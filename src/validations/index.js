import * as Yup from 'yup';

const createInternalAccountSchema = Yup.object({
    email: Yup.string()
        .email("Must be a valid email")
        .required("Email cannot be empty"),
    name: Yup.string()
        .required("Name cannot be empty"),
    nik: Yup.string()
        .required("Nik cannot be empty"),
    npwp: Yup.string()
        .optional(),
    department: Yup.string()
        .required("Department cannot be empty"),
    role: Yup.string()
        .required("Role cannot be empty"),
});

const createLovSchema = Yup.object({
    name: Yup.string()
        .required("Name cannot be empty"),
    value: Yup.string()
        .required("Value cannot be empty"),
    language: Yup.string()
        .required("Language cannot be empty"),
    category: Yup.string()
        .required("Category cannot be empty"),
});

const createMentor = Yup.object({
    name: Yup.string()
        .required("Name cannot be empty"),
    email: Yup.string()
        .optional()
        .nullable()
        .email('Must be in correct email format'),
    phone: Yup.string()
        .optional()
        .nullable(),
    title: Yup.string()
        .required("Title cannot be empty"),
    profile: Yup.string()
        .optional()
        .nullable(),
});

export default {
    createInternalAccountSchema,
    createLovSchema,
    createMentor
}