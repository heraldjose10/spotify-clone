import React from "react";

import GreetingCard from "../../components/greeting-card/greeting-card.component";
import RecentsCollection from "../../components/recents-collection/recents-collection.component";
import Recommendations from "../../components/recommendations/recommendations.component";

import './homepage.styles.scss'

const HomePage = () => (
  <div className='homepage'>
    <GreetingCard />
    <RecentsCollection />
    <Recommendations/>
  </div>
)

export default HomePage;