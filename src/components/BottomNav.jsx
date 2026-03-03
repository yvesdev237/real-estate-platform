import { NavLink } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { roleConfig } from "../libs/RoleConfig";

const BottomNav = () => {
  const { role } = UseAuth();

  const navItems = roleConfig[role]?.nav || [];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg backdrop-blur-sm flex justify-around py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return(
          <NavLink key={item.path} to={item.path} className={({isActive}) => `flex flex-col items-center text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
            <Icon size = {22} />
            <span className="mt-1">{item.label}</span>
          </NavLink>
        )
      })
      }
    </div>
  );
};

export default BottomNav;