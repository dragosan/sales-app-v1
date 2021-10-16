import React, { useEffect, useState } from "react"
import { Grid, Table, Icon, Button, Form, Loader } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { createUser, deleteUser, getUsers } from "../../actions/userActions"

const UsersList = ({ history }) => {
  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  const roles = ["user", "manager", "admin"]

  const userCreate = useSelector((state) => state.userCreate)
  const { success: successCreate, errors } = userCreate

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const dispatch = useDispatch()
  const { loading: loadingUsers, users } = useSelector(
    (state) => state.usersGet
  )

  // const [errors, setErrors] = useState([])

  const [values, setValues] = useState({
    username: "",
    email: "",
    role: "user",
    password: "",
    confirmedPassword: "",
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(errors)
    dispatch(
      createUser({
        ...values,
      })
    )
  }

  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      history.push("/login")
    }
    dispatch(getUsers())
  }, [userInfo, history, dispatch, successCreate, successDelete])

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure")) {
      if (user.role === "admin") {
        window.alert("admin cannot be deleted")
        return
      }
      dispatch(deleteUser(user._id))
    }
  }

  return (
    <>
      <Grid>
        <Grid.Row>
          <h1>Users</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            {userInfo ? (
              <div>
                <Form
                  onSubmit={onSubmit}
                  noValidate
                  className={loadingUsers ? "loading" : ""}
                >
                  <Form.Input
                    label="username"
                    placeholder="username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors && errors.username ? true : false}
                    onChange={onChange}
                  />
                  <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors && errors.email ? true : false}
                    onChange={onChange}
                  />
                  <Form.Field
                    label="Role"
                    name="role"
                    control="select"
                    value={values.role}
                    // error={errors && errors.role ? true : false}
                    onChange={onChange}
                  >
                    {roles &&
                      roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                  </Form.Field>

                  <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors && errors.password ? true : false}
                    onChange={onChange}
                  />

                  <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmedPassword"
                    type="password"
                    value={values.confirmedPassword}
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
          <Grid.Column width={11}>
            <Table celled selectable className={loadingUsers ? "loading" : ""}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>ٌRole</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {users &&
                  users.length > 0 &&
                  users.map((user) => (
                    <Table.Row key={user._id}>
                      <Table.Cell>{user._id}</Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <Button icon>
                          <Icon name="edit" />
                        </Button>
                        <Button
                          type="button"
                          icon
                          onClick={() => deleteHandler(user)}
                        >
                          <Icon name="delete" />
                        </Button>
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

export default UsersList
