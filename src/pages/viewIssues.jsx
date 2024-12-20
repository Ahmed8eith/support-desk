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
    <div className="p-4 sm:p-8">
      <Link
        to={'/'}
        className="btn btn-neutral w-full sm:w-40 text-white mb-4"
      >
        Back
      </Link>
      <header className="text-center">
        <h1 className="text-2xl sm:text-4xl mt-4 font-bold">Previous Issues</h1>
      </header>
      <div className="p-4 sm:p-6 mx-auto max-w-full sm:max-w-4xl mt-6">
        {issues.length === 0 ? (
          <h1 className="text-center text-lg font-medium text-gray-600">
            No previous issues found
          </h1>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-center border-collapse bg-gray-100 shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-base sm:text-lg font-medium">
                    Date
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-base sm:text-lg font-medium">
                    Product
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-base sm:text-lg font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2">
                      {issue.createdAt?.toDate
                        ? issue.createdAt.toDate().toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="px-2 sm:px-4 py-2">{issue.product}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <Link
                        state={{ issue }}
                        to="/Issue"
                        className="btn btn-sm w-full sm:w-40 bg-white border-black text-black hover:bg-gray-100 p-0 leading-none"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewIssues;
