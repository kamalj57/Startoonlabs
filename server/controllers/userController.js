const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (user) {
      const authpass = await bcrypt.compare(password, user.password);
      
      if (authpass) {
       
        user.count += 1; 
        user.lastLoginDate = Date.now();
        
        await user.save();

        return res.status(200).json({ msg: "success", user });
      } else {
        return res.status(401).json({ msg: "Invalid Password" });
      }
    } else {
      return res.status(404).json({ msg: "Invalid email" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error!" });
  }
};


const signupUser = async (req, res) => {
  const { name, email, password, gender } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: "Email Already Registered" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email: email, password: hashedPassword,gender });
    console.log(newUser)
    await newUser.save();
    return res.status(200).json({ msg: "User Created!",newUser });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ msg: "Server Error!" });
  }
};

const getUserData = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getAllUserData = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};


module.exports = { loginUser, signupUser,getUserData,getAllUserData};
