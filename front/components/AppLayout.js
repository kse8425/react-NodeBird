import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>노드버드</a>
        </Link>
        <Link href="/profile">
          <a>profile</a>
        </Link>
        <Link href="/signup">
          <a>SignUp</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
