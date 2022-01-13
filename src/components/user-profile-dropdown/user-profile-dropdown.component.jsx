import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectCurrentUserDisplayName } from "../../redux/user/user.selectors";
import { logoutCurrentUser } from "../../redux/user/user.actions";

import './user-profile-dropdown.styles.scss'
import { useNavigate } from "react-router-dom";

const UserProfileDropdown = ({ displayName, logoutCurrentUser }) => {

  const [dropped, setDropped] = useState(false)

  let navigate = useNavigate();

  const handleLogout = () => {
    logoutCurrentUser();
    navigate('/')
  }

  return (
    <div className="profile-dropdown" >
      <div className="profile-button" onClick={() => setDropped(!dropped)}>
        <i className="bi bi-person-circle"></i>
        <p>{displayName}</p>
        {
          dropped
            ? <i className="bi bi-caret-up-fill"></i>
            : <i className="bi bi-caret-down-fill"></i>
        }
      </div>
      <div className={`options ${dropped ? '' : 'hide'}`}>
        <div className="button">Profile</div>
        <div className="button">Settings</div>
        <div className="button" onClick={handleLogout}>logout</div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  displayName: selectCurrentUserDisplayName
})

const mapDispatchToProps = dispatch => ({
  logoutCurrentUser: () => dispatch(logoutCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDropdown)