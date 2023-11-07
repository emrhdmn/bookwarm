//todo !!!!!! Since we know that the prop comes as an object and has data in it
//todo !!!!!! We distribute the prop and access the data directly.
const BookCard = ({ data, handleModal, handleRead, handleEditModal }) => {
  return (
    <div className='d-flex justify-content-between align-items-center border shadow rounded p-3 mt-5'>
      <div>
        <h5 className={data.isRead ? 'text-decoration-line-through' : ''}>
          {data.title}
        </h5>
        <p>{new Date(data.date).toLocaleString()}</p>
      </div>
      <div className='btn-group'>
        <button onClick={() => handleModal(data.id)} className='btn btn-danger'>
          Delete
        </button>
        <button
          onClick={() => handleEditModal(data)}
          className='btn btn-primary'
        >
          Edit
        </button>
        <button
          onClick={() => handleRead(data)}
          className={data.isRead ? 'btn btn-success' : 'btn btn-secondary'}
        >
          {data.isRead ? 'Read' : 'Not Read'}
        </button>
      </div>
    </div>
  )
};
export default BookCard;
