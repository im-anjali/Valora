const express = require('express');
const client = require('../connectDB/connectDb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if(!user){
             return res.status(404).json({message:"user not found"});
        }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).json({message:'Invalid credentials'});

            }
            const token = jwt.sign(
                {id:user.id},
                process.env.JWT_SECRET,
                {expiresIn:'1d'}
            );
             return res.status(200).json({
                status: "success",
                message: "User logged in successfully",
                token,
                data: {
                    id: user.id,
                    username: user.name,
                    email: user.email
                }
            });

        } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const signup = async (req, res) =>{
    const {username, email, password} = req.body;
    try {
        const user = await client.query('SELECT * FROM users WHERE email = $1', [email])
        if(user.rows.length > 0){
            return res.status(400).json({message:'user already exist'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)RETURNING * ',
            [username, email, hashedPassword]
        );
            res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] });
    } catch (error) {
          res.status(500).json({ error: err.message });
    }
}
module.exports = {login, signup};