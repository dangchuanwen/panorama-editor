import { BrowserRouter as Router } from 'react-router-dom';

import { renderRoutes } from 'routes/index';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">{renderRoutes(null)}</div>
    </Router>
  );
}

export default App;
