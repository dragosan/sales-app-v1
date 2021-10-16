import asyncHandler from "express-async-handler"

import Type from "../models/Type.js"

//@route GET /api/types @desc get all types @access private
export const getTypes = asyncHandler(async (req, res) => {
  const types = await Type.find({})
  return res.json(types)
})

//@route POST /api/types @desc add new type @access private
export const createType = asyncHandler(async (req, res) => {
  const { name, notes } = req.body

  let type = await Type.findOne({ name })
  if (type) {
    res.status(400)
    throw new Error("type already exists")
  }

  try {
    type = new Type({
      name,
      notes,
    })
    type = await type.save()
    res.status(201).json(type)
  } catch (err) {
    res.status(400)
    throw new Error("Invalid  data")
  }
})

//@route DELETE /api/types/:id @desc delete type @access private/admin
export const deleteType = asyncHandler(async (req, res) => {
  const id = req.params.id
  const type = await Type.findById(id)
  if (type) {
    await type.remove()
    res.json({
      message: "type deleted",
    })
  } else {
    res.status(401)
    throw new Error("Something went wrong ,try again later")
  }
})
