import React from "react";

import NavItem from "../nav-item/nav-item.component";

import './side-bar-nav.styles.scss'

class SideBarNav extends React.Component {

  constructor() {
    super();
    this.state = {
      buttons: [
        { name: 'Search', iconUrl: '/icons/search.svg', to:'search' },
        { name: 'Home', iconUrl: '/icons/house-door.svg', to:'/' },
        { name: 'Your Library', iconUrl: '/icons/music-note-list.svg', to:'library' }
      ]
    }
  }

  render() {
    return (
      <div className='side-bar-nav'>
        {
          this.state.buttons.map((button) =>
            <NavItem {...button} />
          )
        }
      </div>
    )
  }
}

export default SideBarNav;