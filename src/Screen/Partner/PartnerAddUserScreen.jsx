import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAddUserMutation } from '../../slices/adminApiSlice';
import { useSelector } from 'react-redux';

export default function PartnerAddUserScreen() {
  // Access the createUser mutation
  const [createUser,{isSuccess}] = useAddUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // Validation schema for Formik using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    
  });
  useEffect(()=>{
    if(isSuccess){
        toast.success('User created successfully!');
  
    }

  },[isSuccess])

  // Initial values for the form
  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'counsellor',
    createdBy:userInfo._id // Default role value
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Trigger the mutation to create a new user
      const res = await createUser(values).unwrap();
      disaptch(AddExtraUser(res))
      toast.success('User created successfully!');
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.log("fsa",error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter user name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter user email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter user password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Role Field */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="counsellor">Counsellor</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                {isSubmitting ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
