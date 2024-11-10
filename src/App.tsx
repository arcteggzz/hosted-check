import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
