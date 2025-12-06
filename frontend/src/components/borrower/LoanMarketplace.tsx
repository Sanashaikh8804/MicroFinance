import { TrendingUp, LogOut, ArrowLeft, Building, TrendingDown, Calendar, ChevronRight } from 'lucide-react';
import type { User, LoanCriteria, LoanScheme } from '../../App';

interface LoanMarketplaceProps {
  user: User;
  loanCriteria: LoanCriteria;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

const loanSchemes: LoanScheme[] = [
  {
    id: '1',
    nbfcName: 'Delta Capital',
    interestRate: '12% p.a.',
    tenure: '12 months',
    minAmount: 25000,
    maxAmount: 100000,
    requiredDocs: ['Aadhar Card', 'PAN Card', 'Bank Statement (6 months)', 'Business Registration', 'ITR']
  },
  {
    id: '2',
    nbfcName: 'MicroFin Plus',
    interestRate: '14% p.a.',
    tenure: 'Up to 24 months',
    minAmount: 10000,
    maxAmount: 75000,
    requiredDocs: ['Aadhar Card', 'PAN Card', 'Bank Statement (6 months)', 'Business Proof']
  },
  {
    id: '3',
    nbfcName: 'QuickCash NBFC',
    interestRate: '15.5% p.a.',
    tenure: 'Up to 18 months',
    minAmount: 15000,
    maxAmount: 50000,
    requiredDocs: ['Aadhar Card', 'PAN Card', 'Bank Statement (3 months)']
  },
  {
    id: '4',
    nbfcName: 'GrowthFin Solutions',
    interestRate: '11.5% p.a.',
    tenure: '12-24 months',
    minAmount: 50000,
    maxAmount: 200000,
    requiredDocs: ['Aadhar Card', 'PAN Card', 'Bank Statement (12 months)', 'ITR', 'Business Registration', 'GST Certificate']
  },
  {
    id: '5',
    nbfcName: 'SmallBiz Finance',
    interestRate: '13% p.a.',
    tenure: 'Up to 12 months',
    minAmount: 20000,
    maxAmount: 60000,
    requiredDocs: ['Aadhar Card', 'PAN Card', 'Bank Statement (6 months)', 'Business Proof']
  }
];

export function LoanMarketplace({ user, loanCriteria, onNavigate, onLogout }: LoanMarketplaceProps) {
  const handleApply = (scheme: LoanScheme) => {
    onNavigate('document-submission', { scheme });
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

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('new-loan-step2', { loanCriteria })}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-4">Available Loan Schemes</h1>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <p className="text-gray-600 mb-4">Your search criteria:</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-success-50 px-4 py-2 rounded-lg border border-success-200">
                <span className="text-success-700">Amount: {loanCriteria.amount}</span>
              </div>
              <div className="bg-primary-50 px-4 py-2 rounded-lg border border-primary-200">
                <span className="text-primary-700">Period: {loanCriteria.period} months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Schemes Grid */}
        <div className="space-y-4">
          {loanSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Building className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">{scheme.nbfcName}</h3>
                      <p className="text-sm text-gray-500">RBI Registered NBFC</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-success-600 mb-1">{scheme.interestRate}</div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Loan Range</p>
                      <p className="text-gray-900">₹{(scheme.minAmount / 1000).toFixed(0)}k - ₹{(scheme.maxAmount / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Tenure</p>
                      <p className="text-gray-900">{scheme.tenure}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Processing Time</p>
                      <p className="text-gray-900">3-5 business days</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">Required Documents:</p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.requiredDocs.map((doc, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApply(scheme)}
                  className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 rounded-lg hover:from-success-700 hover:to-success-800 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h4 className="text-gray-900 mb-2">Need help choosing?</h4>
          <p className="text-gray-600 mb-4">
            Our financial advisors can help you select the best loan scheme for your business needs.
          </p>
          <button className="text-primary-600 hover:text-primary-700">
            Request Callback
          </button>
        </div>
      </main>
    </div>
  );
}
