import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase-config';
import { getAuth } from 'firebase/auth';
import { where, query } from 'firebase/firestore';

function ViewIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const issuesRef = collection(db, 'issues');
          const q = query(issuesRef, where('userId', '==', user.uid));
          const querySnapShot = await getDocs(q);
          const issueList = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setIssues(issueList);
        } else {
          toast.error('User not authenticated');
        }
      } catch (error) {
        console.log('Error fetching issues: ', error);
        toast.error('Error displaying your previous issues');
      }
    };
    fetchIssues();
  }, []);

  return (
    <div>
      <Link
        to={'/'}
        className="btn btn-neutral w-40 mx-[5%] text-white mt-[2%]"
      >
        Back
      </Link>
      <header className="text-center">
        <h1 className="text-4xl mt-[4%] font-bold">Previous Issues</h1>
      </header>
      <div className="p-6 mx-auto max-w-4xl mt-6">
        {issues.length === 0 ? (
          <h1 className="text-center text-lg font-medium text-gray-600">
            No previous issues found
          </h1>
        ) : (
          <table className="table-auto w-full text-center border-collapse bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-lg font-medium">Date</th>
                <th className="px-4 py-2 text-lg font-medium">Product</th>
              </tr>
            </thead>
            <tbody>
            {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {issue.createdAt?.toDate ? issue.createdAt.toDate().toLocaleDateString() : 'Invalid Date'}
                  </td>
                  <td className="px-4 py-2">{issue.product}</td>
                  <td className="px-4 py-2"><Link state={{issue}} to='/Issue' className='btn btn-sm w-40 bg-white border-black text-black hover:bg-gray-100 p-0 leading-none'> View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewIssues;