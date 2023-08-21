import { ethers } from 'ethers';
import { IBook } from '../interfaces/IBook';

export const getBookKeys = async (bookLibrary: ethers.Contract) => {
  const bookKeys: string[] = [];
  try {
    const bookKeysLength = await bookLibrary.getBookKeysLength();

    for (let i = 0; i < bookKeysLength; i++) {
      const bookKey = await bookLibrary.bookKeys(i);
      bookKeys.push(bookKey);
    }
    return bookKeys;
  } catch (error) {
    return bookKeys;
  }
};

export const getBooks = async (bookLibrary: ethers.Contract, bookKeys?: string[]) => {
  const books: IBook[] = [];

  if (!bookKeys) {
    bookKeys = await getBookKeys(bookLibrary);
  }

  for (let i = 0; i < bookKeys.length; i++) {
    const bookKey = bookKeys[i];
    const book = await bookLibrary.books(bookKey);
    console.log(book);

    const borrowers = await bookLibrary.getBorrowers(bookKey);

    books.push({
      key: bookKey,
      title: book[0],
      copies: Number(book[1]),
      borrowers,
    });
  }

  return books;
};
