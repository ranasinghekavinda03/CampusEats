import { Routes, Route, NavLink } from "react-router-dom";

import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <NavLink to="/">Menu</NavLink>

        <NavLink to="/order">Place Order</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<MenuPage />} />

        <Route path="/dish/:id" element={<DishDetailPage />} />

        <Route path="/order" element={<OrderPage />} />

        <Route
          path="*"
          element={<h2>404 - Page Not Found</h2>}
        />
      </Routes>
    </div>
  );
}

export default App;