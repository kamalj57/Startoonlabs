import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminGraph from './AdminGraph';
import Chart from './Chart';

const AdminTable = () => {
  const baseUrl=import.meta.env.VITE_REACT_APP_API;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/admin`);
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  const totalUsers = userData.length;
  const totalLoginCount = userData.reduce((total, user) => total + user.count, 0);

  
  return (
    <>
      <AdminGraph totalUsers={totalUsers} totalLoginCount={totalLoginCount} />
      <div className="w-full max-w-screen-md mx-auto mt-5 px-4 sm:px-6 lg:px-8 overflow-x-auto rounded-lg border border-gray-200">
  <Chart/>
</div>

      <div className="w-1/2 mt-5 flex items-center mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gender</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Last Login</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Login Count</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {userData.length > 0 ? (
              userData.map((data, key) => (
                <tr key={key}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{data.name}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">{data.email}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">{data.gender}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">{new Date(data.lastLoginDate).toLocaleString()}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">{data.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900" colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminTable;
