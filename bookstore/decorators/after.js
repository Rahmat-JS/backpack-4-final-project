async function passwordDeleter(result) {
    if(!result || !result.data)
        return result;

    result.data.forEach(user => delete user.password);
    return result;
}

module.exports = {
    passwordDeleter
};