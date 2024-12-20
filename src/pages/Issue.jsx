import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase-config';

function Issue() {
  const location = useLocation();
  const { issue } = location.state;
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this issue?`
    );

    if (confirmDelete) {
      try {
        const issueRef = doc(db, 'issues', issue.id); // Reference the issue document
        await deleteDoc(issueRef); // Delete the document from Firestore
        toast.success('Issue deleted successfully'); // Optional success message
        navigate('/viewIssues'); // Redirect to the view issues page
      } catch (error) {
        console.error('Error deleting issue:', error);
        toast.error('Failed to delete the issue'); // Optional error message
      }
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <Link
        to={'/viewIssues'}
        className="btn btn-neutral w-full sm:w-40 text-white mb-4"
      >
        Back
      </Link>
      <div className="space-y-4 sm:mx-10 lg:mx-20">
        <h1 className="text-lg sm:text-2xl font-bold break-words">
          Ticket ID: {issue.id}
        </h1>
        <h1 className="text-base sm:text-xl font-bold break-words">
          Submitted in: {new Date(issue.createdAt.seconds * 1000).toLocaleDateString()}
        </h1>
        <h1 className="text-base sm:text-xl font-bold break-words">
          Product: {issue.product}
        </h1>
        <hr className="mt-4 border-t-2 border-gray-300" />
        <div className="bg-gray-100 rounded-md border-2 px-4 py-4">
          <h1 className="font-bold text-base sm:text-lg text-gray-700 mb-2">
            Description of the issue
          </h1>
          <p className="text-gray-600 break-words">{issue.description}</p>
        </div>
        <button
          onClick={handleDelete}
          className="btn btn-error w-full sm:w-auto text-white bg-red-600 hover:bg-red-700"
        >
          Delete Form
        </button>
      </div>
    </div>
  );
}

export default Issue;
