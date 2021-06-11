import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const buttons = [
    { name: 'Projets', path: '/dashboard/acceuil/projets' },
    { name: 'Statistiques', path: '/dashboard/acceuil/statistiques' },
    { name: 'Finances', path: `/dashboard/acceuil/finances` },
    { name: 'Collecteurs', path: `/dashboard/acceuil/collecteurs` },
  ];

  return (
    <div className="flex space-x-3 border-b w-min">
      {buttons.map(({ name, path, ...props }) => (
        <NavLink
          key={name}
          to={path}
          className="text-gray-400 font-bold"
          activeClassName="text-gray-900 border-b-2 border-black"
          {...props}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}

export default Navbar;
