import { useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import type { User } from '../../App';

interface BorrowerRegistrationProps {
  onComplete: (user: User) => void;
  onBack: () => void;
}

export function BorrowerRegistration({ onComplete, onBack }: BorrowerRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    businessType: '',
    aadhar: '',
    pan: '',
    businessDescription: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      // Construct payload matching userControllers.js expectations
      // We combine businessName/Type into description or send dummy data for missing required fields
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
        aadhar: formData.aadhar,
        pan: formData.pan,
        // Combining business info as the controller only has 'business_description'
        business_description: `${formData.businessName} (${formData.businessType}): ${formData.businessDescription}`,
        // Dummy values for required backend fields not present in this form design
        previous_micro_loans: "None", 
        gst_number: "Unregistered/Pending" 
      };

      // Based on server.js: app.use("/microfinance/user", ...) and routes: router.post("/createUser", ...)
      const response = await fetch('http://localhost:5000/microfinance/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed');
      }

      // Success: login the user
      onComplete({
        name: data.name,
        role: 'borrower',
        businessName: formData.businessName
      });

    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
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
            <h2 className="text-gray-900 mb-2">Borrower Registration</h2>
            <p className="text-gray-600">Create your account to access loan opportunities</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-success-50 rounded-lg p-6 border border-success-200">
              <h4 className="text-gray-900 mb-4">Personal Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Aadhar Number *</label>
                  <input
                    type="text"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="XXXX XXXX XXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">PAN Number *</label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="XXXXX0000X"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <h4 className="text-gray-900 mb-4">Business Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Your business name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Business Type *</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail</option>
                    <option value="service">Service</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="food">Food & Beverage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Business Description *</label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows={4}
                    placeholder="Describe your business activities..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none disabled:bg-gray-100"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                disabled={isLoading}
                className="mt-1 rounded border-gray-300 text-success-600 focus:ring-success-500"
              />
              <label className="text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy. I understand my data will be shared with NBFCs for loan processing.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 rounded-lg hover:from-success-700 hover:to-success-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
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