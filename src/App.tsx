import { BrowserRouter as Router } from 'react-router-dom';

import { renderRoutes } from 'routes/index';
import { useAuth } from 'auth/auth';

function App(): JSX.Element {
  const { AuthProvider } = useAuth();
  return (
    <AuthProvider>
      <Router>
        <div className="App">{renderRoutes(null)}</div>
      </Router>
    </AuthProvider>
  );
}

export default App;
