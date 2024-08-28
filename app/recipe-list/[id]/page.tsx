import React from "react";

const fetchRecipe = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`, {
      cache: "force-cache",
    });
    const recipe = await response.json();
    return recipe;
  } catch (err) {
    throw new Error(err);
  }
};
const Recipe = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return <div>Recipe Not Found!</div>;
  }
  const recipe = await fetchRecipe(id);
  console.log(recipe);
  return (
    <div className="p-5">
      <h2 className="font-bold text-black text-2xl">{recipe?.name}</h2>
      <div className="font-semibold mt-3">
        <ul className="list-disc list-inside">
          {recipe?.ingredients?.map((ingredient, index) => {
            return <li key={`ing-${index + 1}`}>{ingredient}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;
