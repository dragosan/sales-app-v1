import jwt from "jsonwebtoken"

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "30d",
    }
  )
}

export default generateToken
