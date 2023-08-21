import { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAccount } from 'wagmi';
import { useContract } from '../../contexts/WalletContext';

import { BookLibrarySepoliaAddress } from '../../config/contractAddresses';
import BookLibraryJSON from '../../abi/BookLibrary.json';
import { IBook } from '../../interfaces/IBook';
import { getBooks } from '../../services/bookLibraryService';

import { borrowBook } from '../../services/bookLibraryService';

const BorrowBook = () => {
  const { isConnected } = useAccount();
  const bookLibrary = useContract(BookLibrarySepoliaAddress, BookLibraryJSON.abi, false);

  if (!isConnected) {
    Navigate({ to: '/' });
  }

  const [notification, setNotification] = useState<string | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (bookLibrary) {
      getBooks(bookLibrary).then(bk => setBooks(bk));
    }
  }, [bookLibrary]);

  const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const bookKey = formData.get('bookKey');

    if (bookLibrary && bookKey) {
      try {
        setNotification('Transaction in progress');
        const tx = await borrowBook(bookLibrary, bookKey?.toString());
        await tx.wait();

        setNotification('Book has been borrowed');
      } catch (error: any) {
        setNotification(error.revert.args.join(', '));
      }
    }
  };

  return (
    <div className="container my-6">
      <h1 className="heading-medium">Borrow Book</h1>
      <form onSubmit={handleAddBook}>
        <select className="form-select" aria-label="Default select example w-50" name="bookKey">
          <option value="">{books.length === 0 ? 'Loading books...' : 'Select book'}</option>
          {books
            .filter(b => b.copies > 0)
            .map(book => (
              <option value={book.key} key={book.key}>
                {book.title}
              </option>
            ))}
        </select>
        <button className="primary-btn my-4" type="submit">
          Borrow
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

export default BorrowBook;
