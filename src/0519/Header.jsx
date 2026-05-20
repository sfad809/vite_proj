/* Header.jsx */
import React from 'react';
const Header = ({isDark}) => {
  return (
    <header 
      className="header"
      style={{
        backgroundColor: isDark ? 'black' : 'lightgrey',
        color: isDark ? 'white' : 'black', 
      }}
    >
      <h1>반갑습니다. 홍길동!!!</h1>        
    </header>
  );
};
export default Header;