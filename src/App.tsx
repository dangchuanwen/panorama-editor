import { BrowserRouter as Router } from 'react-router-dom';

import { renderRoutes } from 'routes/index';
import { useAuth } from 'auth/auth';
import { LanguageWrapper } from 'language';

function App(): JSX.Element {
  const { AuthProvider } = useAuth();
  return (
    <LanguageWrapper>
      <AuthProvider>
        <Router>
          <div className="App">{renderRoutes(null)}</div>
        </Router>
      </AuthProvider>
    </LanguageWrapper>
  );
}

export default App;
