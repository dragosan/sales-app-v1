import bcrypt from "bcryptjs"

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    //password: "123456",
    role: "admin",
  },
  {
    username: "Manger",
    email: "manager@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "manager",
  },
  {
    username: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
  },
]

export default users
