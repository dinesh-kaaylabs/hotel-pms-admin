import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Global auth event handler for logout and session expiration
 * Listens to auth:logout-complete and auth:session-expired events
 * Redirects to login page using router-based navigation
 * 
 * Must be used in App.tsx or main layout
 */
export const useAuthEventHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogoutComplete = () => {
      navigate('/login', { replace: true });
    };

    const handleSessionExpired = () => {
      navigate('/login', { replace: true });
    };

    // Listen for logout completion
    window.addEventListener('auth:logout-complete', handleLogoutComplete);
    
    // Listen for session expiration
    window.addEventListener('auth:session-expired', handleSessionExpired);

    return () => {
      window.removeEventListener('auth:logout-complete', handleLogoutComplete);
      window.removeEventListener('auth:session-expired', handleSessionExpired);
    };
  }, [navigate]);
};
