import { useState } from 'react';
import { TrendingUp, LogOut, ArrowLeft, Eye, CheckCircle, XCircle, FileText, User, Building, Mail, Phone, MapPin } from 'lucide-react';
import type { User as UserType } from '../../App';

interface ApplicationReviewProps {
  user: UserType;
  applicationId: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

// Mock applicant data
const applicantData = {
  id: 'APP-1234',
  personalInfo: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    aadhar: 'XXXX XXXX 1234',
    pan: 'ABCDE1234F'
  },
  businessInfo: {
    name: 'Rahul Kirana Store',
    type: 'Retail',
    description: 'Small grocery and general store serving local community for 5 years. Regular customer base with daily footfall of 80-100 customers.',
    address: '123 MG Road, Bangalore - 560001'
  },
  loanDetails: {
    scheme: 'Small Business Quick Loan',
    amount: '₹50,000',
    period: '12 months',
    appliedDate: 'Dec 4, 2024'
  },
  financials: {
    turnover6Months: '₹4,50,000',
    lastYearITR: '₹6,80,000'
  },
  documents: [
    { name: 'Aadhar Card', status: null, url: '#' },
    { name: 'PAN Card', status: null, url: '#' },
    { name: 'Bank Statement (6 months)', status: null, url: '#' },
    { name: 'Business Registration', status: null, url: '#' },
    { name: 'ITR', status: null, url: '#' }
  ]
};

export function ApplicationReview({ user, applicationId, onNavigate, onLogout }: ApplicationReviewProps) {
  const [documentStatus, setDocumentStatus] = useState<Record<string, 'approved' | 'rejected' | null>>({});
  const [fieldVisitReport, setFieldVisitReport] = useState('');
  const [finalRemark, setFinalRemark] = useState('');

  const handleDocumentAction = (docName: string, action: 'approved' | 'rejected') => {
    setDocumentStatus({
      ...documentStatus,
      [docName]: action
    });
  };

  const handleApprove = () => {
    if (!fieldVisitReport || !finalRemark) {
      alert('Please complete field visit report and final remarks before approving.');
      return;
    }
    if (confirm('Are you sure you want to approve this application and issue the certificate?')) {
      alert('Application approved successfully! Certificate issued to borrower.');
      onNavigate('nbfc-dashboard');
    }
  };

  const handleReject = () => {
    if (!finalRemark) {
      alert('Please provide a final remark before rejecting.');
      return;
    }
    if (confirm('Are you sure you want to reject this application?')) {
      alert('Application rejected. Borrower will be notified.');
      onNavigate('nbfc-dashboard');
    }
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('nbfc-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Applicant Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Application Header */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Application Details</h3>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  Pending Review
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Application ID</span>
                  <p className="text-gray-900">{applicantData.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">Applied Date</span>
                  <p className="text-gray-900">{applicantData.loanDetails.appliedDate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Scheme</span>
                  <p className="text-gray-900">{applicantData.loanDetails.scheme}</p>
                </div>
                <div>
                  <span className="text-gray-500">Loan Amount</span>
                  <p className="text-lg text-primary-600">{applicantData.loanDetails.amount}</p>
                </div>
                <div>
                  <span className="text-gray-500">Period</span>
                  <p className="text-gray-900">{applicantData.loanDetails.period}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900">{applicantData.personalInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{applicantData.personalInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{applicantData.personalInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Aadhar</p>
                    <p className="text-gray-900">{applicantData.personalInfo.aadhar}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">PAN</p>
                    <p className="text-gray-900">{applicantData.personalInfo.pan}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Business Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="text-gray-900">{applicantData.businessInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Business Type</p>
                    <p className="text-gray-900">{applicantData.businessInfo.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-900">{applicantData.businessInfo.address}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-900 text-sm">{applicantData.businessInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-success-50 border border-success-200 rounded-xl p-6">
              <h4 className="text-gray-900 mb-4">Financial Summary</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Last 6 Months Turnover</span>
                  <p className="text-lg text-gray-900 mt-1">{applicantData.financials.turnover6Months}</p>
                </div>
                <div>
                  <span className="text-gray-600">Last Year ITR</span>
                  <p className="text-lg text-gray-900 mt-1">{applicantData.financials.lastYearITR}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Document Verification & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Verification */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="text-gray-900">Document Verification</h3>
              </div>
              <div className="p-6 space-y-4">
                {applicantData.documents.map((doc) => {
                  const status = documentStatus[doc.name];
                  return (
                    <div
                      key={doc.name}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        status === 'approved'
                          ? 'border-success-500 bg-success-50'
                          : status === 'rejected'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">{doc.name}</span>
                          {status === 'approved' && (
                            <CheckCircle className="w-5 h-5 text-success-600" />
                          )}
                          {status === 'rejected' && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-primary-600 hover:text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-50 flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDocumentAction(doc.name, 'approved')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              status === 'approved'
                                ? 'bg-success-600 text-white'
                                : 'bg-success-100 text-success-700 hover:bg-success-200'
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDocumentAction(doc.name, 'rejected')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              status === 'rejected'
                                ? 'bg-red-600 text-white'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            Disapprove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Field Visit Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="text-gray-900">Field Visit Report</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Record your observations from the physical verification of the business premises
                </p>
                <textarea
                  value={fieldVisitReport}
                  onChange={(e) => setFieldVisitReport(e.target.value)}
                  rows={6}
                  placeholder="Enter field visit observations, business verification details, and any relevant notes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include details about business premises, stock levels, customer activity, and owner interaction
                </p>
              </div>
            </div>

            {/* Final Action Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h3 className="text-gray-900">Final Decision</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Final Remark *</label>
                  <textarea
                    value={finalRemark}
                    onChange={(e) => setFinalRemark(e.target.value)}
                    rows={4}
                    placeholder="Provide your final assessment and decision rationale..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> This decision is final and will be communicated to the borrower. 
                    Ensure all documents and field visit verification are complete before proceeding.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={handleReject}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Application
                  </button>
                  <button
                    onClick={handleApprove}
                    className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 rounded-lg hover:from-success-700 hover:to-success-800 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve & Issue Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
