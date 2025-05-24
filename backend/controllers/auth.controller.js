const bcrypt = require('bcrypt');
const { COOKIE_NAME, JWT_SECRET } = require('../constants/auth');
const { successResponse } = require('../helpers/responseWrapper');
const { getUserByEmail, createUser } = require("../db/data-providers/user.provider");
const { setAuthToken } = require("../helpers/authHelper");

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required', status: 400 });
        }

        const existing = await getUserByEmail(email);
        if (existing) return res.status(409).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({ username, email, password: hashedPassword });

        setAuthToken(res, newUser._id);

        res.status(201).json(successResponse({ status: 201, message: "User created" }));
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required', status: 400 });
        }

        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        setAuthToken(res, user._id);

        // console.log("Res:==> ", res);

        res.status(200).json(successResponse({ status: 200, message: 'Logged in successfully' }));
    } catch (err) {
        next(err);
    }
};

const logout = (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json(successResponse({ status: 200, message: "Logged Out successfully" }));
};

module.exports = {
    signup,
    login,
    logout,
};
