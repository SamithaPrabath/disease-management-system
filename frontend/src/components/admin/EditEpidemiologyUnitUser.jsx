import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import { connect } from 'react-redux';
import { updateEpidemiologyUnitUser } from '../../api/epidemiologyUnitUsersApi';
import { toast } from 'react-toastify';

const EditEpidemiologyUnitUser = ({ handleBack, userData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    role: Yup.string().required('Role is required'),
    status: Yup.string().required('Status is required'),
    // Password is optional during edit
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .when('password', {
        is: val => val && val.length > 0,
        then: schema => schema.required('Confirm password is required'),
        otherwise: schema => schema.optional(),
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      role: userData?.role || 'Analyst',
      status: userData?.status || 'Active',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Only send password if it's provided
        const { confirmPassword, ...userData } = values;
        if (!userData.password) {
          delete userData.password;
        }
        
        const response = await updateEpidemiologyUnitUser(userData.id, userData);
        
        if (response.status === 200) {
          toast.success('User updated successfully');
          if (handleBack) handleBack();
        } else {
          toast.error(response.message || 'Failed to update user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('An error occurred while updating the user');
      } finally {
        setIsSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Epidemiology Unit User</h2>
        {handleBack && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Back to List
          </button>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.name && formik.errors.name ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.email && formik.errors.email ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
              formik.touched.role && formik.errors.role ? 'border border-red-500' : ''
            }`}
          >
            <option value="Admin">Admin</option>
            <option value="Analyst">Analyst</option>
            <option value="Epidemiologist">Epidemiologist</option>
            <option value="Data Entry">Data Entry</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.role}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Password (Optional for edit) */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password (Leave blank to keep current)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.password && formik.errors.password ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
              formik.touched.status && formik.errors.status ? 'border border-red-500' : ''
            }`}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.status}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {handleBack && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(EditEpidemiologyUnitUser); 