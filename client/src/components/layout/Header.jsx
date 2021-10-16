import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../actions/userActions"

const Header = () => {
  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth
  const dispatch = useDispatch()
  const [state, setState] = useState({ activeItem: "home" })

  const handleItemClick = (e, { name }) => setState({ activeItem: name })

  const { activeItem } = state

  const menuBar =
    userInfo && userInfo.username ? (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={userInfo.username} active as={Link} to="/" />

        <Menu.Menu position="right">
          {userInfo && userInfo.role === "admin" && (
            <Menu.Item name="Users" as={Link} to="/users" />
          )}
          <Menu.Item name="purchases" as={Link} to="/purchases" />
          <Menu.Item name="items" as={Link} to="/items" />
          <Menu.Item name="vendors" as={Link} to="/vendors" />
          <Menu.Item name="logout" onClick={() => dispatch(logout())} />
        </Menu.Menu>
      </Menu>
    ) : (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    )

  return menuBar
}

export default Header
