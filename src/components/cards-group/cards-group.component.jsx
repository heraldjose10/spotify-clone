import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setNewReleases } from "../../redux/recommendation/recommendation.actions";
import { API_ENDPOINT } from "../../endpoints";

import Card from "../card/card.component";

import './cards-group.styles.scss'


const CardsGroup = ({ newReleases, token, setNewReleases }) => {

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
    <div className='group'>
      <h2 className='group-heading'>Hot new releases</h2>
      <div className='cards-container'>
        {
          newReleases
            ? newReleases
              .filter((value, index) => index <= 4)
              .map(album =>
                <Card
                  name={album.name}
                  imageUrl={album.images[1].url}
                  artists={album.artists}
                  key={album.id}
                />
              )
            : ''
        }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardsGroup);