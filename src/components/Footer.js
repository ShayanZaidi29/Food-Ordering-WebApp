import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          {/* Add your logo or content here */}
        </Link>
        <span className="text-muted">© 2023 FoodWow, Inc</span>
      </div>

      <div className="col-md-4 d-flex justify-content-center mb-md-0 mb-3">
        <ul className="list-unstyled d-flex mb-0">
          
           </ul>
      </div>
 </footer>
  );
};

export default Footer;
