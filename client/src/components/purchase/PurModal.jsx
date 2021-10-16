import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { Button, Form, Icon, Table } from "semantic-ui-react"

Modal.setAppElement("#root")
const customStyles = {
  overlay: {
    backgroundColor: "grey",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
  },
}

//const props = [{ itemArticle: "itemArticle", vendor: "vendor" }]

const PurModal = ({
  modalOpen,
  setModal,
  items,
  setItem,
  setCustPrice,
  setTotal,
}) => {
  const [_items, setItems] = useState([])
  const findItems = (e) => {
    if (e.charCode === 13) {
      setItems(search(e.target.value, "itemArticle", items))
    }
  }

  useEffect(() => {
    setItems(_items)
  }, [_items])

  function search(nameKey, prop, array) {
    // console.log(array.filter((e) => e[prop] === nameKey))
    return array.filter((e) => e[prop] === nameKey)
    // for (let i = 0; i < array.length; i++) {
    //   if (array[i][prop] == nameKey) {
    //     return array[i]
    //   }
    // }
  }

  const selectItem = (id) => {
    const selectedItem = [..._items].find((e) => e._id === id)
    if (selectedItem) {
      setItem({ ...selectedItem })
      setCustPrice(selectItem ? selectedItem.custPrice : 0)
      setTotal(selectedItem ? selectedItem.custPrice * 10 : 0)
      setModal(false)
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        style={customStyles}
        onRequestClose={() => setModal(false)}
      >
        <h1>title</h1>
        <Form>
          <Form.Group>
            <Form.Field
              label="Item"
              control="input"
              type="text"
              placeholder="Item"
              onKeyPress={(e) => findItems(e)}
              width={4}
            />
            {/* <Select placeholder="Select" options={props} /> */}
            {/* <Form.Field label="type" control="select" width={4}>
              {props &&
                props.map((prop, index) => (
                  <option key={index} value={prop.value}>
                    {prop.value}
                  </option>
                ))}
            </Form.Field> */}
          </Form.Group>
        </Form>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
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
              <Table.HeaderCell>select</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_items &&
              _items.length > 0 &&
              _items.map((item) => (
                <Table.Row key={item._id} onClick={(e) => selectItem(e)}>
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
                  <Table.Cell>
                    <Button
                      type="button"
                      icon
                      onClick={() => selectItem(item._id)}
                    >
                      <Icon name="edit" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Modal>
    </div>
  )
}

export default PurModal
