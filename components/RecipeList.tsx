import React from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

const RecipeList = ({ recipeList }) => {
  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl sm:max-w-full">
      <h2 className="text-4xl font-bold text-gray-400 mb-12">Recipes</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8">
        {recipeList?.map((recipe) => (
          <Link key={`recipe-${recipe.id}`} href={`/recipe-list/${recipe.id}`}>
            <Card>
              <CardContent className="bg-white rounded-md overflow-hidden cursor-pointer shadow-md hover:scale-[1.1] transition-all">
                <div className="w-full aspect-w-16 aspect-h-8">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width="80"
                    height="80"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="pt-4 pb-4">
                  <div className="text-lg text-blue-900 font-semibold">
                    {recipe.name}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="text-md text-gray-400">
                    Rating: {recipe.rating}
                  </div>
                  <div className="text-md text-gray-600 font-bold ml-auto">
                    {recipe.cuisine}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
