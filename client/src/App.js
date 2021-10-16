import { BrowserRouter as Router, Route } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import { Container } from "semantic-ui-react"
import "./App.css"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import Item from "./components/item/Item"
import ItemsList from "./components/item/ItemsList"
import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import PurInv from "./components/purchase/PurInv"
import UsersList from "./components/user/UsersList"
import VendorsList from "./components/vendor/VendorsList"

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/vendors" component={VendorsList} />
          <Route exact path="/items" component={ItemsList} />
          <Route exact path="/items/:id" component={Item} />
          <Route exact path="/purchases" component={PurInv} />
          <Route exact path="/users" component={UsersList} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
