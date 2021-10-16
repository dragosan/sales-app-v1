import asyncHandler from "express-async-handler"

import Purchase from "../models/Purchase.js"
import Item from "../models/Item.js"
import { validateInput } from "../utils/validators.js"

//@route GET /api/purchases @desc get all purchases @access private
export const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({})
  return res.json(purchases)
})

//@route POST /api/purchases @desc add new purchase @access private
export const createPurchase = asyncHandler(async (req, res) => {
  const { serial, date, vendor, contact, notes, purchaseDetails } = req.body

  const { valid, errors } = validateInput({
    vendor,
  })

  if (purchaseDetails || purchaseDetails.length > 0) {
    errors.purchaseDetails = "Empty Invoice"
  }

  if (!valid) {
    //console.log(errors)
    return res.json({ errors })
  }

  let item
  let purchase = new Purchase({
    serial,
    date,
    vendor,
    contact,
    notes,
    purchaseDetails,
  })

  // let item
  // purchaseDetails.forEach((p) => {
  //   item = Item.findById(p.item._id)
  //   console.log(item)
  // })
  //console.log(purchase)
  item = await Item.findById(purchaseDetails[0].item)
  //console.log(item)
  if (item) {
    item.itemBal =
      parseInt(item.itemBal) + parseInt(purchaseDetails[0].quantity)
    await item.save()

    purchase = await purchase.save()

    if (purchase) {
      res.status(201).json({
        ...purchase._doc,
        _id: purchase._id,
      })
    } else {
      res.status(400)
      throw new Error("Invalid  data")
    }
  }
})
