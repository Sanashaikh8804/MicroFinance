import { Building, Store, ArrowLeft } from 'lucide-react';

interface RegistrationSelectionProps {
  onNavigate: (view: string) => void;
  onBack: () => void;
}

export function RegistrationSelection({ onNavigate, onBack }: RegistrationSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </button>

        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">Join FinBridge</h1>
          <p className="text-xl text-gray-600">
            Select your account type to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Borrower Card */}
          <button
            onClick={() => onNavigate('borrower-registration')}
            className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-success-500 hover:shadow-xl transition-all text-left group"
          >
            <div className="bg-gradient-to-br from-success-100 to-success-200 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Store className="w-8 h-8 text-success-700" />
            </div>
            
            <h3 className="text-gray-900 mb-3">I am a Borrower</h3>
            <p className="text-gray-600 mb-6">
              Small business owner looking for growth capital and microfinance loans
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success-500 rounded-full" />
                Access multiple NBFC loan offers
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success-500 rounded-full" />
                Quick application process
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-success-500 rounded-full" />
                Track your loan applications
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-success-600 group-hover:gap-3 transition-all">
              Register as Borrower
              <span>&rarr;</span>
            </div>
          </button>

          {/* NBFC Card */}
          <button
            onClick={() => onNavigate('nbfc-registration')}
            className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all text-left group"
          >
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building className="w-8 h-8 text-primary-700" />
            </div>
            
            <h3 className="text-gray-900 mb-3">I am an NBFC</h3>
            <p className="text-gray-600 mb-6">
              Non-Banking Financial Company looking to connect with verified small business borrowers
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                Create and manage loan schemes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                Review verified applications
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                Digital document verification
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-primary-600 group-hover:gap-3 transition-all">
              Register as NBFC
              <span>&rarr;</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
