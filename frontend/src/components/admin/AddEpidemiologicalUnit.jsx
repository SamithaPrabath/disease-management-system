import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import { connect } from 'react-redux';

const AddEpidemiologicalUnit = ({ onCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const validationSchema = Yup.object({
    name: Yup.string().required('Unit name is required'),
    code: Yup.string().required('Unit code is required'),
    region: Yup.string().required('Region is required'),
    address: Yup.string().required('Address is required'),
    contactPerson: Yup.string().required('Contact person name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      region: '',
      address: '',
      contactPerson: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // In a real implementation, you would call your API here
        console.log('Submitting:', values);
        
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Name
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

          {/* Unit Code */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                formik.touched.code && formik.errors.code ? 'border border-red-500' : ''
              }`}
            />
            {formik.touched.code && formik.errors.code && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.code}</p>
            )}
          </div>
        </div>

        {/* Region */}
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Region/District
          </label>
          <input
            id="region"
            name="region"
            type="text"
            value={formik.values.region}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
              formik.touched.region && formik.errors.region ? 'border border-red-500' : ''
            }`}
          />
          {formik.touched.region && formik.errors.region && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.region}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
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

        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            id="contactPerson"
            name="contactPerson"
            type="text"
            value={formik.values.contactPerson}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
              formik.touched.contactPerson && formik.errors.contactPerson ? 'border border-red-500' : ''
            }`}
          />
          {formik.touched.contactPerson && formik.errors.contactPerson && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.contactPerson}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
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