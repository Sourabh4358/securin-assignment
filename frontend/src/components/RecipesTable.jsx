import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash.debounce";

import RecipeRow from "./RecipeRow";
import RecipeDetailsDrawer from "./RecipeDetailsDrawer";
import Filters from "./Filters";

const ROW_HEIGHT = 53; // approximate height of one table row

const RecipesTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); // zero based
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filters, setFilters] = useState({
    title: "",
    cuisine: "",
    rating: "",
    total_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [noResults, setNoResults] = useState(false);

  // Debounced fetch to reduce API calls on filter changes
  const fetchData = useCallback(
    debounce(async (page, rowsPerPage, filters) => {
      setLoading(true);
      setNoResults(false);

      try {
        // Determine if any filter is active
        const isFiltering = Object.values(filters).some((val) => val !== "");
        let res;

        if (isFiltering) {
          res = await axios.get("http://localhost:5000/api/recipes/search", {
            params: {
              ...filters,
              page: page + 1, // backend 1-based page
              limit: rowsPerPage,
            },
          });
          // Adjust to your backend response shape
          const data = res.data.data || res.data;
          setRecipes(data);
          // No pagination total from search, so set to length or 0 fallback
          setTotal(data.length);
          setNoResults(data.length === 0);
        } else {
          res = await axios.get("http://localhost:5000/api/recipes", {
            params: { page: page + 1, limit: rowsPerPage },
          });
          setRecipes(res.data.data);
          setTotal(res.data.total || 0);
          setNoResults(res.data.data.length === 0);
        }
      } catch (err) {
        console.error(err);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    }, 600),
    []
  );

  // Effect to load data on page/rowsPerPage/filters change
  useEffect(() => {
    fetchData(page, rowsPerPage, filters);
  }, [page, rowsPerPage, filters, fetchData]);

  // Handlers for pagination and filters
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      maxWidth="6xl"
      mx="auto"
      p={6}
      bg="white"
      rounded="md"
      shadow="md"
      className="bg-white rounded-md shadow-md p-6"
    >
      <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center">
        Recipes
      </Typography>

      <Filters filters={filters} onChange={setFilters} />

      {loading ? (
        <Box className="flex justify-center items-center py-20">
          <CircularProgress />
        </Box>
      ) : noResults ? (
        <Box className="text-center py-20 text-gray-500 font-semibold">
          No recipes found matching the criteria.
        </Box>
      ) : (
        <>
          <Box sx={{ overflowX: "auto" }}>
            <Table stickyHeader aria-label="recipes table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Cuisine</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Total Time</TableCell>
                  <TableCell>Serves</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipes.map((recipe) => (
                  <RecipeRow
                    key={recipe._id}
                    recipe={recipe}
                    onClick={setSelectedRecipe}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>

          <TablePagination
            rowsPerPageOptions={[15, 20, 30, 50]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}

      <RecipeDetailsDrawer recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </Box>
  );
};

export default RecipesTable;
