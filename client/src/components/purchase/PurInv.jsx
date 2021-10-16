import React, { useEffect, useState } from "react"
import { Form, Grid, Button, Icon } from "semantic-ui-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from "react-redux"
import { getItems } from "../../actions/itemActions"
import { getCategs } from "../../actions/categActions"
import { getTypes } from "../../actions/typeActions"
import { getVendors } from "../../actions/vendorActions"
import PurModal from "./PurModal"
import { createPurchase } from "../../actions/purchaseActions"
import MessageInfo from "../layout/Message"

const PurInv = ({ history }) => {
  let purchaseDetails = []
  const [qty, setQty] = useState(10)
  const [total, setTotal] = useState(0)
  const [custPrice, setCustPrice] = useState(0)
  const [item, setItem] = useState({
    itemArticle: "",
    custPrice: 0,
    vnPrice: 0,
    barcode: "",
    itemBal: 0,
    itemOrderLimit: 10,
    itemColor: "Black",
    itemSize: 40,
    notes: "",
  })
  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const itemsGet = useSelector((state) => state.itemsGet)
  const { items } = itemsGet

  // const categsGet = useSelector((state) => state.categsGet)
  // const { categs } = categsGet

  // const typesGet = useSelector((state) => state.typesGet)
  // const { types } = typesGet

  const vendorsGet = useSelector((state) => state.vendorsGet)
  const { vendors } = vendorsGet

  const purchaseCreate = useSelector((state) => state.purchaseCreate)
  const { purchase, errors } = purchaseCreate

  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState(new Date())

  const [values, setValues] = useState({
    serial: 0,
    vendor: "",
    contact: "",
    notes: "",
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const addPurchase = (e) => {
    purchaseDetails.push({
      item: item._id,
      quantity: qty,
      priceCust: custPrice,
      priceVn: item.vnPrice,
      total,
    })
    //console.log({ ...values, purchaseDetails })
    dispatch(createPurchase({ ...values, purchaseDetails }))
  }

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      history.push("/login")
    }

    dispatch(getItems())
    dispatch(getCategs())
    dispatch(getTypes())
    dispatch(getVendors())
  }, [userInfo, history, purchase])

  // const selectItem = (e) => {
  //   if (e.charCode === 13) {
  //     console.log(e.target)
  //     console.log([...items])
  //     const selectedItem = [...items].find(
  //       (e) => e.itemArticle === e.target.value
  //     )
  //     if (selectedItem) {
  //       setItem({ ...selectedItem })
  //     }
  //   }
  // }

  return (
    <>
      <Grid divided="vertically" columns="equal">
        <Grid.Row>
          <Grid.Column>
            {!items || items.length < 1 ? (
              <MessageInfo
                variant="warning"
                header="info"
                text="Must add items first"
              ></MessageInfo>
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <PurModal
            modalOpen={modalIsOpen}
            setModal={setModalIsOpen}
            items={items}
            item={item}
            custPrice={custPrice}
            setCustPrice={setCustPrice}
            setItem={setItem}
            total={total}
            setTotal={setTotal}
          />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={13}>
            <Form>
              <Form.Group>
                <DatePicker
                  name="date"
                  selected={startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setStartDate(date)}
                  maxDate={new Date()}
                  filterDate={(date) =>
                    date.getDay() !== 6 && date.getDay() !== 0
                  }
                  isClearable
                  scrollableYearDropdown
                />
              </Form.Group>
              <Form.Group>
                <Form.Field
                  label="Vendor"
                  name="vendor"
                  control="select"
                  value={values.vendor}
                  onChange={onChange}
                >
                  {vendors &&
                    vendors.map((vendor) => (
                      <option key={vendor._id} value={vendor._id}>
                        {vendor.name}
                      </option>
                    ))}
                </Form.Field>
                <Form.Field
                  label="Serial"
                  control="input"
                  type="text"
                  placeholder="Serial"
                  name="serial"
                  value={values.serial}
                  width={4}
                  onChange={onChange}
                />
                <Form.Field
                  label="Contact"
                  control="input"
                  type="text"
                  placeholder="Contact"
                  name="contact"
                  value={values.contact}
                  width={4}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Field
                  label="Notes"
                  control="input"
                  type="text"
                  placeholder="Notes"
                  name="vnPrice"
                  value={values.vnPrice}
                  width={12}
                  onChange={onChange}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column width={3}>
            {errors && Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {/* <PurchaseForm selectItem = { selectItem } onChange = { onChange }  /> */}
            <Form>
              <Form.Group>
                <Form.Field
                  label="Item"
                  control="input"
                  name="itemArticle"
                  type="text"
                  placeholder="Item"
                  value={item.itemArticle}
                  onChange={onChange}
                  onDoubleClick={() => setModalIsOpen(true)}
                  // onKeyPress={selectItem}
                  // onKeyDown={() => alert("i")}
                  width={4}
                />
                <Form.Field
                  label="Name"
                  control="input"
                  name="itemName"
                  type="text"
                  placeholder="Article"
                  value={item.itemName}
                  width={4}
                />
                <Form.Field
                  label="Quantity"
                  control="input"
                  name="qty"
                  type="number"
                  placeholder="Quantity"
                  value={qty}
                  width={4}
                  onChange={function (e) {
                    setQty(e.target.value)
                    setTotal(e.target.value * custPrice)
                  }}
                />
                <Form.Field
                  label="Price"
                  control="input"
                  name="custPrice"
                  type="number"
                  placeholder="Price"
                  value={custPrice}
                  width={4}
                  onChange={{
                    function(e) {
                      setCustPrice(e.target.value)
                      setTotal(custPrice * qty)
                    },
                  }}
                />

                <Form.Field
                  disabled
                  label="Total"
                  control="input"
                  type="number"
                  placeholder="Total"
                  value={total}
                  defaultValue={0}
                  width={4}
                />

                <Form.Field
                  disabled
                  label="Balance"
                  control="input"
                  type="number"
                  value={item.itemBal}
                  defaultValue={0}
                  width={4}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}></Grid.Column>
          <Grid.Column>
            <h3>Subtotal : {total}</h3>
            <h3>Tax : 10% </h3>
            <h3>Total : {total + total * 0.1}</h3>
            <Button
              type="submit"
              primary
              icon
              labelPosition="left"
              disabled={!item || !item.itemName}
              onClick={addPurchase}
            >
              <Icon name="plus" />
              Create
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default PurInv
