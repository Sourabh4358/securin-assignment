import React from "react";
import { TableRow, TableCell, Rating } from "@mui/material";

const RecipeRow = React.memo(({ recipe, onClick }) => {
  return (
    <TableRow
      hover
      style={{ cursor: "pointer" }}
      onClick={() => onClick(recipe)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${recipe.title}`}
    >
      <TableCell
        sx={{
          maxWidth: 180,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={recipe.title}
      >
        {recipe.title}
      </TableCell>
      <TableCell>{recipe.cuisine}</TableCell>
      <TableCell>
        <Rating value={recipe.rating || 0} precision={0.5} readOnly />
      </TableCell>
      <TableCell>{recipe.total_time} min</TableCell>
      <TableCell>{recipe.serves}</TableCell>
    </TableRow>
  );
});

export default RecipeRow;
