import React, { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Collapse,
} from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const RecipeDetailsDrawer = ({ recipe, onClose }) => {
  const [expanded, setExpanded] = useState(false);

  if (!recipe) return null;

  const nutrients = recipe.nutrients || {};

  return (
    <Drawer anchor="right" open={!!recipe} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {recipe.title} - {recipe.cuisine}
        </Typography>

        <Typography paragraph>
          <b>Description:</b> {recipe.description || "No description available."}
        </Typography>

        <Box>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-controls="total-time-collapse"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setExpanded((prev) => !prev);
              }
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" flexGrow={1}>
              Total Time: {recipe.total_time} min
            </Typography>
            <IconButton size="small" aria-label="Expand total time details">
              {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </IconButton>
          </Box>
          <Collapse in={expanded} id="total-time-collapse">
            <Typography>Prep Time: {recipe.prep_time} min</Typography>
            <Typography>Cook Time: {recipe.cook_time} min</Typography>
          </Collapse>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Nutrition
          </Typography>
          <Table size="small" aria-label="nutrition info">
            <TableBody>
              <TableRow>
                <TableCell>Calories</TableCell>
                <TableCell>{nutrients.calories || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carbohydrate</TableCell>
                <TableCell>{nutrients.carbohydrateContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cholesterol</TableCell>
                <TableCell>{nutrients.cholesterolContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fiber</TableCell>
                <TableCell>{nutrients.fiberContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Protein</TableCell>
                <TableCell>{nutrients.proteinContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Saturated Fat</TableCell>
                <TableCell>{nutrients.saturatedFatContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sodium</TableCell>
                <TableCell>{nutrients.sodiumContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sugar</TableCell>
                <TableCell>{nutrients.sugarContent || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fat</TableCell>
                <TableCell>{nutrients.fatContent || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RecipeDetailsDrawer;
