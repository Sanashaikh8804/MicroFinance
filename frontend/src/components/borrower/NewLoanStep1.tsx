import { useState } from 'react';
import { TrendingUp, LogOut, ArrowRight, ArrowLeft } from 'lucide-react';
import type { User } from '../../App';

interface NewLoanStep1Props {
  user: User;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

const loanAmountCategories = [
  { value: '10-25k', label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { value: '25-50k', label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { value: '50-75k', label: '₹50,000 - ₹75,000', min: 50000, max: 75000 },
  { value: '75-100k', label: '₹75,000 - ₹1,00,000', min: 75000, max: 100000 },
  { value: '100k+', label: '₹1,00,000+', min: 100000, max: 500000 }
];

export function NewLoanStep1({ user, onNavigate, onLogout }: NewLoanStep1Props) {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');

  const handleContinue = () => {
    if (selectedAmount && loanPeriod) {
      onNavigate('new-loan-step2', {
        loanCriteria: {
          amount: selectedAmount,
          period: loanPeriod
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-success-600" />
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

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('borrower-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center">1</div>
              <span className="text-gray-900">Loan Criteria</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">2</div>
              <span className="text-gray-500">Financials</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">3</div>
              <span className="text-gray-500">Browse Offers</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-gray-900 mb-2">Select Loan Amount</h2>
          <p className="text-gray-600 mb-8">Choose the amount range you need for your business</p>

          {/* Amount Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-4">Loan Amount Range *</label>
            <div className="grid md:grid-cols-2 gap-4">
              {loanAmountCategories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedAmount(category.value)}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    selectedAmount === category.value
                      ? 'border-success-500 bg-success-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-success-300 hover:bg-success-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-900">{category.label}</span>
                    {selectedAmount === category.value && (
                      <div className="w-6 h-6 bg-success-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Period Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-4">Loan Period *</label>
            <select
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
            >
              <option value="">Select loan period</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Choosing a shorter loan period typically results in lower total interest paid, 
              while longer periods offer smaller monthly payments.
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedAmount || !loanPeriod}
            className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 rounded-lg hover:from-success-700 hover:to-success-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue to Financials
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
