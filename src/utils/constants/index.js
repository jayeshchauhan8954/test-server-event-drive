const _collectionName = {
    User: 'User',
    Note: 'note',
    Favorite: 'favorite',
}

const _status = {
    Active: "Active",
    Inactive: "Inactive",
}

const _gender = {
    Male: 'Male',
    Female: 'Female',
    Other: 'Other'
}

const _envMode = {
    local: 'local',
    development: "development",
    production: "production",
    staging: "staging"
}

const _profileStatus = {
    'Inactive': 0,
    'Active': 1,
    'Pending': 2,
    'Rejected': 3,
    'Document Pending': 4
}




module.exports = {
    _collectionName,
    _status,
    _envMode,
    _gender,
    _profileStatus,
}