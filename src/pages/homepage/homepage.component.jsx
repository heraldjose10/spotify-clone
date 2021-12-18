import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";

import { getAccessTokenFromURL } from '../../authorization/authorization.utils'
import { setCurrentUser } from '../../redux/user/user.actions'

import GreetingCard from "../../components/greeting-card/greeting-card.component";
import RecentsCollection from "../../components/recents-collection/recents-collection.component";
import Recommendations from "../../components/recommendations/recommendations.component";

import './homepage.styles.scss'

const HomePage = ({ currentUser, setCurrentUser }) => {

  useEffect(() => {
    if (window.location.hash && !currentUser) {
      const token = getAccessTokenFromURL(window.location.hash)
      setCurrentUser({ token: token })
    }
  })

  if (currentUser) {
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

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);