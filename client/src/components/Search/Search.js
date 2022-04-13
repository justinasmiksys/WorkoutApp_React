import React, { useState } from "react";
import { useDisplay } from "../../contexts/DisplayContext";
import { useInitialData } from "../../contexts/InitialDataContext";

export const Search = () => {
  //state of the search bar input
  const [searchQuery, setSearchQuery] = useState("");
  //gets the list of all exercises from the context provider
  const { allExercises } = useInitialData();
  //gets a setter of display from the display setter context provider
  const { setDisplay } = useDisplay();

  //updates the search bar when user types something
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  //handles the search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //creates new regular expression object, which is used to search things
    const search = new RegExp(searchQuery, "i");
    //filters all exercises and finds only ones that contain the input
    const searchResults = allExercises.data.filter((exercise) =>
      exercise.title.match(search)
    );
    //sets the display with the filtered exercises list
    setDisplay({ data: searchResults });
    //resets the search input
    setSearchQuery("");
  };

  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearchQuery}
      />
      <button type="submit" onClick={handleSearchSubmit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};
