import React, { useEffect, useState } from "react"
import { Grid, Table, Icon, Button, Form } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  createVendor,
  deleteVendor,
  getVendors,
} from "../../actions/vendorActions"
import { getCategs } from "../../actions/categActions"

const VendorsList = ({ history }) => {
  const auth = useSelector((state) => state.auth)
  const { loading, userInfo } = auth

  const categs = useSelector((state) => state.categsGet.categs)

  const vendorCreate = useSelector((state) => state.vendorCreate)
  const { vendor: newVendor, errors } = vendorCreate

  const vendorDelete = useSelector((state) => state.vendorDelete)
  const { success } = vendorDelete

  const dispatch = useDispatch()
  const { loading: loadingVendors, vendors } = useSelector(
    (state) => state.vendorsGet
  )

  // const [errors, setErrors] = useState([])

  const [values, setValues] = useState({
    name: "",
    address: "",
    tel: "",
    categ: "",
    initBalance: 0,
    rate: 1.22,
    plus: 0,
    notes: "",
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(values.username)
    dispatch(
      createVendor({
        ...values,
      })
    )
  }

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      history.push("/login")
    }

    dispatch(getCategs())
    dispatch(getVendors())
  }, [history, userInfo, dispatch, newVendor, success])

  const deleteHandler = (id) => {
    console.log(id)
    if (window.confirm("Are you sure")) {
      dispatch(deleteVendor(id))
    }
  }

  return (
    <>
      <Grid>
        <Grid.Row>
          <h1>Vendors</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            {userInfo ? (
              <div>
                <Form
                  onSubmit={onSubmit}
                  noValidate
                  className={loading ? "loading" : ""}
                >
                  <Form.Input
                    label="name"
                    placeholder="name.."
                    name="name"
                    type="text"
                    value={values.name}
                    error={errors && errors.name ? true : false}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Address"
                    placeholder="Address.."
                    name="address"
                    type="text"
                    value={values.address}
                    onChange={onChange}
                  />

                  <Form.Field
                    label="Categ"
                    name="categ"
                    control="select"
                    value={values.categ}
                    error={errors && errors.categ ? true : false}
                    onChange={onChange}
                  >
                    {categs &&
                      categs.map((categ) => (
                        <option key={categ._id} value={categ._id}>
                          {categ.name}
                        </option>
                      ))}
                  </Form.Field>

                  <Form.Input
                    label="Initial Balance"
                    placeholder="Initial Balance.."
                    name="initBalance"
                    type="number"
                    value={values.initBalance}
                    //   error={errors.password ? true : false}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Rate"
                    placeholder="Rate.."
                    name="rate"
                    type="number"
                    value={values.rate}
                    //   error={errors.password ? true : false}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Plus"
                    placeholder="Plus.."
                    name="plus"
                    type="text"
                    value={values.plus}
                    //   error={errors.password ? true : false}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Notes"
                    placeholder="Notes.."
                    name="notes"
                    type="text"
                    value={values.notes}
                    //   error={errors.password ? true : false}
                    onChange={onChange}
                  />
                  <Button type="submit" primary icon labelPosition="left">
                    <Icon name="plus" />
                    Create
                  </Button>
                </Form>
                <div>
                  <br />
                  {errors && Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                      <ul className="list">
                        {Object.values(errors).map((value) => (
                          <li key={value}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Grid.Column>
          <Grid.Column width={12}>
            <Table
              celled
              selectable
              className={loadingVendors ? "loading" : ""}
            >
              <Table.Header>
                <Table.Row>
                  {/* <Table.HeaderCell>ID</Table.HeaderCell> */}
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Tel</Table.HeaderCell>
                  <Table.HeaderCell>Categ</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Plus</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {vendors &&
                  vendors.length > 0 &&
                  vendors.map((vendor) => (
                    <Table.Row key={vendor._id}>
                      {/* <Table.Cell>{vendor.id}</Table.Cell> */}
                      <Table.Cell>{vendor.name}</Table.Cell>
                      <Table.Cell>{vendor.address}</Table.Cell>
                      <Table.Cell>{vendor.tel}</Table.Cell>
                      <Table.Cell>{vendor.categ.name}</Table.Cell>
                      <Table.Cell>{vendor.rate}</Table.Cell>
                      <Table.Cell>{vendor.plus}</Table.Cell>
                      <Table.Cell>{vendor.notes}</Table.Cell>
                      <Table.Cell>
                        <Button icon>
                          <Icon name="edit" />
                        </Button>
                        {userInfo && userInfo.role === "admin" && (
                          <Button
                            type="button"
                            icon
                            onClick={() => deleteHandler(vendor._id)}
                          >
                            <Icon name="delete" />
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default VendorsList
