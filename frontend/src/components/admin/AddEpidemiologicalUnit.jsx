import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import { connect } from 'react-redux';
import { addEpidemiologyUnitUser } from '../../api/epidemiologyUnitUsersApi';
const AddEpidemiologicalUnit = ({ onCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const validationSchema = Yup.object({
    name: Yup.string().required('Unit name is required'),
    district: Yup.string().required('District is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      district: '',
      address: '',
      email: '',
      phone: '',
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Submitting:', values);
        const response = await addEpidemiologyUnitUser(values);
        if (response.status === 200) {
          messageApi.success('Epidemiological unit added successfully');
          if (onCancel) onCancel(); // Go back to the list view after successful submission
        } else {
          messageApi.error('Failed to add epidemiological unit');
        }
        
        // Simulate API response
        setTimeout(() => {
          messageApi.success('Epidemiological unit added successfully');
          if (onCancel) onCancel(); // Go back to the list view after successful submission
        }, 1000);
      } catch (error) {
        messageApi.error('Failed to add epidemiological unit');
        console.error('Error adding unit:', error);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add New Epidemiological Unit</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Back to List
          </button>
        )}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Unit Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Name (Epidemiological Unit) <span className="text-red-500">*</span>
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

        {/* District */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            District <span className="text-red-500">*</span>
          </label>
          <input
            id="district"
            name="district"
            type="text"
            value={formik.values.district}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
              formik.touched.district && formik.errors.district ? 'border border-red-500' : ''
            }`}
          />
          {formik.touched.district && formik.errors.district && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.district}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
              formik.touched.address && formik.errors.address ? 'border border-red-500' : ''
            }`}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
            )}
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.phone && formik.errors.phone ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        {/* Username and Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.username && formik.errors.username ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
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
        </div>
        

        <div className="flex justify-end space-x-3 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Unit
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AddEpidemiologicalUnit); 