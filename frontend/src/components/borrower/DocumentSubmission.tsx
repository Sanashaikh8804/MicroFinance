import { useState } from 'react';
import { TrendingUp, LogOut, ArrowLeft, Upload, CheckCircle, FileText } from 'lucide-react';
import type { User, LoanScheme } from '../../App';

interface DocumentSubmissionProps {
  user: User;
  scheme: LoanScheme;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function DocumentSubmission({ user, scheme, onNavigate, onLogout }: DocumentSubmissionProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File | null>>({});

  const handleFileUpload = (docName: string, file: File | null) => {
    setUploadedDocs({
      ...uploadedDocs,
      [docName]: file
    });
  };

  const allDocsUploaded = scheme.requiredDocs.every((doc) => uploadedDocs[doc]);

  const handleSubmit = () => {
    if (allDocsUploaded) {
      // In a real app, would submit documents here
      alert('Application submitted successfully! You can track your application status from the dashboard.');
      onNavigate('borrower-dashboard');
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
          onClick={() => onNavigate('loan-marketplace')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Marketplace
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
            <h2 className="mb-2">Submit Application Documents</h2>
            <p className="text-xl text-primary-100 mb-4">{scheme.nbfcName}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-primary-200">Interest Rate</span>
                <div className="text-white mt-1">{scheme.interestRate}</div>
              </div>
              <div>
                <span className="text-primary-200">Tenure</span>
                <div className="text-white mt-1">{scheme.tenure}</div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-gray-900 mb-2">Required Documents</h3>
              <p className="text-gray-600">
                Please upload all required documents to complete your application. All files should be clear and readable.
              </p>
            </div>

            {/* Document Upload List */}
            <div className="space-y-4 mb-8">
              {scheme.requiredDocs.map((docName) => {
                const isUploaded = uploadedDocs[docName];
                return (
                  <div
                    key={docName}
                    className={`border-2 rounded-xl p-6 transition-all ${
                      isUploaded
                        ? 'border-success-500 bg-success-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${
                          isUploaded ? 'bg-success-100' : 'bg-gray-100'
                        }`}>
                          {isUploaded ? (
                            <CheckCircle className="w-6 h-6 text-success-600" />
                          ) : (
                            <FileText className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{docName}</h4>
                          {isUploaded ? (
                            <p className="text-sm text-success-600">
                              {uploadedDocs[docName]?.name}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">
                              PDF, JPG, or PNG (Max 5MB)
                            </p>
                          )}
                        </div>
                      </div>
                      <label className="cursor-pointer">
                        <div className={`px-6 py-2.5 rounded-lg border-2 transition-colors ${
                          isUploaded
                            ? 'border-success-600 bg-success-600 text-white hover:bg-success-700'
                            : 'border-primary-600 text-primary-600 hover:bg-primary-50'
                        }`}>
                          {isUploaded ? 'Change' : 'Upload'}
                        </div>
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(docName, e.target.files?.[0] || null)}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Upload Progress</span>
                <span className="text-sm text-gray-900">
                  {Object.values(uploadedDocs).filter(Boolean).length} of {scheme.requiredDocs.length} documents
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-success-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(Object.values(uploadedDocs).filter(Boolean).length / scheme.requiredDocs.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Info Boxes */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Next Steps:</strong> After submission, {scheme.nbfcName} will review your documents 
                  within 1-2 business days. You'll be notified via SMS and email about the status.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Ensure all documents are valid and clearly visible. 
                  Blurry or invalid documents may cause delays in processing.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!allDocsUploaded}
              className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 rounded-lg hover:from-success-700 hover:to-success-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Application
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By submitting, you agree to share these documents with {scheme.nbfcName} for loan processing
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
