import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const Navigation = () => {
  const { isConnected } = useAccount();
  return (
    <div className="container my-6 mt-10">
      {isConnected && (
        <div className="d-flex gap-10">
          <button className="primary-btn">
            <Link to={'/'} className="text-black">
              Home
            </Link>
          </button>
          <button className="primary-btn">
            <Link to={'add-book'} className="text-black">
              Add Book
            </Link>
          </button>
          <button className="primary-btn">
            <Link to={'borrow-book'} className="text-black">
              Borrow Book
            </Link>
          </button>
          <button className="primary-btn">
            <Link to={'return-book'} className="text-black">
              Return Book
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
