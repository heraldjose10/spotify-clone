import React from "react";
import NavItem from "../nav-item/nav-item.component";

import './side-bar-btns-group.styles.scss';

class SideBarBtnsGroup extends React.Component {

  constructor() {
    super();
    this.state = {
      buttons: [
        { id: 1, name: 'Create Playlist', iconUrl: 'bi bi-plus-square-fill', to: 'add-playlist' },
        { id: 2, name: 'Liked Songs', iconUrl: 'bi bi-plus-square-fill', to: 'liked-songs' }
      ]
    }
  }
  render() {
    return (
      <div className='side-bar-btns-group'>
        {
          this.state.buttons.map((button) => (
            <NavItem {...button} key={button.id} />
          ))
        }
      </div>
    )
  }
}

export default SideBarBtnsGroup;