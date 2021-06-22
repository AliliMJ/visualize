import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const tabDefaultStyle = 'text-gray-400 text-sm py-1 px-2 rounded-full';
const navDefaultStyle = 'flex space-x-4';

function Tabs({ tabs, className, tabStyle, activeClassName }) {
    return (
        <div className={classNames(navDefaultStyle, className)}>
            {tabs.map(({ name, path, ...props }) => (
                <NavLink
                    key={name}
                    to={path}
                    className={classNames(tabDefaultStyle, tabStyle)}
                    activeClassName={activeClassName}
                    {...props}
                >
                    {name}
                </NavLink>
            ))}
        </div>
    );
}

export default Tabs;
