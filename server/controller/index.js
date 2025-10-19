
import pool from "../db/dbconfig.js";

import bcrypt from 'bcrypt'

//HANDLE USER SIGNUP.
export const handleSignup = async (req, res) => {
  console.log("Incoming signup request:", req.body);

  try {
    const { id, fullname, email, password, cpassword, role } = req.body;

    // ✅ Basic validation
    if (!id || !fullname || !email || !password || !cpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // ✅ Check if email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // ✅ Prepare dynamic insert fields
    const fields = ["id", "fullname", "email", "password"];
    const values = [id, fullname, email];
    let index = 4;

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    values.push(hashedPassword);

    // ✅ Optional role field
    if (role) {
      fields.push("role");
      values.push(role);
    }

    // ✅ Add timestamps
    fields.push("created_at", "updated_at");
    values.push(new Date(), new Date());

    // ✅ Build dynamic query
    const query = `
      INSERT INTO users (${fields.join(", ")})
      VALUES (${values.map((_, i) => `$${i + 1}`).join(", ")})
      RETURNING id, fullname, email, role, created_at;
    `;

    const { rows } = await pool.query(query, values);
    const user = rows[0];

    console.log("✅ New user created:", user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register user. Please try again.",
    });
  }
};


//HANDLE SCHOOL REGISTRATION.
export const handleSchoolRegistration = async (req, res) => {
  // Accept either multipart/form-data with `logo` file, or JSON with `logo` filename/url
  const { name, address, email, website, logo, id } = req.body;

  // If multer stored a file, construct its public URL
  let logoUrl = logo;
  if (req.file) {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    logoUrl = `${baseUrl}/uploads/${req.file.filename}`;
  }

  try {
    // 1. Check for missing fields
    if (!name || !address || !email || !website || !logoUrl || !id) {
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
  const values = [schoolName, logoUrl, schoolEmail, address, schoolWebsite, id];
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

//EDIT SCHOOL INFO

export const editSchoolInfo = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  try {
    const { userId, name, website, contact, address, classes, accreditation } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: userId",
      });
    }

    // Build the update dynamically (partial update)
    const fields = [];
    const values = [];
    let index = 2; // $1 will be userId

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (website) {
      fields.push(`website = $${index++}`);
      values.push(website);
    }
    if (contact) {
      fields.push(`contact = $${index++}`);
      values.push(contact);
    }
    if (address) {
      fields.push(`address = $${index++}`);
      values.push(address);
    }
    if (classes) {
      fields.push(`classes = $${index++}`);
      values.push(classes);
    }
    if (accreditation) {
      fields.push(`accreditation = $${index++}`);
      values.push(accreditation);
    }

    // If a new file is uploaded
    let imageUrl;
    if (req.file) {
      const url = process.env.BASE_URL;
      imageUrl = `${url}/uploads/${req.file.filename}`;
      fields.push(`logo = $${index++}`);
      values.push(imageUrl);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    // Construct query dynamically
    const query = `
      UPDATE schools
      SET ${fields.join(", ")}
      WHERE user_id = $1
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [userId, ...values]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "School not found.",
      });
    }

    const updatedSchool = rows[0];

    res.status(200).json({
      success: true,
      message: "School info updated successfully.",
      schoolData: {
        name: updatedSchool.name,
        website: updatedSchool.website,
        contact: updatedSchool.contact,
        address: updatedSchool.address,
        classes: updatedSchool.classes,
        accreditation: updatedSchool.accreditation,
        logo: updatedSchool.logo,
      },
    });
  } catch (error) {
    console.error("Error in editSchoolInfo:", error);

    // Safely delete uploaded file if query failed
    if (req.file) {
      const fs = require("fs/promises");
      await fs
        .unlink(req.file.path)
        .catch((err) => console.error("Failed to delete file:", err));
    }

    res.status(500).json({
      success: false,
      message: "Failed to update school profile.",
    });
  }
};

// GET SCHOOL PROFILE
export const getSchoolProfile = async (req, res) => {
  try {
    const query = `SELECT * FROM schools`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching school info:", error);
    res.status(500).json({ message: "Unable to get school info" });
  }
};


export const getAdminProfile = async (req, res) => {
  try {
    // Defensive: ensure authentication middleware attached user
    if (!req.user || !req.user.id) {
      console.error('getAdminProfile: missing req.user');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.user.id; // from Supabase token
    const query = `
      SELECT id, fullname, role, email, contact, image
      FROM users
      WHERE id = $1
    `;
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ success: true, admin: result.rows[0] });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};





export const editAdminProfile = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  try {
    const userId = req.user?.id; // from Supabase session middleware
    const { fullName, role, password, email, contact } = req.body;

    // ✅ Validate user ID
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: userId.",
      });
    }

    // ✅ Prepare dynamic query parts
    const fields = [];
    const values = [];
    let index = 1;

    if (fullName) {
      fields.push(`fullname = $${index++}`);
      values.push(fullName);
    }

    if (role) {
      fields.push(`role = $${index++}`);
      values.push(role);
    }

    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }

    if (contact) {
      fields.push(`contact = $${index++}`);
      values.push(contact);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push(`password = $${index++}`);
      values.push(hashedPassword);
    }

    // ✅ Handle image upload
    if (req.file) {
      const baseUrl = process.env.BASE_URL || "";
      const image = `${baseUrl}/uploads/${req.file.filename}`;
      fields.push(`image = $${index++}`);
      values.push(image);
    }

    // ✅ If no fields provided
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    // ✅ Build query dynamically
    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING id, fullname, role, email, contact, image;
    `;

    const { rows } = await pool.query(query, [...values, userId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const updatedAdmin = rows[0];

    res.status(200).json({
      success: true,
      message: "Admin profile updated successfully.",
      profile: {
        id: updatedAdmin.id,
        fullName: updatedAdmin.fullname,
        role: updatedAdmin.role,
        email: updatedAdmin.email,
        contact: updatedAdmin.contact,
        imageUrl: updatedAdmin.image,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);

    // ✅ Gracefully clean up uploaded file if something failed
    if (req.file) {
      const fs = await import("fs/promises");
      await fs
        .unlink(req.file.path)
        .catch((err) => console.error("Failed to delete uploaded file:", err));
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while updating profile. Please try again.",
    });
  }
};

