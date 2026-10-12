
import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

function MenuPage() {
  const [query, setQuery] = useState("");

  const debounced = useDebounce(query, 400);

  // Read backend API URL from environment variables
  const apiBaseUrl = (import.meta.env.VITE_API_URL || "")
    .trim()
    .replace(/\/+$/, "");

  // Use Railway API when configured.
  // Otherwise use local JSON for development.
  const menuUrl = apiBaseUrl
    ? `${apiBaseUrl}/api/menu`
    : "/menu.json";

  const {
    data: dishes,
    isLoading,
    error,
  } = useFetch(menuUrl);

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Could not load menu: {error}</p>;
  }

  const filtered = (dishes || []).filter((dish) =>
    dish.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div>
      <h1>CampusEats Dashboard</h1>

      <input
        type="text"
        placeholder="Search dishes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <br />
      <br />

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;
