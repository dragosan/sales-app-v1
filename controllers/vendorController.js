import asyncHandler from "express-async-handler"

import Vendor from "../models/Vendor.js"
import { validateInput } from "../utils/validators.js"

//@route GET /api/vendors @desc get all vendors @access private
export const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({}).populate("categ", "id name")
  return res.json(vendors)
})

//@route POST /api/vendors @desc add new vendor @access private
export const createVendor = asyncHandler(async (req, res) => {
  const { name, address, tel, categ, initBalance, rate, plus, notes } = req.body

  const { valid, errors } = validateInput({
    name,
    categ,
  })
  if (!valid) {
    //console.log(errors)
    return res.json({ errors })
  }

  let vendor = await Vendor.findOne({ name })
  if (vendor) {
    errors.vendor = "vendor already exists"
    return res.json({ errors })
  }

  try {
    vendor = new Vendor({
      name,
      address,
      tel,
      categ,
      initBalance,
      rate,
      plus,
      notes,
    })
    vendor = await vendor.save()
    res.status(201).json(vendor)
  } catch (err) {
    errors.general = "Invalid  data"
    return res.json({ errors })
  }
})

//@route DELETE /api/vendors/:id @desc delete vendor @access private/admin
export const deleteVendor = asyncHandler(async (req, res) => {
  const id = req.params.id
  const vendor = await Vendor.findById(id)
  if (vendor) {
    await vendor.remove()
    res.json({
      message: "vendor deleted",
    })
  } else {
    res.status(401)
    throw new Error("Something went wrong ,try again later")
  }
})
