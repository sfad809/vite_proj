/* App.jsx */
import { useState } from 'react';
import './index.css';
import Page from './component/Page';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="App">
      <Page isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default App;