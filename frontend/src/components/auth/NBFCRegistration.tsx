import { useState } from 'react';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import type { User } from '../../App';

interface NBFCRegistrationProps {
  onComplete: (user: User) => void;
  onBack: () => void;
}

export function NBFCRegistration({ onComplete, onBack }: NBFCRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    licenseNumber: '',
    registrationYear: '',
    headquarters: '',
    authorizedPerson: '',
    designation: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user modifies form
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Map frontend state to backend model (nbfcController.js)
      const payload = {
        companyName: formData.companyName,
        cinNumber: formData.licenseNumber, // Mapped from licenseNumber
        registrationYear: formData.registrationYear,
        headquartersLocation: formData.headquarters, // Mapped from headquarters
        contactFullName: formData.authorizedPerson, // Mapped from authorizedPerson
        designation: formData.designation,
        officialEmail: formData.email, // Mapped from email
        phoneNumber: formData.phone, // Mapped from phone
        password: formData.password
      };

      // Ensure this URL matches where you mounted the nbfcRoutes in your server.js
      const response = await fetch('http://localhost:5000/api/nbfc/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Uses the error message format from nbfcController.js
        throw new Error(data.error || 'Registration failed');
      }

      // Success: login the user automatically
      onComplete({
        name: data.companyName,
        role: 'nbfc',
        // id: data.nbfcId 
      });

    } catch (err: any) {
      setError(err.message || 'An error occurred during connection');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-4/5 max-w-6xl">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">NBFC Registration</h2>
            <p className="text-gray-600">Register your financial institution on FinBridge</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <h4 className="text-gray-900 mb-4">Company Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Your NBFC name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CIN Number*</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Your CIN number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Registration Year *</label>
                  <input
                    type="text"
                    name="registrationYear"
                    value={formData.registrationYear}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="YYYY"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Headquarters Location *</label>
                  <input
                    type="text"
                    name="headquarters"
                    value={formData.headquarters}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="City, State"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Authorized Contact */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-gray-900 mb-4">Authorized Contact Person</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="authorizedPerson"
                    value={formData.authorizedPerson}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Contact person name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Designation *</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="e.g., Director, Manager"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Official Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="contact@company.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Your registration will be verified by the FinBridge compliance team. 
                You will need to submit your RBI certificate and other legal documents for verification.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                disabled={isLoading}
                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-600">
                I certify that the information provided is accurate and I have the authority to represent this NBFC. 
                I agree to the FinBridge Terms of Service and Privacy Policy.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}