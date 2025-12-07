const asyncHandler = require("express-async-handler");
const supabase = require("../config/supabase");
const User = require("../models/userModel");
const express = require("express");
const bcryptjs = require("bcryptjs");

//create new user
const createUser=  asyncHandler(async (req, res) => {
    console.log ("req body is", req.body);
    const { name, phone_number, password, email, aadhar, pan, business_description, previous_micro_loans, gst_number } = req.body;
    
    if (!name || !phone_number || !password || !email || !aadhar || !pan || !business_description || !previous_micro_loans || !gst_number) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    
    // Hash password before saving
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const user = await User.create({
        name,
        phone_number,
        password: hashedPassword,
        email,
        aadhar,
        pan,
        business_description,
        previous_micro_loans,
        gst_number,
    });
    if (user) { 
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phone_number: user.phone_number,
            email: user.email,
            aadhar: user.aadhar,
            pan: user.pan,
            business_description: user.business_description,
            previous_micro_loans: user.previous_micro_loans,
            gst_number: user.gst_number,
        });
    }
    else {
        res.status(400);
        throw new Error("User not found");
    }
});


//login user

const loginUser= asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const startTotal = Date.now();
    console.log(`[login] start - email=${email}`);
    console.time("[login] findOne");
    const user = await User.findOne({ email });
    console.timeEnd("[login] findOne");

    console.time("[login] bcryptCompare");
    const passwordMatches = user ? await bcryptjs.compare(password, user.password) : false;
    console.timeEnd("[login] bcryptCompare");

    const totalMs = Date.now() - startTotal;
    console.log(`[login] total ${totalMs}ms`);

    if (user && passwordMatches) {
        res.status(200).json({  
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const uploadUserPan = asyncHandler(async (req, res) => {
  console.log("👉 uploadUserPan HIT, params =", req.params);

  const { userId } = req.params;

  if (!req.file) {
    console.log("❌ NO FILE RECEIVED");
    res.status(400);
    throw new Error("PAN image file is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const file = req.file;
  console.log("✅ FILE RECEIVED:", {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });

  const extension = file.mimetype.split("/")[1] || "jpg";
  const fileName = `users/pan/${userId}-${Date.now()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("documents")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    });

  if (error) {
    console.error("Supabase upload error:", error);
    res.status(500);
    throw new Error("Failed to upload PAN to storage");
  }

  const { data: publicData } = supabase.storage
    .from("documents")
    .getPublicUrl(fileName);

  const publicUrl = publicData.publicUrl;

  user.documents = user.documents || {};
  user.documents.panUrl = publicUrl;
  await user.save();

  res.status(200).json({
    message: "PAN uploaded successfully",
    panUrl: publicUrl
  });
});

const getUserPanUrl = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // find user and only fetch documents field
  const user = await User.findById(userId).select("documents");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const panUrl = user.documents?.panUrl;
  if (!panUrl) {
    return res.status(404).json({ error: "PAN image not uploaded yet" });
  }

  return res.status(200).json({ panUrl });
});



module.exports= { createUser, loginUser, uploadUserPan, getUserPanUrl };


