import React from "react";

import NavItem from "../nav-item/nav-item.component";

import './side-bar-nav.styles.scss'

class SideBarNav extends React.Component {

  constructor() {
    super();
    this.state = {
      buttons: [
        { id:1, name: 'Search', iconUrl: 'bi bi-search', to: 'search' },
        { id:2, name: 'Home', iconUrl: 'bi bi-house-door', to: '/' },
        { id:3, name: 'Your Library', iconUrl: 'bi bi-music-note-list', to: 'library' }
      ]
    }
  }

  render() {
    return (
      <div className='side-bar-nav'>
        {
          this.state.buttons.map((button) =>
            <NavItem key={button.id} {...button} />
          )
        }
      </div>
    )
  }
}

export default SideBarNav;