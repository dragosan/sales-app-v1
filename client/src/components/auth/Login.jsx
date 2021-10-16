import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { login } from "../../actions/userActions"

const Login = ({ history }) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  // const [errors, setErrors] = useState({})

  const auth = useSelector((state) => state.auth)
  const { userInfo, errors } = auth

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push("/")
    }
  }, [history, userInfo])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(values.username, values.password))
    // if(errors && Object)
  }

  // errors && console.log(Object.values(errors))

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors && errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors && errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {errors && Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.keys(errors).map((keyName, i) => (
              <li key={i}>{errors[keyName]}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <br />
        <h4>
          Don't have an account
          <Link to="/register">{"  "} Sign Up here</Link>
        </h4>
      </div>
    </div>
  )
}

export default Login
