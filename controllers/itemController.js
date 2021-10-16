import asyncHandler from "express-async-handler"

import Item from "../models/Item.js"
import { validateInput } from "../utils/validators.js"

//@route GET /api/items @desc get all items @access private
export const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({})
    .populate("vendor", "id name")
    .populate("categ", "id name")
    .populate("type", "id name")

  return res.json(items)
})

//@route GET /api/items/search @desc search items @access private
export const searchItems = asyncHandler(async (req, res) => {
  //console.log(req.body)
  const itemArticle = req.body
  const items = await Item.find({ itemArticle })
    .populate("vendor", "id name")
    .populate("categ", "id name")
    .populate("type", "id name")

  //console.log(items)
  return res.json(items)
})

//@route GET /api/items/:id @desc get item @access private
export const getItem = asyncHandler(async (req, res) => {
  const id = req.params.id
  const item = await Item.findById(id)
    .populate("vendor", "id name")
    .populate("categ", "id name")
    .populate("type", "id name")

  return res.json(item)
})

//@route POST /api/items @desc add new item @access private
export const createItem = asyncHandler(async (req, res) => {
  const {
    itemArticle,
    itemVnArticle,
    itemName,
    categ,
    type,
    vendor,
    custPrice,
    vnPrice,
    barcode,
    itemInitBal,
    itemOrderLimit,
    itemColor,
    itemSize,
    notes,
  } = req.body

  const { valid, errors } = validateInput({
    itemArticle,
    itemName,
    categ,
    type,
    vendor,
  })
  if (!valid) {
    //console.log(errors)
    return res.json({ errors })
  }

  let item = await Item.findOne({ itemName })
  if (item) {
    errors.item = "Item already exists"
    return res.json({ errors })
  }

  item = new Item({
    itemArticle,
    itemVnArticle,
    itemName,
    categ,
    type,
    vendor,
    custPrice,
    vnPrice,
    barcode,
    itemInitBal,
    itemOrderLimit,
    itemColor,
    itemSize,
    notes,
  })

  item = await item.save()

  if (item) {
    res.status(201).json({
      ...item._doc,
      _id: item._id,
    })
  } else {
    res.status(400)
    throw new Error("Invalid  data")
  }
})

//@route DELETE /api/items/:id @desc delete item @access private/admin
export const deleteItem = asyncHandler(async (req, res) => {
  const id = req.params.id
  const item = await Item.findById(id)
  if (item) {
    await item.remove()
    res.json({
      message: "item deleted",
    })
  } else {
    res.status(401)
    throw new Error("Something went wrong ,try again later")
  }
})
