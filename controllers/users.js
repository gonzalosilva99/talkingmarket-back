import bcrypt from 'bcryptjs';
import { UserDao } from '../dao/user.dao.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js' 

export var userController = { 
    loginUser: loginUser,
    registerUser: registerUser,
    getOrdersOfUser: getOrdersOfUser
}

async function loginUser(req,res){
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: {email: email}});

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    else 
      res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}

async function registerUser(req,res){
  try {
    // Get user input
    const { firstname, lastname, email, password, image, birthday, isOwner } = req.body;

    // Validate user input
    if (!(email && password && firstname && lastname && birthday)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: {email: email}});

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user =  UserDao.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      image,
      birthday,// sanitize: convert email to lowercase
      password: encryptedPassword,
      isOwner
    });

    // Create token
    const token = jwt.sign(
      { user: user },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

function getOrdersOfUser(req, res){
  
}
