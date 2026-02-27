import React from 'react';

const NavigationMenu = ({ children, className }) => {
  return <nav className={className}>{children}</nav>;
};

export { NavigationMenu };
