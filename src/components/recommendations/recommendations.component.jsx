import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setNewReleases } from "../../redux/recommendation/recommendation.actions";
import { API_ENDPOINT } from "../../endpoints";
import { selectNewReleases } from "../../redux/recommendation/recommendation.selectors";
import { selectCurrentUserToken } from "../../redux/user/user.selectors"

import CardsGroup from "../cards-group/cards-group.component";

import './recommendations.styles.scss'

const Recommendations = ({ token, setNewReleases, newReleases }) => {

  useEffect(() => {
    const fetchNewReleases = async (userToken) => {
      try {
        const response = await axios(`${API_ENDPOINT}browse/new-releases`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        setNewReleases(response.data.albums.items)
      } catch (error) {
        console.log(error);
      }
    }
    fetchNewReleases(token)
  }, [setNewReleases, token])

  return (
    <div className='recommendations'>
      <CardsGroup
        displayItems={newReleases}
        groupHeader={'Hot new releases'}
        groupType={'album'}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  newReleases: selectNewReleases,
  token: selectCurrentUserToken
})

const mapDispatchToProps = dispatch => ({
  setNewReleases: newReleases => dispatch(setNewReleases(newReleases))
})


export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);