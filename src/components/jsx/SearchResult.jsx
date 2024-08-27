import { useContext, useEffect, useState } from 'react';
import '../style/SearchResult.css';
import { themeContext } from '../../App';
export default function SearchResult(props) {
  const { dataUser } = props;
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);
const passedObject=useContext(themeContext)
  useEffect(() => {
    const fetchUserDetails = () => {
      fetch(`${dataUser.url}`)
        .then((res) => {
          if (!res.ok) throw new Error('User details not found');
          return res.json();
        })
        .then((data) => {
          setUserDetails({
            followers: data.followers,
            following: data.following,
            joinDate: new Date(data.created_at).toLocaleDateString(),
            username: data.login,
            bio: data.bio,
            location: data.location,
            twitter: data.twitter_username,
            githubUrl: data.html_url,
            company: data.company,
            avatar_url: data.avatar_url,
            repos:data.public_repos,
          });
          setError(null);
        })
        .catch((err) => setError(err.message));
    };

    if (dataUser && dataUser.url) {
      fetchUserDetails();
    }
  }, [dataUser]);

  return (
    <div className= {
    passedObject.light?'lightdiv result': 'darkdiv result'
}
>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
          <>
            
            <div className='container d-row'>
              
              <img src={userDetails.avatar_url&&userDetails.avatar_url } className='imgPerson' />
              <div className='rightContainer'>
                <div className='d-row-spacebetween'>
                <h1>Username: {userDetails.username}</h1>
<p>Joined: {userDetails.joinDate}</p>
                </div>
          <p> {userDetails.bio || 'this profile has no nio'}</p>
                <div className={
    passedObject.light?'lightcount counts': 'darkcount counts'
}>
                  <div className='d-columnUnit'>
                    <span>
                      Repos
                      
                    </span>
                    <span>
{userDetails.repos}
                    </span>
                  </div>
                  <div className='d-columnUnit'>
                    <span>
                      Followers
                      
                    </span>
                    <span>
{userDetails.followers}
                    </span>
                  </div>
                  <div className='d-columnUnit'>
                    <span>Following</span>
                    <span>{userDetails.following}</span>
                  </div>
                </div>
                <div className='d-row-spacebetween'>
                  <div className='d-column'>
                    <div className='d-row-spacebetween'><img src='/public/images/icon-location.svg' />  <p>Location: {userDetails.location || 'N/A'}</p></div>
                    <div className='d-row-spacebetween'><img src='/public/images/icon-website.svg' />  <a href={userDetails.githubUrl} target="_blank" rel="noopener noreferrer">{userDetails.githubUrl}</a></div>
                    
                  </div>
                    <div className='d-column'>
                    <div className='d-row-spacebetween'><img src='/public/images/icon-twitter.svg' /> {userDetails.twitter && (
            <p>
              Twitter: <a href={`https://twitter.com/${userDetails.twitter}`} target="_blank" rel="noopener noreferrer">@{userDetails.twitter}</a>
            </p>
          )}</div>
                    <div className='d-row-spacebetween'><img src='/public/images/icon-company.svg' />  {userDetails.company || 'N/A'}</div>
                    
                  </div>
                  
                </div>
        </div>
            
          </div>
      </>
          
        /* <div>
          
         
          <p>Company: {userDetails.company || 'N/A'}</p>
          
          
          
         
        </div> */
      )}
      
    </div>
  );
}
