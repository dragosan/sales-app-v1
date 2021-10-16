import React, { useEffect, useState } from "react"
import { Form, Grid, Button, Icon } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { getCategs } from "../../actions/categActions"
import { getTypes } from "../../actions/typeActions"
import { getVendors } from "../../actions/vendorActions"
import { getItem } from "../../actions/itemActions"
import Loader from "../layout/Loader"

const Item = ({ match }) => {
  const id = match.params.id
  const itemGet = useSelector((state) => state.itemGet)
  const { loading, item } = itemGet

  const categsGet = useSelector((state) => state.categsGet)
  const { categs } = categsGet

  const typesGet = useSelector((state) => state.typesGet)
  const { types } = typesGet

  const vendorsGet = useSelector((state) => state.vendorsGet)
  const { vendors } = vendorsGet

  const dispatch = useDispatch()

  const [values, setValues] = useState({
    itemArticle: item && item.itemArticle ? item.itemArticle : "",
    itemVnArticle: item && item.itemVnArticle ? item.itemVnArticle : "",
    itemName: item && item.itemName ? item.itemName : "",
    categ: item && item.categ ? item.categ : "",
    type: item && item.type ? item.type : "",
    vendor: item && item.vendor ? item.vendor : "",
    custPrice: item && item.custPrice ? item.custPrice : 0,
    vnPrice: item && item.vnPrice ? item.vnPrice : 0,
    barcode: item && item.barcode ? item.barcode : "",
    itemInitBal: item && item.itemInitBal ? item.itemInitBal : 0,
    itemOrderLimit: item && item.itemOrderLimit ? item.itemOrderLimit : 10,
    itemColor: item && item.itemColor ? item.itemColor : "black",
    itemSize: item && item.itemSize ? item.itemSize : 40,
    notes: item && item.notes ? item.notes : "",
  })

  // const [values, setValues] = useState({ ...item })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(getItem(match.params.id))
    dispatch(getCategs())
    dispatch(getTypes())
    dispatch(getVendors())
  }, [dispatch, id])

  const updateItem = () => {
    //update item
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid divided="vertically" columns="equal">
      <Grid.Row>
        <Grid.Column></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Group>
              <Form.Field
                label="Vendor"
                control="select"
                width={4}
                name="vendor"
                value={values.vendor}
                onChange={onChange}
              >
                {vendors &&
                  vendors.map((vendor) => (
                    <option value={vendor._id}>{vendor.name}</option>
                  ))}
              </Form.Field>

              <Form.Field
                label="Categ"
                control="select"
                width={4}
                name="categ"
                value={values.categ}
                onChange={onChange}
              >
                {categs &&
                  categs.map((categ) => (
                    <option value={categ._id}>{categ.name}</option>
                  ))}
              </Form.Field>
              <Form.Field
                label="Type"
                control="select"
                width={4}
                name="type"
                onChange={onChange}
                value={values.type}
              >
                {types &&
                  types.map((type) => (
                    <option value={type._id}>{type.name}</option>
                  ))}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field
                label="Article"
                control="input"
                type="text"
                name="itemArticle"
                placeholder="Article"
                value={values.itemArticle}
                onChange={onChange}
                width={4}
              />
              <Form.Field
                label="Vendor Article"
                control="input"
                type="text"
                placeholder="Vendor Article"
                name="itemVnArticle"
                onChange={onChange}
                value={values.itemVnArticle}
                width={4}
              />
              <Form.Field
                label="Name"
                control="input"
                placeholder="Name"
                width={4}
                name="itemName"
                value={values.itemName}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Field
                label="Cost Price"
                control="input"
                type="Number"
                min="0"
                placeholder="Cost Price"
                name="vnPrice"
                value={values.vnPrice}
                onChange={onChange}
                width={3}
              />
              <Form.Field
                label="Sale Price"
                control="input"
                type="Number"
                min="0"
                placeholder="Sale Price"
                name="custPrice"
                value={values.custPrice}
                onChange={onChange}
                width={3}
              />
              <Form.Field
                label="Initial Balance"
                control="input"
                type="Number"
                min="0"
                placeholder="Initial Balance"
                name="itemInitBal"
                value={values.itemInitBal}
                onChange={onChange}
                width={3}
              />
              <Form.Field
                label="Limit Order"
                control="input"
                type="Number"
                min="0"
                placeholder="Limit Order"
                name="itemOrderLimit"
                value={values.itemOrderLimit}
                onChange={onChange}
                width={3}
              />
            </Form.Group>
            <Button
              type="submit"
              primary
              icon
              labelPosition="left"
              onClick={updateItem}
            >
              <Icon name="plus" />
              Update
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Item
