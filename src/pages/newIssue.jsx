import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase-config';

function NewIssue() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    product: '',
    description: '',
  });

  const { name, product, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (user) {
        await addDoc(collection(db, 'issues'), {
          name,
          product,
          description,
          email: user.email,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Your issue will be reviewed soon');
        setFormData({ name: '', product: '', description: '' });
        navigate('/');
      } else {
        toast.error('You need to be logged in to submit an issue.');
        return;
      }
    } catch (error) {
      console.log('error submitting issue: ', error);
      toast.error(`Failed to submit your issue: ${error.message}`);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <Link
        to={'/'}
        className="btn btn-neutral w-full sm:w-40 text-white mb-6"
      >
        Back
      </Link>
      <div className="flex flex-col items-center text-center mt-4">
        <h1 className="text-3xl sm:text-6xl font-bold">
          Inform us With Your Problem
        </h1>
        <h1 className="text-lg sm:text-4xl text-gray-500 mt-6 sm:mt-10">
          Please fill out the form below
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <input
            name="name"
            value={name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full sm:w-[60%]"
            required
          />
          <input
            name="product"
            value={product}
            onChange={handleChange}
            type="text"
            placeholder="Product"
            className="input input-bordered w-full sm:w-[60%]"
            required
          />
          <input
            onChange={handleChange}
            name="description"
            value={description}
            type="text"
            placeholder="Description"
            className="input input-bordered input-lg w-full sm:w-[60%]"
            required
          />
          <button
            type="submit"
            className="btn btn-neutral w-full sm:w-[60%] text-white"
          >
            Submit
          </button>
        </div>
      </form>
      <br />
      <br />
    </div>
  );
}

export default NewIssue;
