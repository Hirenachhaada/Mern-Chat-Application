const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // if user does not exist then create a new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // if user is created then send the user details

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser= await = asyncHandler(async(req,res)=>{
     const {email, password} = req.body;
     const user = await User.findOne({email});
     if(user && (await user.matchPassword(password))){
            res.json({
                 _id: user._id,
                 name: user.name,
                 email: user.email,
                 pic: user.pic,
                 token: generateToken(user._id),
            })
     }
     else{
            res.status(401);
            throw new Error("Invalid email or password");
     }
});

// asking query using the url
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search?{
    $or: [
      {name: {$regex: req.query.search, $options: 'i'}},
      {email: {$regex: req.query.search, $options: 'i'}},
    ]
  }:{};

  const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
  res.send(users);
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  console.log(id);
  try{
    const updated = await User.findById(id);
    console.log(req.body.name);
    console.log(req.body.name==undefined);
    if(req.body.name!=undefined){
      console.log("in if");
      updated.name = req.body.name }
      console.log(updated.name);
      console.log(req.body.pic=='');
    if(req.body.pic!=''){
      console.log("in if pic ")
    updated.pic = req.body.pic;
    }
  const updatedUser = await User.findByIdAndUpdate(id, updated);
  res.json(updatedUser);
}
catch(err){
  console.log(err);
}
  // const user = await User.findById(id);
  // console.log(req.body.pic);
  // if(user){
  //   user.name = req.body.name || user.name;
  //   user.pic = req.body.pic || user.pic;
    
  // }
  // else{
  //   res.status(404);
  //   throw new Error("User not found");
  // }
})


module.exports = { registerUser, authUser , allUsers, updateUser};
