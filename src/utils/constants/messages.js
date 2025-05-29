module.exports = {
    _auth_module: {
        created: (name) => `${name || "Account"} created successfully.`,
        login: (name) => `${name || "Account"} login successfully.`,
        logout: (name) => `${name || "Account"} logout successfully.`,
        allReadyExist: (key) => `${key || "Data"} already exist.`,
        unAuth: "Unauthorized access.",
        tokenMissing: "Token missing, Please login again.",
        tokenExpired: "Token Expired, Please login again."
    },
    _middleware: {
        dbNotInitDB: (name) => `DB not initialize for ${name}.`,
        require: (name) => `${name} is required.`
    },
    _query: {
        add: (key) => `${key || "Record"} add successfully.`,
        get: (key) => `${key || "Record"} fetched successfully.`,
        update: (key) => `${key || "Record"} update successfully.`,
        notFound: (key) => `${key || "Record"} not found.`,
        invalid: (key) => `Invalid ${key}.`,
        save: (key) => `${key || "Record"} saved successfully.`,
        delete: (key) => `${key || "Record"} deleted successfully.`,
        duplicate: (key) => `${key || "Record"} duplicate found.`,
    },
    _onboardMsg: {
        reqSubmit: 'Thank you for submitting your details, someone from our team will get in touch with you.',
        alreadyExit: 'Account already exist.'
    },

    _response_message: {
        invalid: (key) => `Invalid ${key}.`,
        windowNAvailable: () => `Currently window not available.`,
        emailSend: () => `mail send successfully.`,
        allReadyExist: (key) => `${key || "Data"} already exist.`,
        created: (name) => `${name || "Record"} created successfully.`,
        updated: (name) => `${name || "Record"} updated successfully.`,
        notFound: (key) => `${key || "Record"} not found.`,
        required: (key) => `${key || "Record"} required.`,
        exportCsv: (key) => `${key || "Record"} downloaded successfully.`,
        deleted: (name) => `${name || "Record"} deleted successfully.`,
        allReadyDeleted: (key) => `${key || "Data"} already deleted.`,
        found: (key) => `${key || "Record"} found successfully.`,
        mailSent: (key) => `${key || "Record"} sent successfully.`,
        mailNotSent: (key) => `${key || "Record"} not sent.`,
        Unauthorized: (key) => `${key || "User"} Unauthorized`,
        allReadyUpdated: (key, value) => `${key || "Record"} already updated ${value ? "as " + value : ""}`,
        ratingAdd: (key) => `You can give rating at the end of ${key}`,
        outOfStock: (key) => `${key} Out of Stock`,
        notAllowed: (key) => `Only ${key} items is allowed by the admin`

    }
}

