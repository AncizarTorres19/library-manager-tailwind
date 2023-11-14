// Tabs.jsx
import { useState } from 'react';
//Assets
import { Icons } from '../../../assets/Icons/IconProvider';

const Tab = ({ label, isActive, onClick, icon, iconSelected }) => (
  <div
    className={`mt-6 mb-6 cursor-pointer flex items-center py-2 px-4 border-b-2 border-transparent text-base font-semibold ${isActive
      ? 'border-primary-blue1 text-primary-blue1'
      : 'hover:border-gray-400 text-black text-opacity-60'
      }`}
    onClick={onClick}
  >
    <span className="mr-2">
      <img src={isActive ? Icons[iconSelected] : Icons[icon]} alt={label} />
    </span>
    {label}
  </div>
);

export const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };
  return (
    <div className="flex">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={index === activeTab}
          onClick={() => handleTabClick(index)}
          icon={tab.icon}
          iconSelected={tab.iconSelected}
        />
      ))}
    </div>
  );
};