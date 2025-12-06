import { useState } from 'react';
import { LandingPage } from './components/auth/LandingPage';
import { RegistrationSelection } from './components/auth/RegistrationSelection';
import { BorrowerRegistration } from './components/auth/BorrowerRegistration';
import { NBFCRegistration } from './components/auth/NBFCRegistration';
import { BorrowerDashboard } from './components/borrower/BorrowerDashboard';
import { NewLoanStep1 } from './components/borrower/NewLoanStep1';
import { NewLoanStep2 } from './components/borrower/NewLoanStep2';
import { LoanMarketplace } from './components/borrower/LoanMarketplace';
import { DocumentSubmission } from './components/borrower/DocumentSubmission';
import { ApplicationTracker } from './components/borrower/ApplicationTracker';
import { NBFCDashboard } from './components/nbfc/NBFCDashboard';
import { CreateScheme } from './components/nbfc/CreateScheme';
import { ApplicationReview } from './components/nbfc/ApplicationReview';

export type UserRole = 'borrower' | 'nbfc' | null;

export interface User {
  name: string;
  role: UserRole;
  businessName?: string;
}

export interface LoanCriteria {
  amount: string;
  period: string;
}

export interface LoanScheme {
  id: string;
  nbfcName: string;
  interestRate: string;
  tenure: string;
  minAmount: number;
  maxAmount: number;
  requiredDocs: string[];
}

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [loanCriteria, setLoanCriteria] = useState<LoanCriteria | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<LoanScheme | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'borrower') {
      setCurrentView('borrower-dashboard');
    } else {
      setCurrentView('nbfc-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    setLoanCriteria(null);
    setSelectedScheme(null);
  };

  const navigateTo = (view: string, data?: any) => {
    setCurrentView(view);
    if (data?.loanCriteria) setLoanCriteria(data.loanCriteria);
    if (data?.scheme) setSelectedScheme(data.scheme);
    if (data?.applicationId) setSelectedApplicationId(data.applicationId);
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && (
        <LandingPage onLogin={handleLogin} onNavigate={navigateTo} />
      )}
      {currentView === 'registration-select' && (
        <RegistrationSelection onNavigate={navigateTo} onBack={() => navigateTo('landing')} />
      )}
      {currentView === 'borrower-registration' && (
        <BorrowerRegistration onComplete={handleLogin} onBack={() => navigateTo('registration-select')} />
      )}
      {currentView === 'nbfc-registration' && (
        <NBFCRegistration onComplete={handleLogin} onBack={() => navigateTo('registration-select')} />
      )}
      
      {/* Borrower Views */}
      {currentView === 'borrower-dashboard' && user?.role === 'borrower' && (
        <BorrowerDashboard user={user} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'new-loan-step1' && user?.role === 'borrower' && (
        <NewLoanStep1 user={user} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'new-loan-step2' && user?.role === 'borrower' && loanCriteria && (
        <NewLoanStep2 user={user} loanCriteria={loanCriteria} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'loan-marketplace' && user?.role === 'borrower' && loanCriteria && (
        <LoanMarketplace user={user} loanCriteria={loanCriteria} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'document-submission' && user?.role === 'borrower' && selectedScheme && (
        <DocumentSubmission user={user} scheme={selectedScheme} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'application-tracker' && user?.role === 'borrower' && (
        <ApplicationTracker user={user} onNavigate={navigateTo} onLogout={handleLogout} />
      )}

      {/* NBFC Views */}
      {currentView === 'nbfc-dashboard' && user?.role === 'nbfc' && (
        <NBFCDashboard user={user} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'create-scheme' && user?.role === 'nbfc' && (
        <CreateScheme user={user} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentView === 'application-review' && user?.role === 'nbfc' && selectedApplicationId && (
        <ApplicationReview user={user} applicationId={selectedApplicationId} onNavigate={navigateTo} onLogout={handleLogout} />
      )}
    </div>
  );
}
