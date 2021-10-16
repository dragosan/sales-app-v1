export const validateRegisterInput = (
  username,
  email,
  role,
  password,
  comfirmedPassword
) => {
  const errors = {}
  console.log(username, email, "password", password, comfirmedPassword)
  if (username.trim() === "") {
    errors.username = "Username must not be empty"
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty"
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address"
    }
  }
  if (role.trim() === "") {
    errors.role = "role must not be empty"
  }
  if (password === "") {
    errors.password = "Password must not empty"
  }
  if (password !== comfirmedPassword) {
    console.log(password, comfirmedPassword)
    errors.comfirmedPassword = "Passwords must match"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const validateLoginInput = (username, password) => {
  const errors = {}

  if (username.trim() === "") {
    errors.username = "Username must not be empty"
  }
  if (password === "") {
    errors.password = "Password must not empty"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const validateInput = (inputs) => {
  const errors = {}
  const arr = Object.keys(inputs)
  console.log(arr)
  Object.keys(inputs).forEach((key) => {
    // console.log(key, inputs[key])
    console.log(inputs[key])
    if (inputs[key] !== undefined) {
      if (inputs[key].trim() === "") {
        console.log(inputs[key])
        errors[key] = `Invalid ${key}`
      }
    }
  })
  console.log(errors)
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
