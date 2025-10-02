// import { use } from "react";
import pool from "../db/dbconfig.js";
import { supabase } from "../supabase.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//HANDLE USER SIGNUP.
export const handleSignup = async (req, res) => {
  console.log("Incoming signup request:", req.body);

  const { role, fullname, email, password, cpassword, id } = req.body;

  try {
    //  Basic validation
    if (!id || !fullname || !email || !password || !cpassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: "All fields are required" }] });
    }

    if (password !== cpassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Passwords do not match" }] });
    }

    //  Check if email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already registered" }] });
    }

    //  Hash password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //  Insert into DB
    const query = `
      INSERT INTO users (id, fullname, email, password, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, fullname, email, created_at
    `;

    const values = [id, fullname, email, hashedPassword ,role];
    const result = await pool.query(query, values);

    const user = result.rows[0];
    console.log("New user created:", user);

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, role, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Failed to save user data" });
  }
};

//HANDLE SCHOOL REGISTRATION.
export const handleSchoolRegistration = async (req, res) => {
  const { name, address, email, website, logo, id } = req.body;

  try {
    // 1. Check for missing fields
    if (!name || !address || !email || !website || !logo || !id) {
      return res
        .status(400)
        .json({ errors: [{ msg: "All fields are required" }] });
    }

    // 2. Sanitize & validate inputs
    const schoolName = name.trim();
    const schoolEmail = email.trim().toLowerCase();
    const schoolWebsite = website.trim();

    // 3. Check for duplicate records
    const duplicateCheck = await pool.query(
      `SELECT id FROM schools WHERE email = $1 OR name = $2 OR user_id = $3 LIMIT 1`,
      [schoolEmail, schoolName, id]
    );

    if (duplicateCheck.rows.length > 0) {
      return res
        .status(409) // conflict
        .json({ message: "School already registered" });
    }

    // 4. Insert new school
    const query = `
      INSERT INTO schools (name, logo, email, address, website, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, name, email, address, website, logo
    `;
    const values = [schoolName, logo, schoolEmail, address, schoolWebsite, id];
    const result = await pool.query(query, values);

    const school = result.rows[0];
    console.log("New school registered:", school);

    return res.status(201).json({
      message: "School registered successfully",
      school,
    });
  } catch (error) {
    console.error("Error registering school:", error);
    return res
      .status(500)
      .json({ errors: [{ msg: "Server error, please try again later" }] });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Login request for user ID:", id);

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Query user
    const query = "SELECT id, fullname, email, role FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // Send user back
    return res.status(200).json({user, message: "Login successful" });
  } catch (error) {
    console.error("Error in handleLogin:", error.message);

    // Avoid exposing DB details in response
    return res.status(500).json({ error: "Internal server error" });
  }
};


// FOR CLASS SECTIONS ONLY!
// export const showClassLogin = (req , res)=>{
//   res.render('login.ejs');
// }

// export const classLogin = async(req, res)=>{
//   console.log(req.body);
//   const {email , password} = req.body;
//   try {
//     // FIND USER IN THE DB WITH EMAIL:
//     let query = `select * from users where email = $1`;
//     const value = [email];
//     const result = await pool.query(query, value);
//     const user =result.rows[0];
//     // console.log(user)
//     if(!user){
//       console.log('no user found . please sign up')
//       return ;
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if(!isMatch){
//       res.redirect(`/?error=${encodeURIComponent('incorrect user email or password')}`)
//     }
    
//   } catch (error) {
    
//   }
// }



 


// export const dashboard = async (req ,res)=>{
//   // res.render('dashboard')
//   try {
//     const query = 'select * from users where id = $1';
//     let result = await pool.query(query , [req.user.id]);
//     console.log(result.rows[0]);
//     let user = result.rows[0];
//     if(result.rows.length === 0){
//       console.log('no user found');
//       return ;
//     }
//     res.render('dashboard', {user: user} )
//   } catch (error) {
    
//   }
// }

// export const SignUp = async (req, res) => {
//   const { role, fullname, email, password } = req.body;
//     console.log(req.body)
//   try {
//     // TODO: check if user exists in DB
//     // Example (if using something like Prisma/Mongoose):
//     // const existingUser = await User.findOne({ email });
//     // if (existingUser) return res.status(400).json({ errors: [{ msg: "Email already registered" }] });

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // TODO: save user into DB
//     // Example:
//     // const newUser = new User({ role, fullname, email, password: hashedPassword });
//     // await newUser.save();

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: { role, fullname, email },
//     });
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     res.status(500).json({ errors: [{ msg: "Server error" }] });
//   }
// };