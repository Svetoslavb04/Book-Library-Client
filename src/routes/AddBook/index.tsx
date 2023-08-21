import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAccount } from 'wagmi';
import { useContract } from '../../contexts/WalletContext';

import { BookLibrarySepoliaAddress } from '../../config/contractAddresses';
import BookLibraryJSON from '../../abi/BookLibrary.json';

import { addBook } from '../../services/bookLibraryService';

const AddBook = () => {
  const { isConnected, address } = useAccount();
  const bookLibrary = useContract(BookLibrarySepoliaAddress, BookLibraryJSON.abi, false);

  if (!isConnected || address != '0x0c9276b8bAf2b37140679204027d574AC2D71297') {
    Navigate({ to: '/' });
  }

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('title');
    const copies = formData.get('copies');

    if (bookLibrary && title && copies) {
      try {
        const tx = await addBook(bookLibrary, title?.toString(), Number(copies));
        await tx.wait();

        setNotification('Book has been added');
      } catch (error) {
        setNotification('Failed to add book');
      }
    }
  };

  return (
    <div className="container my-6">
      <h1 className="heading-medium">Add Book</h1>
      <form onSubmit={handleAddBook}>
        <div className="my-4 w-50">
          <input className="form-control" type="text" name="title" placeholder="Book Title" />
        </div>
        <div className="my-4 w-50">
          <input className="form-control" type="number" name="copies" placeholder="Book Copies" />
        </div>
        <button className="primary-btn" type="submit">
          Add
        </button>
      </form>
      {notification && (
        <div
          className="toast my-6 align-items-center text-white bg-primary border-0 show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{notification}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                setNotification(null);
              }}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
