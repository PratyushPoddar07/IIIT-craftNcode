import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, BarChart3, LogOut, Rabbit } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Medical Inventory', path: '/inventory' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Here you would typically clear any auth tokens/state
      alert('Logged out successfully');
      navigate('/');
    }
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Rabbit className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold">Bare Fox</span>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 w-full p-3 rounded-lg mb-1 transition-colors
              ${location.pathname === item.path
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-300 hover:bg-gray-800 mt-auto absolute bottom-4"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;