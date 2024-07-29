import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import './App.css';
import BlogPage from './pages/BlogPage';
import BlogDetail from './components/blog/BlogDetail';
import UserProfilePage from './pages/UserProfilePage';
import ApprovalPage from './pages/ApprovalPage';
import BlogApproval from './components/admin/BlogApproval';
import QuoteApproval from './components/admin/QuoteApproval';
import QuotePage from './pages/QuotePage';
import ProtectedRoute from './utils/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import QuoteDetail from './components/quotes/QuoteDetail';
import FeaturePage from './pages/FeaturePage';
import BlogFeature from './components/admin/BlogFeature';

function App() {
  const { currentUser } = useAuth()
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot" component={ForgotPasswordPage} />
      <Route path="/blogs" component={BlogPage} />
      <Route path="/quotes" component={QuotePage} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/quote/:id" component={QuoteDetail} />
      <Route path="/approval/blog/:id" component={BlogApproval} />
      <Route path="/feature/blog/:id" component={BlogFeature} />
      <Route path="/approval/quote/:id" component={QuoteApproval} />
      <Route path="/feature" component={FeaturePage}/>
      <ProtectedRoute path="/profile" component={UserProfilePage} auth={currentUser ? true : false} />
      <ProtectedRoute path="/approval" component={ApprovalPage} auth={currentUser ? true : false} />
    </Switch>
  );
}

export default App;