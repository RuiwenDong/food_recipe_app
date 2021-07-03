import React, { useState } from "react";
import Lists from "./Lists";


const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

  const handleClick = () => {
      setShow(!show);
  }

  return (
    <div className="recipe">
      <h2>{label}</h2>
      <img src={image} alt={label} />
      <button className="moreinfo">
      <a href={url} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
      </button> 
      {/* onClick the button will change the state value of show */}
      <button onClick={handleClick} className="ingre">Ingredients</button>
      {/* if show equals true, then show the Lists component */}
      {show && <Lists ingredients={ingredients} />}
    </div>
  );
};

export default Recipe;