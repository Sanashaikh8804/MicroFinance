import { TrendingUp, LogOut, ArrowLeft, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react';
import type { User } from '../../App';

interface ApplicationTrackerProps {
  user: User;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const applicationData = {
  id: 'APP-2024-1234',
  nbfc: 'QuickCash NBFC',
  amount: '₹25,000',
  appliedDate: 'Dec 15, 2024',
  currentStage: 2,
  documents: [
    { name: 'Aadhar Card', status: 'approved', reviewedOn: 'Dec 16, 2024' },
    { name: 'PAN Card', status: 'approved', reviewedOn: 'Dec 16, 2024' },
    { name: 'Bank Statement', status: 'approved', reviewedOn: 'Dec 17, 2024' }
  ],
  fieldVisit: {
    status: 'completed',
    scheduledDate: 'Dec 18, 2024',
    completedDate: 'Dec 18, 2024',
    officer: 'Mr. Rajesh Kumar',
    remarks: 'Business premises verified. Active retail store with good footfall. Owner present during visit.'
  },
  finalStatus: {
    status: 'approved',
    approvedDate: 'Dec 19, 2024',
    certificateAvailable: true,
    remarks: 'Application approved for disbursement. Amount: ₹25,000 at 15.5% p.a. for 12 months.'
  }
};

export function ApplicationTracker({ user, onNavigate, onLogout }: ApplicationTrackerProps) {
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

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('borrower-dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Application Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="mb-2">Application Tracker</h1>
                <p className="text-xl text-primary-100 mb-4">{applicationData.nbfc}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-primary-200">Application ID</span>
                    <div className="text-white mt-1">{applicationData.id}</div>
                  </div>
                  <div>
                    <span className="text-primary-200">Amount</span>
                    <div className="text-white mt-1">{applicationData.amount}</div>
                  </div>
                  <div>
                    <span className="text-primary-200">Applied On</span>
                    <div className="text-white mt-1">{applicationData.appliedDate}</div>
                  </div>
                </div>
              </div>
              <div className="bg-success-500 px-4 py-2 rounded-lg">
                <span className="text-white">Approved</span>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-success-600 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-gray-900">Stage 1</span>
              </div>
              <div className="flex-1 h-1 bg-success-600 mx-4" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-success-600 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-gray-900">Stage 2</span>
              </div>
              <div className="flex-1 h-1 bg-success-600 mx-4" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-success-600 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="text-gray-900">Stage 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 1: Document Screening */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-success-50 border-b border-success-200 px-8 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success-600" />
              <h3 className="text-gray-900">Stage 1: Document Screening</h3>
              <span className="ml-auto bg-success-600 text-white px-3 py-1 rounded-full text-sm">
                Completed
              </span>
            </div>
          </div>
          <div className="p-8">
            <p className="text-gray-600 mb-6">
              All submitted documents have been reviewed and verified by {applicationData.nbfc}
            </p>
            <div className="space-y-3">
              {applicationData.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-5 h-5 text-success-600" />
                    <div>
                      <h4 className="text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">Reviewed on {doc.reviewedOn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm">
                      Approved
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 p-2">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage 2: Field Visit Report */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-success-50 border-b border-success-200 px-8 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success-600" />
              <h3 className="text-gray-900">Stage 2: Field Visit Report</h3>
              <span className="ml-auto bg-success-600 text-white px-3 py-1 rounded-full text-sm">
                Completed
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <span className="text-sm text-gray-500">Visit Officer</span>
                <p className="text-gray-900 mt-1">{applicationData.fieldVisit.officer}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Visit Date</span>
                <p className="text-gray-900 mt-1">{applicationData.fieldVisit.completedDate}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <span className="text-sm text-gray-600">Visit Report:</span>
              <p className="text-gray-900 mt-2">{applicationData.fieldVisit.remarks}</p>
            </div>
          </div>
        </div>

        {/* Stage 3: Final Certification */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-success-50 border-b border-success-200 px-8 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success-600" />
              <h3 className="text-gray-900">Stage 3: Final Certification</h3>
              <span className="ml-auto bg-success-600 text-white px-3 py-1 rounded-full text-sm">
                Approved for Disbursal
              </span>
            </div>
          </div>
          <div className="p-8">
            <div className="bg-success-50 border border-success-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-success-600 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-success-900 mb-2">Application Approved!</h4>
                  <p className="text-success-700 mb-4">{applicationData.finalStatus.remarks}</p>
                  <p className="text-sm text-success-600">
                    Approved on {applicationData.finalStatus.approvedDate}
                  </p>
                </div>
              </div>
            </div>

            {applicationData.finalStatus.certificateAvailable && (
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Approval Certificate
              </button>
            )}

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Next Steps:</strong> The loan amount will be disbursed to your registered bank account 
                within 2-3 business days. You will receive a disbursement confirmation via SMS and email.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
