import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getAccessTokenFromURL } from '../../authorization/authorization.utils'
import { fetchCurrentUserAsync } from '../../redux/user/user.actions'
import { selectLoggedAt, selectCurrentUserToken } from "../../redux/user/user.selectors";

import GreetingCard from "../../components/greeting-card/greeting-card.component";
import RecentsCollection from "../../components/recents-collection/recents-collection.component";
import Recommendations from "../../components/recommendations/recommendations.component";

import './homepage.styles.scss'

const HomePage = ({ loggedAt, fetchCurrentUserAsync }) => {

  let navigate = useNavigate()
  useEffect(() => {

    if (window.location.hash && loggedAt === null) {
      const token = getAccessTokenFromURL(window.location.hash)
      fetchCurrentUserAsync(token)
    }
    else {
      navigate('/')
    }
  }, [fetchCurrentUserAsync, loggedAt, navigate])

  if (loggedAt) {
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
  loggedAt: selectLoggedAt
})

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUserAsync: (token) => dispatch(fetchCurrentUserAsync(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);