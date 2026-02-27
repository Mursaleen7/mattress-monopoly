import React from 'react';

const Form = ({ children, className, ...props }) => {
  return <form className={className} {...props}>{children}</form>;
};

export { Form };
