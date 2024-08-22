import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const UserScreen = () => {
  const baseUrl=import.meta.env.VITE_REACT_APP_API;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/getuser?email=${email}`);
        setUserData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userData) return <p>No user data found</p>;

  const userDetails = [
    { label: 'Name', value: userData.name },
    { label: 'Email', value: userData.email },
    { label: 'Gender', value: userData.gender },
    { label: 'Last Login', value: new Date(userData.lastLoginDate).toLocaleString() }
  ];
 
  return (
    <>
    <Header/>
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
    <div className="flow-root rounded-lg border border-gray-100 py-3 w-1/2 shadow-sm ">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        {userDetails.map((detail, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
          >
            <dt className="font-medium text-gray-900">{detail.label}</dt>
            <dd className="text-gray-700 sm:col-span-2">{detail.value || 'N/A'}</dd>
          </div>
        ))}
      </dl>
    </div>
    </div>
    </>
  );
};

export default UserScreen;
