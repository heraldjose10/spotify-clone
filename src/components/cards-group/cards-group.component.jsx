import React from "react";

import Card from "../card/card.component";

import './cards-group.styles.scss'


const CardsGroup = ({ displayItems, groupHeader }) => {

  return (
    <div className='group'>
      <h2 className='group-heading'>{groupHeader}</h2>
      <div className='cards-container'>
        {
          displayItems
            ? displayItems
              .filter((value, index) => index <= 3)
              .map(item =>
                <Card
                  name={item.name}
                  imageUrl={
                    item.images.length > 0 ? item.images[1].url : ''
                  }
                  artists={item.artists}
                  key={item.id}
                />
              )
            : ''
        }
      </div>
    </div>
  )
}


export default CardsGroup;