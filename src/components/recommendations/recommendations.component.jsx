import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";

import { setNewReleases } from "../../redux/recommendation/recommendation.actions";
import { API_ENDPOINT } from "../../endpoints";

import CardsGroup from "../cards-group/cards-group.component";

import './recommendations.styles.scss'

const Recommendations = ({ token, setNewReleases, newReleases }) => {

  useEffect(() => {
    const fetchNewReleases = async (userToken) => {
      const response = await axios(`${API_ENDPOINT}browse/new-releases`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      console.log(response);
      setNewReleases(response.data.albums.items)
    }
    fetchNewReleases(token)
  }, [setNewReleases, token])

  return (
    <div className='recommendations'>
      <CardsGroup displayItems={newReleases} groupHeader={'Hot new releases'} />
    </div>
  )
}

const mapStateToProps = state => ({
  newReleases: state.recommendation.newReleases,
  token: state.user.currentUser.token
})

const mapDispatchToProps = dispatch => ({
  setNewReleases: newReleases => dispatch(setNewReleases(newReleases))
})


export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);