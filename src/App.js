import React, {useState} from 'react';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import './App.css';
import { v4 as uuidv4 } from "uuid"; //used for the unique key

const App = () => {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const appId = "1df910a5";
  const appKey = "2a87bf35e2f61f77ad0ecc310d06635f";
  const url = `https://api.edamam.com/search?q=${input}&app_id=${appId}&app_key=${appKey}`;
  
  const getData = async () => {
    if (input !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No related food are found");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setInput("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  const onChange = e => setInput(e.target.value);
  return (
      <div className="main">
        <div className="App">
      <h3>Explore food recipes</h3>
      <form onSubmit={onSubmit} className="search-form">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={input}
          autoComplete="off"
          placeholder="Search Food"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {/* if recipes not equal to falsy, then show the Recipe component */}
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
      <div className="blank"></div>
    </div>
      </div>
  );
}

export default App;
