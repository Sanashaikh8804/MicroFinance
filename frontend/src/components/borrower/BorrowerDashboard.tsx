import { TrendingUp, LogOut, Plus, History, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { User } from '../../App';

interface BorrowerDashboardProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const loanHistory = [
  {
    id: '1',
    amount: '₹50,000',
    nbfc: 'Delta Capital',
    status: 'Active',
    interestPaid: '₹1,200',
    startDate: 'Jan 2025',
    statusColor: 'success'
  },
  {
    id: '2',
    amount: '₹35,000',
    nbfc: 'MicroFin Plus',
    status: 'Completed',
    interestPaid: '₹2,450',
    startDate: 'Aug 2024',
    statusColor: 'gray'
  },
  {
    id: '3',
    amount: '₹25,000',
    nbfc: 'QuickCash NBFC',
    status: 'In Review',
    interestPaid: '₹0',
    startDate: 'Dec 2024',
    statusColor: 'primary'
  }
];

export function BorrowerDashboard({ user, onNavigate, onLogout }: BorrowerDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-success-600" />
            <span className="text-xl text-gray-900">FinBridge</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Borrower Portal</span>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-success-500 to-success-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <h1 className="mb-2">Welcome back, {user.name}!</h1>
          <p className="text-xl text-success-100 mb-6">{user.businessName}</p>
          <button
            onClick={() => onNavigate('new-loan-step1')}
            className="bg-white text-success-700 px-6 py-3 rounded-lg hover:bg-success-50 transition-colors inline-flex items-center gap-2 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Get New Loan
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Active Loans</span>
              <CheckCircle className="w-5 h-5 text-success-500" />
            </div>
            <div className="text-3xl text-gray-900">1</div>
            <div className="text-sm text-gray-500 mt-1">₹50,000 outstanding</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">In Review</span>
              <Clock className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-3xl text-gray-900">1</div>
            <div className="text-sm text-gray-500 mt-1">Awaiting approval</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Borrowed</span>
              <History className="w-5 h-5 text-gray-500" />
            </div>
            <div className="text-3xl text-gray-900">₹1.1L</div>
            <div className="text-sm text-gray-500 mt-1">Lifetime total</div>
          </div>
        </div>

        {/* Loan History */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-gray-900">Loan History</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {loanHistory.map((loan) => (
              <div key={loan.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-gray-900 mb-1">{loan.amount} Loan</h4>
                    <p className="text-gray-600">{loan.nbfc}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      loan.statusColor === 'success'
                        ? 'bg-success-100 text-success-700'
                        : loan.statusColor === 'primary'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Interest Paid</span>
                    <div className="text-gray-900 mt-1">{loan.interestPaid}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Start Date</span>
                    <div className="text-gray-900 mt-1">{loan.startDate}</div>
                  </div>
                  <div className="text-right">
                    {loan.status === 'In Review' && (
                      <button
                        onClick={() => onNavigate('application-tracker')}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Track Application →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h4 className="text-gray-900 mb-2">Need Help?</h4>
          <p className="text-gray-600 mb-4">
            Our support team is available Monday to Saturday, 9 AM - 6 PM
          </p>
          <div className="flex gap-4">
            <button className="text-primary-600 hover:text-primary-700">
              Contact Support
            </button>
            <button className="text-primary-600 hover:text-primary-700">
              View FAQs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
