import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getAccessTokenFromURL } from '../../authorization/authorization.utils'
import { setCurrentUser } from '../../redux/user/user.actions'
import { API_ENDPOINT } from '../../endpoints'
import { selectCurrentUserId, selectCurrentUserToken } from "../../redux/user/user.selectors";

import GreetingCard from "../../components/greeting-card/greeting-card.component";
import RecentsCollection from "../../components/recents-collection/recents-collection.component";
import Recommendations from "../../components/recommendations/recommendations.component";

import './homepage.styles.scss'
import { selectRecentTracks } from "../../redux/player/player.selectors";

const HomePage = ({ currentUserId, currentUserToken, recentTracks, setCurrentUser }) => {

  let navigate = useNavigate()

  useEffect(() => {

    const getUserProfile = async (token) => {
      let response = await axios(`${API_ENDPOINT}me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      let userProfile = {
        displayName: response.data.display_name,
        id: response.data.id
      }
      setCurrentUser({
        token: token,
        ...userProfile
      })
      navigate('/')
    }

    if (window.location.hash && currentUserId==null) {
      const token = getAccessTokenFromURL(window.location.hash)
      getUserProfile(token)
    }
  }, [setCurrentUser, currentUserId, navigate])

  if (currentUserToken) {
    return (
      <div className='homepage'>
        <GreetingCard />
        <RecentsCollection />
        <Recommendations />
      </div>
    )
  }
  else {
    return (<h1>Loading</h1>)
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserToken: selectCurrentUserToken,
  recentTracks: selectRecentTracks,
  currentUserId: selectCurrentUserId
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);