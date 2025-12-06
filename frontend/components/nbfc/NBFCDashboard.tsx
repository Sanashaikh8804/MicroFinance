import { TrendingUp, LogOut, Plus, Eye, Users, FileText, TrendingDown } from 'lucide-react';
import type { User } from '../../App';

interface NBFCDashboardProps {
  user: User;
  onNavigate: (view: string, data?: any) => void;
  onLogout: () => void;
}

const activeSchemes = [
  {
    id: 'SCH-001',
    schemeName: 'Small Business Quick Loan',
    loanRange: '₹25k - ₹100k',
    interestRate: '12% p.a.',
    tenure: '12 months',
    activeApplicants: 15,
    approvedCount: 8
  },
  {
    id: 'SCH-002',
    schemeName: 'Retail Growth Fund',
    loanRange: '₹50k - ₹200k',
    interestRate: '11.5% p.a.',
    tenure: '12-24 months',
    activeApplicants: 8,
    approvedCount: 5
  },
  {
    id: 'SCH-003',
    schemeName: 'Micro Enterprise Support',
    loanRange: '₹10k - ₹50k',
    interestRate: '14% p.a.',
    tenure: 'Up to 12 months',
    activeApplicants: 22,
    approvedCount: 12
  }
];

const recentApplicants = [
  {
    id: 'APP-1234',
    name: 'Rahul Sharma',
    businessName: 'Rahul Kirana Store',
    businessType: 'Retail',
    scheme: 'Small Business Quick Loan',
    amount: '₹50,000',
    appliedDate: 'Dec 4, 2024',
    status: 'pending'
  },
  {
    id: 'APP-1235',
    name: 'Priya Patel',
    businessName: 'Priya Fashion Boutique',
    businessType: 'Retail',
    scheme: 'Small Business Quick Loan',
    amount: '₹75,000',
    appliedDate: 'Dec 3, 2024',
    status: 'under-review'
  },
  {
    id: 'APP-1236',
    name: 'Amit Singh',
    businessName: 'Singh Electronics',
    businessType: 'Wholesale',
    scheme: 'Retail Growth Fund',
    amount: '₹1,50,000',
    appliedDate: 'Dec 2, 2024',
    status: 'approved'
  },
  {
    id: 'APP-1237',
    name: 'Neha Gupta',
    businessName: 'Gupta Catering Services',
    businessType: 'Service',
    scheme: 'Micro Enterprise Support',
    amount: '₹35,000',
    appliedDate: 'Dec 1, 2024',
    status: 'pending'
  }
];

export function NBFCDashboard({ user, onNavigate, onLogout }: NBFCDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary-600" />
            <span className="text-xl text-gray-900">FinBridge</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">NBFC Portal</span>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Welcome back, {user.name}</h1>
          <p className="text-xl text-gray-600">Manage your loan schemes and review applications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Active Schemes</span>
              <FileText className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-3xl text-gray-900">3</div>
            <div className="text-sm text-gray-500 mt-1">Currently offering</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Applicants</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl text-gray-900">45</div>
            <div className="text-sm text-gray-500 mt-1">This month</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pending Review</span>
              <Eye className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl text-gray-900">12</div>
            <div className="text-sm text-gray-500 mt-1">Awaiting action</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Approved</span>
              <TrendingDown className="w-5 h-5 text-success-500" />
            </div>
            <div className="text-3xl text-gray-900">25</div>
            <div className="text-sm text-gray-500 mt-1">This month</div>
          </div>
        </div>

        {/* Create Scheme Button */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('create-scheme')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Loan Scheme
          </button>
        </div>

        {/* Active Loan Schemes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-gray-900">Active Loan Schemes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Scheme ID</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Scheme Name</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Loan Range</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Interest Rate</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Tenure</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Applicants</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Approved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeSchemes.map((scheme) => (
                  <tr key={scheme.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{scheme.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{scheme.schemeName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{scheme.loanRange}</td>
                    <td className="px-6 py-4 text-sm text-primary-600">{scheme.interestRate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{scheme.tenure}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{scheme.activeApplicants}</td>
                    <td className="px-6 py-4 text-sm text-success-600">{scheme.approvedCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-gray-900">Recent Applicants</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentApplicants.map((applicant) => (
              <div key={applicant.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{applicant.name}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          applicant.status === 'approved'
                            ? 'bg-success-100 text-success-700'
                            : applicant.status === 'under-review'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {applicant.status === 'approved'
                          ? 'Approved'
                          : applicant.status === 'under-review'
                          ? 'Under Review'
                          : 'Pending Review'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{applicant.businessName}</p>
                    <p className="text-sm text-gray-500">
                      Applied for: {applicant.scheme}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-gray-900 mb-1">{applicant.amount}</div>
                    <p className="text-sm text-gray-500">{applicant.appliedDate}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">Type: {applicant.businessType}</span>
                    <span className="text-gray-600">ID: {applicant.id}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('application-review', { applicationId: applicant.id })}
                    className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    Review Application
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
