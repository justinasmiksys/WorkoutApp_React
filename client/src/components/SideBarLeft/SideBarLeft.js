import { Search } from "../Search/Search";
import { FilterBar } from "../Filter/Filter";

import logo from '../../img/logo.jpg'
import exit from '../../img/x.png'


export const SideBarLeft = () => {

  const handleExit = () => {
    const sideLeft = document.getElementsByClassName('sidebar-left')[0]
    sideLeft.classList.remove('visible-left')
  }

  return (
    <div className="sidebar-left">
      <span onClick={handleExit} className="sidebar-left__exit">
        <img src={exit}></img>
      </span>
      <div className="logo">
        <img src={logo}></img>
      </div>
      <Search />
      <FilterBar />
    </div>
  );
};
