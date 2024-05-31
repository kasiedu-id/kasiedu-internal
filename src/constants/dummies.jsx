const departments = [
    {
        id: 1,
        name: 'Finances',
        value: "finances",
        category: "department"
    },
    {
        id: 2,
        name: 'Operations',
        value: "operations",
        category: "department"
    },
    {
        id: 3,
        name: 'Sales',
        value: "sales",
        category: "department"
    },
    {
        id: 4,
        name: 'Management',
        value: "management",
        category: "department"
    },
];

const roles = [
    {
        id: 1,
        name: 'Admin',
        value: "admin",
        category: "role"
    },
    {
        id: 2,
        name: 'Staff',
        value: "staff",
        category: "role"
    },
];

const partnerType = [
    {
        id: 1,
        name: 'Retail',
        value: "retail",
        category: "type"
    },
    {
        id: 2,
        name: 'Agent',
        value: "agent",
        category: "type"
    },
];

const internalUsers = [
    {
        id: 1,
        name: 'Gregorius Eldwin Pradipta',
        email: "greg@feeder.co.id",
        nik: "1234567123",
        department: "management",
        role: "admin",
    },
    {
        id: 2,
        name: 'Temmy Alex',
        email: "Temmy@feeder.co.id",
        nik: "1234567123",
        department: "finance",
        role: "staff",
    },
    {
        id: 3,
        name: 'Sadam Feeder Lorem',
        email: "Sadam@feeder.co.id",
        nik: "1234567123",
        department: "operations",
        role: "admin",
    },
    {
        id: 4,
        name: 'John Doe Lorem',
        email: "Test@feeder.co.id",
        nik: "1234567123",
        department: "sales",
        role: "staff",
    },
    {
        id: 5,
        name: 'Greg Nopo',
        email: "nopolo@feeder.co.id",
        nik: "1234567123",
        department: "finance",
        role: "admin",
    },
];

const addresses = [
    {
        id: 0,
        name: "DKI Jakarta",
        cities: [
            {
                id: 0,
                name: "Jakarta Selatan",
                district: [
                    {
                        id: 0,
                        name: "Tebet",
                    },
                    {
                        id: 1,
                        name: "Pancoran",
                    }
                ]
            },
            {
                id: 1,
                name: "Jakarta Barat",
                district: [
                    {
                        id: 0,
                        name: "Kalideres",
                    },
                    {
                        id: 1,
                        name: "Meruya",
                    }
                ]
            },
            {
                id: 2,
                name: "Jakarta Pusat",
                district: [
                    {
                        id: 0,
                        name: "Tanah Abang",
                    },
                ]
            },
            {
                id: 3,
                name: "Jakarta Utara",
                district: [
                    {
                        id: 0,
                        name: "Pancoran",
                    },
                ]
            },
            {
                id: 4,
                name: "Jakarta Timur",
                district: [
                    {
                        id: 0,
                        name: "Kampung Melayu",
                    },
                ]
            }
        ]
    },
]

const deliveryTypes = [
    {
        id: 1,
        name: "Domestik",
        value: "local",
    },
    {
        id: 2,
        name: "Internasional",
        value: "international",
    }
]

const packageTypes = [
    {
        id: 1,
        name: "Dokumen",
        value: "document",
    },
    {
        id: 2,
        name: "Paket",
        value: "package",
    }
]

const partnerList = [
    {
        id: 1,
        name: "FE-12345 PT ACE HARDWARE Indonesia",
        value: "ace-hardware",
    },
    {
        id: 2,
        name: "FE-22345 PT Informa Indonesia",
        value: "informa",
    },
];

const vendorList = [
    {
        id: 1,
        name: "JNE",
        value: "jne",
        price: "25000"
    },
    {
        id: 2,
        name: "J&T",
        value: "j&t",
        price: "35å000"
    },
]

export default { 
    departments,
    roles,
    internalUsers,
    partnerType,
    addresses,
    deliveryTypes,
    packageTypes,
    partnerList,
    vendorList,
};