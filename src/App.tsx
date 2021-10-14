import { BrowserRouter as Router } from 'react-router-dom';

import { renderRoutes } from 'routes/index';
import { useAuth } from 'auth/auth';
import { LanguageWrapper } from 'language';
import { SettingsWrapper } from 'settings';

function App(): JSX.Element {
  const { AuthProvider } = useAuth();
  return (
    <SettingsWrapper>
      <LanguageWrapper>
        <AuthProvider>
          <Router>
            <div className="App">{renderRoutes(null)}</div>
          </Router>
        </AuthProvider>
      </LanguageWrapper>
    </SettingsWrapper>
  );
}

export default App;
