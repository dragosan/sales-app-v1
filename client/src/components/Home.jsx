import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Grid } from "semantic-ui-react"

const Home = () => {
  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  return userInfo && userInfo.username ? (
    <Grid divided="vertically" columns="equal">
      <Grid.Row className="home">
        <div className="dark-overlay"></div>
        <Grid.Column width={12}>
          <h3>About</h3>
          <h4>Sales-App</h4>
          <h4>Email</h4>
          <a href="mailto:mostafamansour2024@gmail.com">
            mostafamansour2024@gmail.com
          </a>
        </Grid.Column>

        <Grid.Column width={3}>
          <Grid.Row>
            <h3>Username</h3>
          </Grid.Row>
          <Grid.Row>
            <h2>{userInfo.username}</h2>
          </Grid.Row>
          <br />
          <Grid.Row>
            <h3>Role</h3>
          </Grid.Row>
          <Grid.Row>
            <h2>{userInfo.role}</h2>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <div>
      <h3>
        Please Sign In <Link to="/login">Login</Link>{" "}
      </h3>
    </div>
  )
}

export default Home
