import React from "react";

import NavItem from "../nav-item/nav-item.component";

import './side-bar-nav.styles.scss'

class SideBarNav extends React.Component {

  constructor() {
    super();
    this.state = {
      buttons: [
        { name: 'Search', iconUrl: 'bi bi-search', to:'search' },
        { name: 'Home', iconUrl: 'bi bi-house-door', to:'/' },
        { name: 'Your Library', iconUrl: 'bi bi-music-note-list', to:'library' }
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