import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Grid, Table, Button, Icon } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { createItem, deleteItem, getItems } from "../../actions/itemActions"
import { getCategs } from "../../actions/categActions"
import { getTypes } from "../../actions/typeActions"
import { getVendors } from "../../actions/vendorActions"
import MessageInfo from "../layout/Message"

const ItemsList = ({ history }) => {
  const itemsGet = useSelector((state) => state.itemsGet)
  const { loading: loadingItems, items } = itemsGet
  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  const categsGet = useSelector((state) => state.categsGet)
  const { categs } = categsGet

  const typesGet = useSelector((state) => state.typesGet)
  const { types } = typesGet

  const vendorsGet = useSelector((state) => state.vendorsGet)
  const { vendors } = vendorsGet

  const itemsCreate = useSelector((state) => state.itemsCreate)
  const { success: successCreate, errors } = itemsCreate

  const itemDelete = useSelector((state) => state.itemDelete)
  const { success: successDelete } = itemDelete

  const dispatch = useDispatch()

  const [values, setValues] = useState({
    itemArticle: "",
    itemVnArticle: "",
    itemName: "",
    categ: categs ? categs[0]._id : "",
    type: types ? types[0]._id : "",
    vendor: vendors && vendors.length > 0 ? vendors[0]._id : "",
    custPrice: 0,
    vnPrice: 0,
    barcode: "",
    itemInitBal: 0,
    itemOrderLimit: 10,
    itemColor: "Black",
    itemSize: 40,
    notes: "",
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      history.push("/login")
    }
    dispatch(getItems())
    dispatch(getCategs())
    dispatch(getTypes())
    dispatch(getVendors())
  }, [userInfo, history, dispatch, successCreate, successDelete])

  const addItem = () => {
    dispatch(createItem({ ...values }))
  }

  const deleteHandler = (id) => {
    console.log(id)
    if (window.confirm("Are you sure")) {
      dispatch(deleteItem(id))
    }
  }

  return (
    <Grid divided="vertically" columns="equal">
      <Grid.Row>
        <Grid.Column>
          {!vendors || vendors.length < 1 ? (
            <MessageInfo
              variant="warning"
              header="info"
              text="Must add vendors first"
            ></MessageInfo>
          ) : null}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={13}>
          <Form>
            <Form.Group>
              <Form.Field
                label="Vendor"
                control="select"
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
                error={errors && errors.itemArticle ? true : false}
                onChange={onChange}
              />
              <Form.Field
                label="Vendor Article"
                control="input"
                type="text"
                placeholder="Vendor Article"
                name="itemVnArticle"
                onChange={onChange}
                value={values.itemVnArticle}
              />
              <Form.Field
                label="Name"
                control="input"
                placeholder="Name"
                name="itemName"
                value={values.itemName}
                error={errors && errors.itemName ? true : false}
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
              />
            </Form.Group>
            <Button
              type="submit"
              primary
              icon
              labelPosition="left"
              onClick={addItem}
            >
              <Icon name="plus" />
              Create
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={3}>
          {errors && Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Table celled selectable className={loadingItems ? "loading" : ""}>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell>ID</Table.HeaderCell> */}
                <Table.HeaderCell>Article</Table.HeaderCell>
                <Table.HeaderCell>VenArticle</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Categ</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Vendor</Table.HeaderCell>
                <Table.HeaderCell>custPrice</Table.HeaderCell>
                <Table.HeaderCell>vnPrice</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>Color</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items &&
                items.length > 0 &&
                items.map((item) => (
                  <Table.Row key={item._id}>
                    {/* <Table.Cell>{item.id}</Table.Cell> */}
                    <Table.Cell>{item.itemArticle}</Table.Cell>
                    <Table.Cell>{item.itemVnArticle}</Table.Cell>
                    <Table.Cell>{item.itemName}</Table.Cell>
                    <Table.Cell>{item.categ.name}</Table.Cell>
                    <Table.Cell>{item.type.name}</Table.Cell>
                    <Table.Cell>
                      {item.vendor ? item.vendor.name : "vendor deleted"}
                    </Table.Cell>
                    <Table.Cell>{item.custPrice}</Table.Cell>
                    <Table.Cell>{item.vnPrice}</Table.Cell>
                    <Table.Cell>{item.itemSize}</Table.Cell>
                    <Table.Cell>{item.itemColor}</Table.Cell>
                    <Table.Cell>{item.notes}</Table.Cell>
                    <Link to={`/items/${item._id}`}>
                      <Button icon>
                        <Icon name="edit" />
                      </Button>
                    </Link>
                    {userInfo && userInfo.role === "admin" && (
                      <Button
                        type="button"
                        icon
                        onClick={() => deleteHandler(item._id)}
                      >
                        <Icon name="delete" />
                      </Button>
                    )}
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ItemsList
