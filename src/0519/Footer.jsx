/* Footer.jsx */
import React from 'react';
const Footer = ({isDark, setIsDark}) => {
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDark ? 'black' : 'white',
        color: isDark ? 'white' : 'black', 
      }}
    >
     <button className="button" onClick={toggleTheme}>
       Dark Mode
     </button>
    </footer>
  );
};
export default Footer;