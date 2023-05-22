import {
  ShoppingBagIcon,
  NoSymbolIcon,
  TruckIcon,
  UserGroupIcon,
  CakeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const categories = {
  groceries: {
    label: "Groceries",
    category: "groceries",
    icon: <ShoppingBagIcon />,
  },
  unknown: {
    label: "Unknown",
    category: "unknown",
    icon: <NoSymbolIcon />,
  },
  travel: {
    label: "Travel",
    category: "travel",
    icon: <TruckIcon />,
  },
  family: {
    label: "Family",
    category: "family",
    icon: <UserGroupIcon />,
  },
  food: {
    label: "Food",
    category: "food",
    icon: <CakeIcon />,
  },
  friends: {
    label: "Friends",
    category: "friends",
    icon: <UserIcon />,
  },
};

export default categories;