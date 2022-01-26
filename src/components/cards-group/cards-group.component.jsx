import React from "react";
import { Link } from "react-router-dom";

import Card from "../card/card.component";

import './cards-group.styles.scss'


const CardsGroup = ({ displayItems, groupHeader, groupType }) => {

  return (
    <div className='group'>
      <h2 className='group-heading'>{groupHeader}</h2>
      <div className='cards-container'>
        {
          displayItems
            ? displayItems
              .filter((value, index) => index <= 3)
              .map(item =>
                <Link
                  to={`/${groupType}/${item.id}`}
                  key={item.id}
                  className='card-item'
                >
                  <Card
                    name={item.name}
                    imageUrl={
                      item.images.length > 0 ? item.images[0].url : ''
                    }
                    artists={item.artists}
                  />
                </Link>
              )
            : ''
        }
      </div>
    </div>
  )
}


export default CardsGroup;