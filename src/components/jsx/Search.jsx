import { useContext, useState } from 'react';
import '../style/Search.css';
import SearchResult from './SearchResult';
import { themeContext } from '../../App'

export default function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const passedObject=useContext(themeContext)

  const handleSearch = async () => {
    setError(null); // Reset any previous error
    setUserData(null); // Reset any previous user data

    await fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        console.log(data); // Correct placement for logging updated data
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <div className={passedObject.light?'lightdiv search':'darkdiv search'}>
        <div className='left'>
          <img src='/images/icon-search.svg' alt='Search Icon' />
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='right'>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && <SearchResult dataUser={userData} />}
    </>
  );
}
