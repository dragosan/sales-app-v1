import asyncHandler from "express-async-handler"

import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"
import {
  validateLoginInput,
  validateRegisterInput,
} from "../utils/validators.js"

//@route GET /api/users @desc get all users @access private/admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  return res.json(users)
})

//@route GET /api/users @desc get all users @access private
export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
  if (user) {
    return res.json(user)
  } else {
    return res.status(404).json("User Not Found")
  }
})

//@route POST /api/users/login @desc login user @access public
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const { errors, valid } = validateLoginInput(username, password)

  if (!valid) {
    //console.log(errors)
    return res.json({ errors })
  }

  const user = await User.findOne({ username })

  if (user && (await user.matchPassword(password))) {
    return res.json({
      ...user._doc,
      id: user._id,
      token: generateToken(user),
    })
  } else {
    errors.error = "Invalid username or password"
    return res.json({ errors })
  }
})

//@route POST /api/users @desc add new user @access private
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, role, password, confirmedPassword } = req.body

  const { valid, errors } = validateRegisterInput(
    username,
    email,
    role,
    password,
    confirmedPassword
  )
  if (!valid) {
    return res.json({ errors })
  }

  let user = await User.findOne({ username })
  if (user) {
    errors.user = "user already exists"
    // res.status(400)
    // throw new Error("user already exists")
    return res.json({ errors })
  }

  user = await User.findOne({ email })
  if (user) {
    errors.registered = "this email is taken"
    return res.json({ errors })
  }

  user = await User.create({
    username,
    email,
    role,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    errors.general = "Invalid  data"
    return res.json({ errors })
  }
})

//@route DELETE /api/vendors/:id @desc delete vendor @access private/admin
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
  if (user) {
    await user.remove()
    res.json({
      message: "user deleted",
    })
  } else {
    res.status(401)
    throw new Error("Something went wrong ,try again later")
  }
})
