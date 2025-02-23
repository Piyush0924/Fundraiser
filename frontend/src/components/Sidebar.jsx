import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CircleDollarSign, PlayCircle, HelpCircle, BookOpen, Star, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/' },
    { icon: <CircleDollarSign size={18} />, label: 'Transactions', path: '/transactions' },
    { icon: <PlayCircle size={18} />, label: 'Start Here', path: '/start' },
    { icon: <HelpCircle size={18} />, label: 'FAQ', path: '/faq' },
    { icon: <BookOpen size={18} />, label: 'Learning Modules', path: '/learning' },
    { icon: <Star size={18} />, label: 'Rewards', path: '/rewards' },
    { icon: <MessageSquare size={18} />, label: 'Feedback', path: '/feedback' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r">
      <div className="p-4 border-b">
        <div className="border rounded p-2 w-24 text-center text-gray-600">Logo</div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">General</div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md 
                ${location.pathname === item.path 
                  ? 'bg-red-100 text-red-600' 
                  : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;