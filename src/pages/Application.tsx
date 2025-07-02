import React, { useState } from 'react';
import { User, Home, DollarSign, FileText, Upload, CheckCircle, ArrowLeft, ArrowRight, Phone, Mail } from 'lucide-react';

const Application = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    
    // Rental Preferences
    propertyType: '',
    bedrooms: '',
    maxRent: '',
    moveInDate: '',
    leaseTerm: '',
    pets: '',
    
    // Employment & Income
    employer: '',
    position: '',
    monthlyIncome: '',
    employmentLength: '',
    additionalIncome: '',
    
    // References
    previousLandlord: '',
    landlordPhone: '',
    reference1Name: '',
    reference1Phone: '',
    reference2Name: '',
    reference2Phone: '',
    
    // Documents
    idDocument: null,
    incomeProof: null,
    additionalDocs: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Rental Preferences', icon: Home },
    { number: 3, title: 'Employment', icon: DollarSign },
    { number: 4, title: 'References', icon: FileText },
    { number: 5, title: 'Documents', icon: Upload },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.ssn.trim()) newErrors.ssn = 'SSN is required';
        break;
      case 2:
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
        if (!formData.maxRent) newErrors.maxRent = 'Maximum rent is required';
        if (!formData.moveInDate) newErrors.moveInDate = 'Move-in date is required';
        if (!formData.leaseTerm) newErrors.leaseTerm = 'Lease term is required';
        break;
      case 3:
        if (!formData.employer.trim()) newErrors.employer = 'Employer is required';
        if (!formData.position.trim()) newErrors.position = 'Position is required';
        if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
        if (!formData.employmentLength) newErrors.employmentLength = 'Employment length is required';
        break;
      case 4:
        if (!formData.reference1Name.trim()) newErrors.reference1Name = 'Reference name is required';
        if (!formData.reference1Phone.trim()) newErrors.reference1Phone = 'Reference phone is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    // Simulate form submission
    alert('Application submitted successfully! We\'ll review your application and contact you within 24-48 hours.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label htmlFor="ssn" className="block text-sm font-medium text-gray-700 mb-2">
                  Social Security Number *
                </label>
                <input
                  type="text"
                  id="ssn"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleInputChange}
                  placeholder="XXX-XX-XXXX"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.ssn ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.ssn && <p className="mt-1 text-sm text-red-600">{errors.ssn}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.propertyType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
                {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select bedrooms</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                </select>
                {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Rent *
                </label>
                <input
                  type="number"
                  id="maxRent"
                  name="maxRent"
                  value={formData.maxRent}
                  onChange={handleInputChange}
                  placeholder="3000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.maxRent ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.maxRent && <p className="mt-1 text-sm text-red-600">{errors.maxRent}</p>}
              </div>

              <div>
                <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Move-in Date *
                </label>
                <input
                  type="date"
                  id="moveInDate"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.moveInDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.moveInDate && <p className="mt-1 text-sm text-red-600">{errors.moveInDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leaseTerm" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Lease Term *
                </label>
                <select
                  id="leaseTerm"
                  name="leaseTerm"
                  value={formData.leaseTerm}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.leaseTerm ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select lease term</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                </select>
                {errors.leaseTerm && <p className="mt-1 text-sm text-red-600">{errors.leaseTerm}</p>}
              </div>

              <div>
                <label htmlFor="pets" className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have pets?
                </label>
                <select
                  id="pets"
                  name="pets"
                  value={formData.pets}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="none">No pets</option>
                  <option value="dog">Dog(s)</option>
                  <option value="cat">Cat(s)</option>
                  <option value="both">Both dogs and cats</option>
                  <option value="other">Other pets</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Employment & Income</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employer" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Employer *
                </label>
                <input
                  type="text"
                  id="employer"
                  name="employer"
                  value={formData.employer}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.employer ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.employer && <p className="mt-1 text-sm text-red-600">{errors.employer}</p>}
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position/Title *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.position ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Gross Income *
                </label>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  placeholder="5000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.monthlyIncome ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.monthlyIncome && <p className="mt-1 text-sm text-red-600">{errors.monthlyIncome}</p>}
              </div>

              <div>
                <label htmlFor="employmentLength" className="block text-sm font-medium text-gray-700 mb-2">
                  Length of Employment *
                </label>
                <select
                  id="employmentLength"
                  name="employmentLength"
                  value={formData.employmentLength}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.employmentLength ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select duration</option>
                  <option value="less-than-6">Less than 6 months</option>
                  <option value="6-12">6-12 months</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="5-plus">5+ years</option>
                </select>
                {errors.employmentLength && <p className="mt-1 text-sm text-red-600">{errors.employmentLength}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="additionalIncome" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Monthly Income (Optional)
              </label>
              <input
                type="number"
                id="additionalIncome"
                name="additionalIncome"
                value={formData.additionalIncome}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">Include income from investments, part-time work, etc.</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">References</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                Please provide contact information for your references. We may contact them as part of our screening process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="previousLandlord" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Landlord/Property Manager
                </label>
                <input
                  type="text"
                  id="previousLandlord"
                  name="previousLandlord"
                  value={formData.previousLandlord}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="landlordPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Landlord Phone Number
                </label>
                <input
                  type="tel"
                  id="landlordPhone"
                  name="landlordPhone"
                  value={formData.landlordPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reference1Name" className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Reference 1 Name *
                </label>
                <input
                  type="text"
                  id="reference1Name"
                  name="reference1Name"
                  value={formData.reference1Name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.reference1Name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.reference1Name && <p className="mt-1 text-sm text-red-600">{errors.reference1Name}</p>}
              </div>

              <div>
                <label htmlFor="reference1Phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Reference 1 Phone *
                </label>
                <input
                  type="tel"
                  id="reference1Phone"
                  name="reference1Phone"
                  value={formData.reference1Phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.reference1Phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.reference1Phone && <p className="mt-1 text-sm text-red-600">{errors.reference1Phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="reference2Name" className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Reference 2 Name
                </label>
                <input
                  type="text"
                  id="reference2Name"
                  name="reference2Name"
                  value={formData.reference2Name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="reference2Phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Reference 2 Phone
                </label>
                <input
                  type="tel"
                  id="reference2Phone"
                  name="reference2Phone"
                  value={formData.reference2Phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                Please upload the required documents to complete your application. All files should be in PDF, JPG, or PNG format.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700 mb-2">
                  Government-issued ID * (Driver's License, Passport, etc.)
                </label>
                <input
                  type="file"
                  id="idDocument"
                  name="idDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="incomeProof" className="block text-sm font-medium text-gray-700 mb-2">
                  Proof of Income * (Pay stubs, bank statements, tax returns)
                </label>
                <input
                  type="file"
                  id="incomeProof"
                  name="incomeProof"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="additionalDocs" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Documents (Optional)
                </label>
                <input
                  type="file"
                  id="additionalDocs"
                  name="additionalDocs"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Include any additional documentation that supports your application
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Application Fee</h3>
              <p className="text-gray-700 mb-4">
                A non-refundable application fee of $50 is required to process your application. 
                This fee covers credit check, background verification, and application processing.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-700">Payment will be processed after application submission</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Rental Application</h1>
          <p className="text-lg text-gray-600">
            Complete all steps to submit your rental application
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white'
                      : isActive 
                        ? 'bg-primary-800 border-primary-800 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-primary-800' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              <span className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </span>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-primary-800 hover:bg-primary-900 text-white font-medium rounded-lg transition-colors"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Submit Application
                  <CheckCircle className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 mb-4">
            If you have questions about the application process or need assistance, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:(555)123-4567"
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call us: (555) 123-4567
            </a>
            <a
              href="mailto:applications@pdlrentals.com"
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email: applications@pdlrentals.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;