import { v4 as pass } from "uuid";
import { useState } from "react";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [books, setBooks] = useState([])
  const [showDelete, setShowDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [changeTheme, setChangeThem] = useState(true)
  //* form submission event
  const handleSubmit = (e) => {
    e.preventDefault()
    // accessing the book name via event
    const title = e.target[0].value
    if (!title) {
      toast.warn('Enter the book name.', { autoClose: 2000 })
      return
    }
    //! book object
    const newBook = {
      id: pass(),
      title,
      date: new Date(),
      isRead: false,
    }
    //todo We can use one of two methods to transfer the created object to the books array
    // setBooks([...books, newBook]);
    setBooks([newBook, ...books])
    console.log(books)

    //clear input
    e.target[0].value = ''
    // notify
    toast.success('The book has been added successfully.', { autoClose: 2500 })
  }

  //* function for delete modal
  const handleModal = (id) => {
    //opens todo modal
    setShowDelete(true)
    console.log(id)
    //todo transferring the id of the element to be deleted to state
    setDeleteId(id)
  }

  //* deletion
  const handleDelete = () => {
    //todo removing the element whose element we know from the array
    const filtred = books.filter((book) => book.id !== deleteId)
    console.log(deleteId)
    //todo state update
    setBooks(filtred)
    //close todo Modal
    setShowDelete(false)
    //todo notification
    toast.error('The book has been deleted successfully.', { autoClose: 2500 })
  }

  //* works on read action
  const handleRead = (editItem) => {
    //updating an element from the array
    //todo reverse read value
    const updated = { ...editItem, isRead: !editItem.isRead }
    console.log(updated)
    //make a copy of todo state
    // const clone = [...books];
    // //todo Finding the order of the element to be edited
    // const index = books.findIndex((book) => book.id === updated.id);
    // //todo Clone update the array
    // clone[index] = updated;
    //update todo State

    // Map
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    )
    setBooks(newBooks)
  }

  //* edit modal operations
  const handleEditModal = (item) => {
    //opens modal
    setShowEdit(true)
    //transferring the element to be edited to state
    setEditingItem(item)
  }
  //* edit the element
  const updateItem = () => {
    //update an element in the books array
    // return array of books
    // If the element is not the element to be edited, transfer it to the new array as it is
    // If the element is to be edited, transfer its current version to the array
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    )
    // update state
    setBooks(newBooks)
    //closes the modal
    setShowEdit(false)
    console.log('Current Status:', editingItem)
    // bildirim verme
    toast.info('Book name edited', { autoClose: 2000 })
  }
  //* clear the array
  const clearBook = () => {
    setBooks([])
  }

  return (
    <div className='App'>
      <div
        className={
          changeTheme ? 'bg-dark text-light w-100' : 'bg-light text-dark w-100'
        }
      >
        <header className='bg-dark text-center text-light py-2 fs-5 d-flex justify-content-around align-items-center'>
          <h1>Bookworm</h1>
          <div>
            <button
              onClick={() => {
                changeTheme ? setChangeThem(false) : setChangeThem(true)
              }}
              className='btn btn-light'
            >
              {changeTheme ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </header>
        <main className='container'>
          {/* form */}
          <form onSubmit={handleSubmit} className='d-flex gap-3 p-4 mt-4'>
            <input
              className='form-control shadow '
              type='text'
              placeholder='Enter a book name!'
            />
            <button className='btn btn-warning shadow'>Add</button>
            <button
              onClick={() => clearBook()}
              className='btn btn-danger shadow'
            >
              Clear
            </button>
          </form>

          {/* If the books array is empty */}
          {books.length === 0 && (
            <h4 className='text-center p-2 border border-secondary m-4 my-3 w-50 m-auto rounded shadow'>
              No books have been added yet.
            </h4>
          )}
          {/* If the series of books is full */}
          {books.map((book) => (
            <BookCard
              key={book.id}
              data={book}
              handleModal={handleModal}
              handleRead={handleRead}
              handleEditModal={handleEditModal}
            />
          ))}
        </main>

        {/* Modal */}
        {showDelete && (
          <DeleteModal
            setShowDelete={setShowDelete}
            handleDelete={handleDelete}
            setChangeThem={setChangeThem}
            changeTheme={changeTheme}
          />
        )}
        {showEdit && (
          <EditModal
            setShowEdit={setShowEdit}
            setEditingItem={setEditingItem}
            editingItem={editingItem}
            updateItem={updateItem}
            setChangeThem={setChangeThem}
            changeTheme={changeTheme}
          />
        )}

        {/* For notifications */}
        <ToastContainer />
      </div>
    </div>
  )
}

export default App;
