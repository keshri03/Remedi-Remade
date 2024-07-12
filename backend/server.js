const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const Medicine = require("./models/medicine");
const User = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");

const { generateJwtToken, authenticateUser } = require("./jwt");

app.use(bodyParser.json());

const port = 4000;
app.listen(port, () => {
  console.log("Sun raha h 4000 portwa par");
});

app.post("/register", async (req, res) => {
  const { username, name, email, password, phone, type } = req.body;

  try {
    // Check if user exists with the provided email or phone number
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email or phone number",
      });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with hashed password
    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
      phone,
      type,
    });

    // Save user to database
    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    const token = generateJwtToken(payload);
    res
      .status(200)
      .json({
        message: "User registered successfully",
        user: newUser,
        token: token,
      });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const payload = {
      id: user._id,
    };
    const token = generateJwtToken(payload);
    res
      .status(200)
      .json({
        message: "Login successfully",
        user: user,
        token: token,
      });

    // Password is correct, proceed with authentication
    res.redirect("/success");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
});

app.get("/success", (req, res) => {
  res.send({
    success: true,
  });
});

app.get("/user", async (req, res) => {
  try {
    // Find the user by username and populate the medicines field
    const foundUser = await User.findOne({
      username: req.body.username,
    }).populate("medicines");

    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send the found user as response
    res.status(200).json({ success: true, user: foundUser });
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({
      success: false,
      message: "Failed to find user",
      error: err.message,
    });
  }
});

app.post("/medicine", async (req, res) => {
  const details = {
    medNameAndStrength: req.body.medNameAndStrength,
    quantityType: req.body.quantityType,
    availableQuantity: req.body.availableQuantity,
    totalQuantity: req.body.totalQuantity,
    totalPrice: req.body.totalPrice,
    totalWorth: req.body.totalWorth,
    expiryDate: req.body.expiryDate,
    ndc: req.body.ndc,
    username: req.body.username,
    address: req.body.address,
    status: req.body.status,
    listDate: req.body.listDate,
  };

  try {
    const medicine = await Medicine.create(details);
    const foundUser = await User.findOne({ email: details.username });

    if (foundUser) {
      foundUser.totalPriceDonated += details.totalWorth;
      foundUser.numDonations++;

      if (foundUser.numDonations <= 10) foundUser.level = 1;
      else if (foundUser.numDonations > 10 && foundUser.numDonations <= 25)
        foundUser.level = 2;
      else if (foundUser.numDonations > 25 && foundUser.numDonations <= 50)
        foundUser.level = 3;
      else if (foundUser.numDonations > 50 && foundUser.numDonations <= 100)
        foundUser.level = 4;
      else foundUser.level = 5;
      foundUser.medicines.push(medicine._id);
      const data = await foundUser.save();
      res.send({ success: true, userDetails: data });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "An error occurred" });
  }
});

app.get("/allmedicines", async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.status(200).json({ success: true, medicines: medicines });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch medicines",
        error: error.message,
      });
  }
});

app.get("/getMedicine", async (req, res) => {
  // console.log("called");
  try {
    const query = req.body.query; // Assuming query parameter is used here

    const foundMeds = await Medicine.find({ medNameAndStrength: query });
    if (!foundMeds) {
      return res.status(400).json({ err: "medince not found" });
    }

    res.json({ success: true, foundMeds: foundMeds });
  } catch (error) {
    console.error("Error finding medicines:", error);
    res.status(500).json({
      success: false,
      message: "Failed to find medicines",
      error: error.message,
    });
  }
});

//search medicines
app.get("/medicines/search", async (req, res) => {
  const { query } = req.query;
  // or example, if your URL is / medicines / search ? query = paracetamol, req.query will be { query: 'paracetamol' },
  // and const { query } = req.query; will extract 'paracetamol' into the variable query.

  try {
    const foundMedicines = await Medicine.find({
      medNameAndStrength: { $regex: query, $options: "i" },
    });
    if (foundMedicines.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No medicines found matching the search criteria",
        });
    }
    res.status(200).json({ success: true, medicines: foundMedicines });
  } catch (error) {
    console.error("Error searching medicines:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to search medicines",
        error: error.message,
      });
  }
});

// Update a specific medicine by ID
app.put("/medicines/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedMedicine) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    }
    res.status(200).json({ success: true, medicine: updatedMedicine });
  } catch (error) {
    console.error("Error updating medicine:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update medicine",
        error: error.message,
      });
  }
});

app.post("/collect", async (req, res) => {
  const { email, id } = req.body;

  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Step 2: Check if user is an NGO
    if (user.type !== "ngo") {
      return res.status(403).json({
        success: false,
        message: "User is not authorized to collect medicine",
      });
    }

    // Step 3: Find the medicine by id and update its status to "collected"
    const medicine = await Medicine.findOne({ _id: id });

    if (!medicine) {
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    }

    medicine.status = "collected";
    const updatedMedicine = await medicine.save();

    // Step 4: Update user's medicines array with the collected medicine
    user.medicines.push(updatedMedicine);
    const updatedUser = await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("ho gaya start");
});