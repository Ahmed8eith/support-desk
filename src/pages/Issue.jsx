import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doc,deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { db } from '../firebase-config';

function Issue() {
  const location = useLocation();
  const { issue } = location.state;
  const navigate=useNavigate()

  const handleDelete=async()=>{
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
  }
 
  return (
    <div>
      <Link
        to={'/viewIssues'}
        className="btn btn-neutral w-40 mx-[5%] text-white mt-[2%]"
      >
        Back
      </Link>
      <div className="space-y-4 mx-20 mt-6">
        <h1 className="text-2xl font-bold">Ticket ID: {issue.id}</h1>
        <h1 className="text-1xl font-bold">Submitted in: {new Date(issue.createdAt.seconds * 1000).toLocaleDateString()}</h1>
        <h1 className="text-1xl font-bold">Product: {issue.product}</h1>
        <hr className="mt-4 border-t-2 border-gray-300 w-[95%]" />
        <div className="bg-gray-100 rounded-md border-2 px-4 py-4">
          <h1 className="font-bold text-lg text-gray-700 mb-2">
            Description of the issue
          </h1>
          <p className="text-gray-600">{issue.description}</p>
        </div>
        <button onClick={handleDelete} className="btn btn-error btn-block text-white bg-red-600 hover:bg-red-700">
          Delete Form
        </button>
      </div>
    </div>
  );
}

export default Issue;
