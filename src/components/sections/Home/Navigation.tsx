import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

export default function Navigation() {
  const location = useLocation();
  const buildLinkClass = ({ isActive }: { isActive: boolean }): string => {
    const isCatalogPage = location.pathname === "/catalog";

    return cn("text-s text-black cursor-pointer", {
      "text-hoverRed pointer-events-none": isActive && isCatalogPage,
      "text-hoverRed": isActive && !isCatalogPage,
    });
  };

  return (
    <header className="sticky top-0 z-50 flex w-full justify-end border border-bgLightGray bg-bgLightGray p-4 shadow-sm md:p-6 lg:justify-center">
      <Link to="/" className="absolute top-7 left-2 cursor-pointer md:left-16">
        <p className="text-2xl font-extrabold tracking-tight">
          <span className="text-[#e44848]">Questionnaire</span>
          <br />
          <span className="text-[#475467]">Builder App</span>
        </p>
      </Link>
      <nav className="flex flex-col gap-3 md:flex-row md:gap-8">
        <NavLink
          to="/"
          className={({ isActive }) => buildLinkClass({ isActive })}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => buildLinkClass({ isActive })}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
