

import { FaHome , FaUser , FaHeart , FaPlus , FaBriefcase , FaUsers, FaSearch } from "react-icons/fa";


export const roleConfig = {
  admin: {
    nav: [
      { label: "Users", path: "/dashboard/users" , icon: FaUsers},
      { label: "Reports", path: "/dashboard/reports" , icon: FaBriefcase},
      { label: "Profile", path: "/dashboard/profile" , icon:FaUser},
    ],
  },

  landlord: {
    nav: [
      { label: "Home", path: "/dashboard" , icon: FaHome},
      { label: "My Props", path: "/dashboard/properties" , icon: FaBriefcase},
      { label: "Add", path: "/dashboard/add" , icon: FaPlus},
      { label: "Profile", path: "/dashboard/profile" , icon: FaUser},
    ],
  },

  agent: {
    nav: [
      { label: "Home", path: "/dashboard" , icon: FaHome},
      { label: "Listings", path: "/dashboard/listings" , icon: FaBriefcase},
      { label: "Clients", path: "/dashboard/clients" , icon: FaUsers},
      { label: "Profile", path: "/dashboard/profile" , icon:FaUser},
    ],
  },

  tenant: {
    nav: [
      { label: "Home", path: "/dashboard" , icon: FaHome},
      { label: "Explore", path: "/dashboard/explore" , icon:FaSearch},
      { label: "Favorites", path: "/dashboard/favorites" , icon:FaHeart},
      { label: "Profile", path: "/dashboard/profile" , icon:FaUser},
    ],
  },
};