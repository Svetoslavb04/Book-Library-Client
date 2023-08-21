import { useEffect, useMemo, useState } from 'react';

import BookLibraryJSON from '../../abi/BookLibrary.json';
import { BookLibrarySepoliaAddress } from '../../config/contractAddresses';

import { useContract } from '../../contexts/WalletContext';
import { getBookKeys, getBooks } from '../../services/bookLibraryService';
import { IBook } from '../../interfaces/IBook';

const Index = () => {
  const bookLibrary = useContract(BookLibrarySepoliaAddress, BookLibraryJSON.abi);

  const [bookKeys, setBookKeys] = useState<string[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (bookLibrary) {
      getBookKeys(bookLibrary).then(bk => {
        setBookKeys(bk);
      });
    }
  }, [bookLibrary]);

  useEffect(() => {
    if (!bookLibrary) {
      return;
    }

    getBooks(bookLibrary, bookKeys).then((books: IBook[]) => {
      console.log(books);

      setBooks(books);
    });
  }, [bookKeys]);
  return (
    <div>
      <div className="container my-6">
        <h1 className="heading-medium">Welcome to the Book Library</h1>
        <h2 className="heading-small"> The available book keys are:</h2>
        <div className="my-6 d-flex gap-10 w-full flex-wrap">
          {books.map(book => (
            <div key={book.key}>
              <p>Book key: {book.key}</p>
              <p>Title: {book.title}</p>
              <p>Copies: {book.copies}</p>
              {book.borrowers.length > 0 ? <p>Borrowers: {book.borrowers.join(', ')}</p> : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
