import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating, Drawer, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RecipesTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ title: "", cuisine: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [total, setTotal] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const endpoint = filters.title || filters.cuisine ? "/api/recipes/search" : "/api/recipes";
      const res = await axios.get(`http://localhost:5000${endpoint}`, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          ...filters,
        },
      });
      setRecipes(res.data.data);
      setTotal(res.data.total || res.data.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page, rowsPerPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(0); // reset to first page on filter change
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🍽️ Recipes</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          placeholder="Filter by Title"
          className="px-3 py-2 border rounded w-64"
        />
        <input
          name="cuisine"
          value={filters.cuisine}
          onChange={handleFilterChange}
          placeholder="Filter by Cuisine"
          className="px-3 py-2 border rounded w-64"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Cuisine</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Total Time</th>
              <th className="px-4 py-2 text-left">Serves</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <tr
                  key={r._id}
                  onClick={() => setSelectedRecipe(r)}
                  className="hover:bg-gray-100 cursor-pointer border-b"
                >
                  <td className="px-4 py-2 truncate max-w-xs">{r.title}</td>
                  <td className="px-4 py-2">{r.cuisine}</td>
                  <td className="px-4 py-2">
                    <Rating value={r.rating || 0} precision={0.5} readOnly />
                  </td>
                  <td className="px-4 py-2">{r.total_time} min</td>
                  <td className="px-4 py-2">{r.serves}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  {filters.title || filters.cuisine
                    ? "🔍 No results found for the applied filters."
                    : "📭 No recipes found in the database."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <span>
          Showing page <b>{page + 1}</b> of <b>{Math.ceil(total / rowsPerPage)}</b>
        </span>
        <div className="space-x-2">
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[15, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(page + 1) * rowsPerPage >= total}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Drawer Details */}
      <Drawer anchor="right" open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <div className="w-[400px] p-6 bg-white h-full overflow-y-auto space-y-4">
            <h2 className="text-xl font-bold">{selectedRecipe.title}</h2>
            <p className="text-gray-500">{selectedRecipe.cuisine}</p>

            <div>
              <p>
                <strong>Description:</strong> {selectedRecipe.description}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 font-medium">
                <span>Total Time: {selectedRecipe.total_time} min</span>
                <IconButton size="small">
                  <ExpandMoreIcon />
                </IconButton>
              </div>
              <p>Prep Time: {selectedRecipe.prep_time} min</p>
              <p>Cook Time: {selectedRecipe.cook_time} min</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Nutrition</h3>
              <table className="w-full text-sm text-left text-gray-700">
                <tbody>
                  <tr><td>Calories:</td><td>{selectedRecipe.nutrients?.calories}</td></tr>
                  <tr><td>Carbs:</td><td>{selectedRecipe.nutrients?.carbohydrateContent}</td></tr>
                  <tr><td>Cholesterol:</td><td>{selectedRecipe.nutrients?.cholesterolContent}</td></tr>
                  <tr><td>Fiber:</td><td>{selectedRecipe.nutrients?.fiberContent}</td></tr>
                  <tr><td>Protein:</td><td>{selectedRecipe.nutrients?.proteinContent}</td></tr>
                  <tr><td>Saturated Fat:</td><td>{selectedRecipe.nutrients?.saturatedFatContent}</td></tr>
                  <tr><td>Sodium:</td><td>{selectedRecipe.nutrients?.sodiumContent}</td></tr>
                  <tr><td>Sugar:</td><td>{selectedRecipe.nutrients?.sugarContent}</td></tr>
                  <tr><td>Fat:</td><td>{selectedRecipe.nutrients?.fatContent}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default RecipesTable;
