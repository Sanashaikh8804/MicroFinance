import { useState } from 'react';
import { TrendingUp, LogOut, ArrowLeft, CheckCircle } from 'lucide-react';
import type { User } from '../../App';

interface CreateSchemeProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const documentOptions = [
  'Aadhar Card',
  'PAN Card',
  'Bank Statement (3 months)',
  'Bank Statement (6 months)',
  'Bank Statement (12 months)',
  'Business Registration',
  'GST Certificate',
  'ITR (Last Year)',
  'ITR (Last 2 Years)',
  'Shop/Office Rent Agreement',
  'Business License',
  'Trade License'
];

const businessTypeOptions = [
  'Retail',
  'Service',
  'Wholesale',
  'Manufacturing',
  'Food & Beverage',
  'Healthcare',
  'Education',
  'Transport',
  'Construction'
];

export function CreateScheme({ user, onNavigate, onLogout }: CreateSchemeProps) {
  const [formData, setFormData] = useState({
    schemeName: '',
    loanRangeCategory: '',
    minAmount: '',
    maxAmount: '',
    loanPeriodMin: '',
    loanPeriodMax: '',
    interestRate: '',
    processingFee: '',
    requiredDocs: [] as string[],
    preferredBusinessTypes: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleDoc = (doc: string) => {
    setFormData({
      ...formData,
      requiredDocs: formData.requiredDocs.includes(doc)
        ? formData.requiredDocs.filter((d) => d !== doc)
        : [...formData.requiredDocs, doc]
    });
  };

  const toggleBusinessType = (type: string) => {
    setFormData({
      ...formData,
      preferredBusinessTypes: formData.preferredBusinessTypes.includes(type)
        ? formData.preferredBusinessTypes.filter((t) => t !== type)
        : [...formData.preferredBusinessTypes, type]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Loan scheme created successfully!');
    onNavigate('nbfc-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary-600" />
            <span className="text-xl text-gray-900">FinBridge</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('nbfc-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
            <h1 className="mb-2">Create New Loan Scheme</h1>
            <p className="text-xl text-primary-100">
              Define a new loan product for small business borrowers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Scheme Name *</label>
                  <input
                    type="text"
                    name="schemeName"
                    value={formData.schemeName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Small Business Quick Loan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Loan Range */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Loan Amount Range</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Minimum Amount (₹) *</label>
                  <input
                    type="number"
                    name="minAmount"
                    value={formData.minAmount}
                    onChange={handleChange}
                    required
                    placeholder="25000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Maximum Amount (₹) *</label>
                  <input
                    type="number"
                    name="maxAmount"
                    value={formData.maxAmount}
                    onChange={handleChange}
                    required
                    placeholder="100000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Loan Period */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Loan Period (Months)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Minimum Period *</label>
                  <select
                    name="loanPeriodMin"
                    value={formData.loanPeriodMin}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select minimum</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Maximum Period *</label>
                  <select
                    name="loanPeriodMax"
                    value={formData.loanPeriodMax}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select maximum</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interest & Fees */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Interest Rate & Fees</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Interest Rate (% p.a.) *</label>
                  <input
                    type="number"
                    step="0.1"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    required
                    placeholder="12.0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Processing Fee (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="processingFee"
                    value={formData.processingFee}
                    onChange={handleChange}
                    placeholder="2.0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h3 className="text-gray-900 mb-4">Required Documents from Borrowers *</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select all documents you want borrowers to submit with their application
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {documentOptions.map((doc) => (
                  <label
                    key={doc}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.requiredDocs.includes(doc)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.requiredDocs.includes(doc)}
                      onChange={() => toggleDoc(doc)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-900">{doc}</span>
                    {formData.requiredDocs.includes(doc) && (
                      <CheckCircle className="w-5 h-5 text-primary-600 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Business Types */}
            <div>
              <h3 className="text-gray-900 mb-4">Preferred Business Types</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select business types you want to target (optional - leave blank for all types)
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {businessTypeOptions.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.preferredBusinessTypes.includes(type)
                        ? 'border-success-500 bg-success-50'
                        : 'border-gray-200 bg-white hover:border-success-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferredBusinessTypes.includes(type)}
                      onChange={() => toggleBusinessType(type)}
                      className="rounded border-gray-300 text-success-600 focus:ring-success-500"
                    />
                    <span className="text-gray-900">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md"
              >
                Post Loan Scheme
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Once posted, borrowers matching your criteria will be able to view and apply for this scheme
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
