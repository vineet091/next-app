import RecipeList from "@/components/RecipeList";
import React from "react";

const fetchRecipeList = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes", {
      cache: "force-cache",
    });
    const result = await response.json();
    return result.recipes;
  } catch (err) {
    throw new Error(err);
  }
};

const RecipeListPage = async () => {
  const recipeList = await fetchRecipeList();
  console.log(recipeList);
  return (
    <div>
      <RecipeList recipeList={recipeList} />
    </div>
  );
};

export default RecipeListPage;
