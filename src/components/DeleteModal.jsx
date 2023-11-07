const DeleteModal = (props) => {
  return (
    <div className='delete-modal'>
      <div
        className={
          props.changeTheme
            ? 'modal-inner bg-dark text-light'
            : 'modal-inner bg-light text-dark'
        }
      >
        <h5 className={props.changeTheme ? 'text-light' : 'text-dark'}>
          Do you want to delete the book?
        </h5>
        <button
          onClick={() => props.setShowDelete(false)}
          className='btn btn-secondary'
        >
          Give Up
        </button>
        <button onClick={() => props.handleDelete()} className='btn btn-danger'>
          Delete
        </button>
      </div>
    </div>
  )
};
export default DeleteModal;
