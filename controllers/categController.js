import asyncHandler from "express-async-handler"

import Categ from "../models/Categ.js"

//@route GET /api/categs @desc get all categs @access private
export const getCategs = asyncHandler(async (req, res) => {
  const categs = await Categ.find({})
  return res.json(categs)
})

//@route POST /api/categs @desc add new categ @access private
export const createCateg = asyncHandler(async (req, res) => {
  const { name, notes } = req.body

  let categ = await Categ.findOne({ name })
  if (categ) {
    res.status(400)
    throw new Error("categ already exists")
  }

  try {
    categ = new Categ({
      name,
      notes,
    })
    categ = await categ.save()
    res.status(201).json(categ)
  } catch (err) {
    res.status(400)
    throw new Error("Invalid  data")
  }
})

//@route DELETE /api/categs/:id @desc delete categ @access private/admin
export const deleteCateg = asyncHandler(async (req, res) => {
  const id = req.params.id
  const categ = await Categ.findById(id)
  if (categ) {
    await categ.remove()
    res.json({
      message: "categ deleted",
    })
  } else {
    res.status(401)
    throw new Error("Something went wrong ,try again later")
  }
})
