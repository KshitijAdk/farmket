import pool from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from 'crypto';

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

export const userLogin = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT id, username, email, password FROM users WHERE username = ?';
    pool.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).send('Error logging in');
        } else {
            if (result.length > 0) {
                const user = result[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        res.status(500).send('Error logging in');
                    } else {
                        if (isMatch) {
                            const token = jwt.sign({ userId: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
                            res.status(200).json({ message: 'Login successful', token: token, email: user.email });
                        } else {
                            res.status(401).send('Invalid username or password');
                        }

                    }
                });
            } else {
                res.status(401).send('Invalid username or password');
            }
        }
    });
}


export const userSignup = (req, res) => {
    const { username, email, phone_num, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).send('Error saving user data');
        } else {
            const sql = 'INSERT INTO users (username, email, phone_num, password) VALUES (?, ?, ?, ?)';
            pool.query(sql, [username, email, phone_num, hash], (err, result) => {
                if (err) {
                    console.error('Error saving user data:', err);
                    res.status(500).send('Error saving user data');
                } else {
                    res.status(200).send('User data saved successfully');
                }
            });
        }
    });
}

export const passwordChange = (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body;

        const sql = 'SELECT * FROM users WHERE username = ?';
        pool.query(sql, [username], async (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                res.status(500).send('Error fetching user');
            } else {
                if (result.length > 0) {
                    const user = result[0];
                    const isMatch = await bcrypt.compare(currentPassword, user.password);
                    if (isMatch) {
                        const hashedPassword = await bcrypt.hash(newPassword, 10);
                        const updateSql = 'UPDATE users SET password = ? WHERE username = ?';
                        pool.query(updateSql, [hashedPassword, username], (updateErr, updateResult) => {
                            if (updateErr) {
                                console.error('Error updating password:', updateErr);
                                res.status(500).send('Error updating password');
                            } else {
                                res.status(200).send('Password updated successfully');
                            }
                        });
                    } else {
                        res.status(401).send('Incorrect current password');
                    }
                } else {
                    res.status(404).send('User not found');
                }
            }
        });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).send('Error changing password');
    }
}