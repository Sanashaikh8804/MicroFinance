import { useState } from 'react';
import { Building2, TrendingUp, Shield, Users } from 'lucide-react';
import type { User } from '../../App';

interface LandingPageProps {
  onLogin: (user: User) => void;
  onNavigate: (view: string) => void;
}

export function LandingPage({ onLogin, onNavigate }: LandingPageProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (role: 'borrower' | 'nbfc') => {
    if (role === 'borrower') {
      onLogin({
        name: 'Rahul Sharma',
        role: 'borrower',
        businessName: 'Rahul Kirana Store'
      });
    } else {
      onLogin({
        name: 'Delta Capital',
        role: 'nbfc'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, would validate credentials
    handleDemoLogin('borrower');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-success-600 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <TrendingUp className="w-10 h-10" />
            <span className="text-3xl">FinBridge</span>
          </div>
          
          <h1 className="mb-6">Connecting Small Businesses with Growth Capital</h1>
          <p className="text-xl text-primary-100 mb-12">
            India's most trusted microfinance brokerage platform linking borrowers with NBFCs
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-2">Secure & Trustworthy</h4>
                <p className="text-primary-100">Bank-grade security for all your financial data</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-2">Verified NBFCs</h4>
                <p className="text-primary-100">All lenders are RBI-registered and verified</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="mb-2">10,000+ Businesses Funded</h4>
                <p className="text-primary-100">Join thousands of successful borrowers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-primary-100">
          © 2025 FinBridge. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-3 text-primary-700">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl">FinBridge</span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Sign in to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  Remember me
                </label>
                <button type="button" className="text-primary-600 hover:text-primary-700">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-md"
              >
                Sign In
              </button>
            </form>

            {/* Demo Login Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 text-center">Quick Demo Access:</p>
              <div className="space-y-3">
                <button
                  onClick={() => handleDemoLogin('borrower')}
                  className="w-full bg-success-50 text-success-700 border border-success-300 py-2.5 rounded-lg hover:bg-success-100 transition-colors"
                >
                  Login as Demo Borrower
                </button>
                <button
                  onClick={() => handleDemoLogin('nbfc')}
                  className="w-full bg-primary-50 text-primary-700 border border-primary-300 py-2.5 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  Login as Demo NBFC
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('registration-select')}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Register now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
