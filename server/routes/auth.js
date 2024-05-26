// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


// const User = require("../models/User");


// router.post("/register", async (req, res) => {
//   try {
   
//     const { firstname, lastname, email, phone_number , password } = req.body;

    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists!" });
//     }

//     /* Hass the password */
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     /* Create a new User */
//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       phone_number,
//       password: hashedPassword
    
//     });

//     /* Save the new User */
//     await newUser.save();

//     /* Send a successful message */
//     res
//       .status(200)
//       .json({ message: "User registered successfully!", user: newUser });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ message: "Registration failed!", error: err.message });
//   }
// });

// /* USER LOGIN*/
// router.post("/login", async (req, res) => {
//   try {
//     /* Take the infomation from the form */
//     const { email, password } = req.body

//     /* Check if user exists */
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(409).json({ message: "User doesn't exist!" });
//     }

//     /* Compare the password with the hashed password */
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Credentials!"})
//     }

//     /* Generate JWT token */
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
//     delete user.password

//     res.status(200).json({ token, user })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message })
//   }
// })

// module.exports = router

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, phone_number, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User
    const newUser = new User({
      firstname,
      lastname,
      email,
      phone_number,
      password: hashedPassword
    });

    // Save the new User
    await newUser.save();

    // Send a successful message
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.password = undefined; // Remove password from the user object before sending

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
