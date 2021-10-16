// import React from "react"

// const PurchaseForm = ({ item, onChange, selectItem }) => {
//   return (
//     <>
//       <PurModal
//         modalOpen={modalIsOpen}
//         setModal={setModalIsOpen}
//         items={items}
//         item={item}
//         setItem={setItem}
//       />
//       <Form>
//         <Form.Group>
//           <Form.Field
//             label="Item"
//             control="input"
//             type="text"
//             placeholder="Item"
//             value={item.itemArticle}
//             onDoubleClick={() => setModalIsOpen(true)}
//             onKeyPress={selectItem}
//             width={4}
//           />
//           <Form.Field
//             label="Article"
//             control="input"
//             type="text"
//             placeholder="Article"
//             value={item.itemArticle}
//             width={4}
//             onChange={onChange}
//           />
//           <Form.Field
//             label="Quantity"
//             control="input"
//             type="number"
//             placeholder="Quantity"
//             value={10}
//             width={4}
//             onChange={onChange}
//           />
//           <Form.Field
//             label="Price"
//             control="input"
//             type="number"
//             placeholder="Price"
//             value={item.custPrice}
//             width={4}
//             onChange={onChange}
//           />

//           <Form.Field
//             label="Total"
//             control="input"
//             type="number"
//             placeholder="Total"
//             value={item.total}
//             width={4}
//             onChange={onChange}
//           />
//         </Form.Group>
//       </Form>
//     </>
//   )
// }

// export default PurchaseForm
