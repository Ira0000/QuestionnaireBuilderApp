import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./index.css";
import LoaderMain from "./components/ui/Loader/LoaderMain";
import Navigation from "./components/sections/Home/Navigation";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Catalog = lazy(() => import("./pages/Catalog"));

const Builder = lazy(() => import("./pages/Builder"));
const QuestionnaireEditPage = lazy(
  () => import("./pages/QuestionnaireEditPage"),
);
const ResponsePage = lazy(() => import("./pages/ResponsePage"));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<LoaderMain />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/catalog/:id/edit" element={<QuestionnaireEditPage />} />
          <Route path="/catalog/:id/run" element={<ResponsePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Suspense>
    </div>
  );
}

export default App;
