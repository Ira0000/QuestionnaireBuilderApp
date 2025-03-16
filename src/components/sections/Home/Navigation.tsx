import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { cn } from "@/utils/cn";
import { resetFilters } from "@/redux/campers/slice";
import Icon from "@/utils/icon";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const buildLinkClass = ({ isActive }: { isActive: boolean }): string => {
    const isCatalogPage = location.pathname === "/catalog";

    return cn("text-s text-black cursor-pointer", {
      "text-hoverRed pointer-events-none": isActive && isCatalogPage,
      "text-hoverRed": isActive && !isCatalogPage,
    });
  };

  const handleNavLinkClick = (to: string): void => {
    if (location.pathname !== to) {
      dispatch(resetFilters());
    }
  };

  return (
    <header className="sticky top-0 z-50 flex w-full justify-end border border-bgLightGray bg-bgLightGray p-4 shadow-sm md:p-6 lg:justify-center">
      <Link to="/" className="absolute top-7 left-2 cursor-pointer md:left-16">
        <Icon id="icon-logo" h={16} w={136} />
      </Link>
      <nav className="flex flex-col gap-3 md:flex-row md:gap-8">
        <NavLink
          to="/"
          className={({ isActive }) => buildLinkClass({ isActive })}
          onClick={() => handleNavLinkClick("/")}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => buildLinkClass({ isActive })}
          onClick={() => handleNavLinkClick("/catalog")}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
