import React, { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

import AppContext from '../../context'

import styles from './Card.module.scss'

function Card({
  id, 
  title, 
  imageUrl, 
  price, 
  onFavorite, 
  onPlus, 
  favorited = false, 
  loading = false
}) {
    const {isItemAdded, isItemFavorite} = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const obj = {id, parentId: id, title, imageUrl, price}

    const onClickPlus = () => {
      onPlus(obj)
    }

    const onClickFavorite = () => {
      onFavorite(obj)
      setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
          {
            loading ? (
            <ContentLoader 
              speed={2}
              width={150}
              height={187}
              viewBox="0 0 150 187"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
              <rect x="0" y="105" rx="3" ry="3" width="150" height="15" /> 
              <rect x="0" y="125" rx="3" ry="3" width="95" height="15" /> 
              <rect x="0" y="160" rx="8" ry="8" width="80" height="25" /> 
              <rect x="115" y="155" rx="8" ry="8" width="32" height="32" />
            </ContentLoader>
            ) : (
              <>
                {onFavorite && (
                  <div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isItemFavorite(id) || favorited ? "img/liked.svg" : "img/unliked.svg"} alt="Unliked" />
                  </div>
                )}
                <img width={133} height={112} src={imageUrl} alt="" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                  </div>
                  {onPlus && (
                    <img 
                      className={styles.plus} 
                      onClick={onClickPlus} 
                      src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} 
                      alt="Plus" 
                    />
                  )}
                </div>
              </>
            )
          }  
        </div>
    )
}

export default Card