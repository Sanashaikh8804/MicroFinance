import { useState } from 'react';
import { TrendingUp, LogOut, ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import type { User, LoanCriteria } from '../../App';

interface NewLoanStep2Props {
  user: User;
  loanCriteria: LoanCriteria;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

export function NewLoanStep2({ user, loanCriteria, onNavigate, onLogout }: NewLoanStep2Props) {
  const [turnover, setTurnover] = useState('');
  const [turnoverFile, setTurnoverFile] = useState<File | null>(null);
  const [itr, setItr] = useState('');
  const [itrFile, setItrFile] = useState<File | null>(null);

  const handleContinue = () => {
    if (turnover && turnoverFile && itr && itrFile) {
      onNavigate('loan-marketplace', { loanCriteria });
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
          onClick={() => onNavigate('new-loan-step1')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center">✓</div>
              <span className="text-gray-900">Loan Criteria</span>
            </div>
            <div className="flex-1 h-1 bg-success-600" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success-600 text-white rounded-full flex items-center justify-center">2</div>
              <span className="text-gray-900">Financials</span>
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
          <h2 className="text-gray-900 mb-2">Financial Information</h2>
          <p className="text-gray-600 mb-8">
            Provide your business financial details to help NBFCs assess your application
          </p>

          {/* Selected Criteria Summary */}
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Loan Amount:</span>
                <div className="text-gray-900 mt-1">{loanCriteria.amount}</div>
              </div>
              <div>
                <span className="text-gray-600">Loan Period:</span>
                <div className="text-gray-900 mt-1">{loanCriteria.period} months</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Last 6 Months Turnover */}
            <div>
              <label className="block text-gray-700 mb-4">Last 6 Months Turnover *</label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={turnover}
                    onChange={(e) => setTurnover(e.target.value)}
                    placeholder="Enter amount in ₹"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                  />
                </div>
                <div>
                  <label className="w-full flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-success-500 hover:bg-success-50 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">
                      {turnoverFile ? turnoverFile.name : 'Upload Bank Statement'}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => setTurnoverFile(e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".pdf,.jpg,.png"
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Upload your last 6 months bank statement (PDF, JPG, or PNG)
              </p>
            </div>

            {/* Last Year ITR */}
            <div>
              <label className="block text-gray-700 mb-4">Last Year ITR (Income Tax Return) *</label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={itr}
                    onChange={(e) => setItr(e.target.value)}
                    placeholder="Enter ITR amount in ₹"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
                  />
                </div>
                <div>
                  <label className="w-full flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-success-500 hover:bg-success-50 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">
                      {itrFile ? itrFile.name : 'Upload ITR Document'}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => setItrFile(e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".pdf"
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Upload your ITR acknowledgment or Form 16 (PDF format)
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 mb-8">
            <p className="text-sm text-blue-900">
              <strong>Privacy Notice:</strong> Your financial documents are encrypted and shared only with 
              NBFCs you choose to apply to. We never share your data without your consent.
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!turnover || !turnoverFile || !itr || !itrFile}
            className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 rounded-lg hover:from-success-700 hover:to-success-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Browse Loan Offers
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
