class User {
    constructor(id, name, email) {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!name || typeof name !== 'string' || name.trim() === '' || /\d/.test(name)) {
            throw new Error('Invalid name');
        }

        if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
            throw new Error('Invalid email');
        }

        this.id = id;
        this.name = name;
        this.email = email;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = User;