import { useState } from 'react';
import { Building2, TrendingUp, Shield, Users, Loader2, AlertCircle } from 'lucide-react';
import type { User } from '../../App';

interface LandingPageProps {
  onLogin: (user: User) => void;
  onNavigate: (view: string) => void;
}

export function LandingPage({ onLogin, onNavigate }: LandingPageProps) {
  const [loginType, setLoginType] = useState<'borrower' | 'nbfc'>('borrower');
  
  // Form States
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  
  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- BORROWER LOGIN (Still Mock/Demo for now) ---
    if (loginType === 'borrower') {
      // In a real app, you would add Borrower API call here
      handleDemoLogin('borrower');
      return;
    }

    // --- NBFC LOGIN (API Integration) ---
    if (loginType === 'nbfc') {
      if (!companyName || !password) {
        setError('Please enter Company Name and Password');
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:5000/api/nbfc/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: companyName,
            password: password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        // Success: Map backend response to App User type
        onLogin({
          name: data.companyName,
          role: 'nbfc',
          // Assuming User type supports optional ID, or you can store it in context
          // id: data.nbfcId 
        });

      } catch (err: any) {
        setError(err.message || 'Server connection failed');
      } finally {
        setIsLoading(false);
      }
    }
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
       <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-4/5 max-w-4xl">
          <div className="lg:hidden mb-12 flex items-center justify-center gap-3 text-primary-700">
            <TrendingUp className="w-10 h-10" />
            <span className="text-3xl font-semibold">FinBridge</span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 sm:p-12 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-gray-900 mb-3 text-3xl font-bold">Welcome Back</h2>
              <p className="text-gray-500 text-lg">Sign in to access your account</p>
            </div>

            {/* Login Type Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => {
                  setLoginType('borrower');
                  setError('');
                }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  loginType === 'borrower'
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Borrower Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginType('nbfc');
                  setError('');
                }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  loginType === 'nbfc'
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                NBFC Login
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {loginType === 'borrower' ? (
                <div>
                  <label className="block text-gray-700 mb-2.5 font-medium text-sm">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-base bg-gray-50 hover:bg-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 mb-2.5 font-medium text-sm">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter registered company name"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-base bg-gray-50 hover:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2.5 font-medium text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-base bg-gray-50 hover:bg-white"
                />
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2.5 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl font-semibold text-base mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Login Links */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-5 text-center font-medium">Quick Demo Access</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDemoLogin('borrower')}
                  disabled={isLoading}
                  className="bg-success-50 text-success-700 border border-success-200 py-3.5 px-4 rounded-xl hover:bg-success-100 transition-all font-medium text-sm hover:shadow-md disabled:opacity-50"
                >
                  Demo Borrower
                </button>
                <button
                  onClick={() => handleDemoLogin('nbfc')}
                  disabled={isLoading}
                  className="bg-primary-50 text-primary-700 border border-primary-200 py-3.5 px-4 rounded-xl hover:bg-primary-100 transition-all font-medium text-sm hover:shadow-md disabled:opacity-50"
                >
                  Demo NBFC
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-base">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('registration-select')}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
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