import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./index.css";
import LoaderMain from "./components/ui/Loader/LoaderMain";
import Navigation from "./components/sections/Home/Navigation";

const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Catalog = lazy(() => import("./pages/Catalog"));
const CamperPage = lazy(() => import("./pages/CamperPage"));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<LoaderMain />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
