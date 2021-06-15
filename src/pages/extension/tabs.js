import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const tabDefaultStyle = 'text-gray-400 font-bold';
const navDefaultStyle = 'flex space-x-3 border-b w-min';
const defaultActiveTab = 'border-b-2';

function Tabs({ tabs, className, tabStyle, activeClassName }) {
  return (
    <div className={classNames(navDefaultStyle, className)}>
      {tabs.map(({ name, path, ...props }) => (
        <NavLink
          key={name}
          to={path}
          className={classNames(tabDefaultStyle, tabStyle)}
          activeClassName={classNames(defaultActiveTab, activeClassName)}
          {...props}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
}

export default Tabs;
