import React from 'react';

export const Car = (props) => {
  const { car, isShow } = props;
  return (
    <React.Fragment>
      <div style={{display: isShow ? 'block' : 'none'}} className="car">
        <div className="car__item">
          Характеристики:
        </div>
        <div className="car__item">
          <span>Country:</span><span>{car.country}</span>
        </div>
        <div className="car__item">
          <span>Brand:</span><span>{car.brand}</span>
        </div>
        <div className="car__item">
          <span>Model:</span><span>{car.model}</span>
        </div>
        {car.year && (
          <div className="car__item">
            <span>Year:</span><span>{car.year}</span>
          </div>
        )}
        <div className="car__item">
          <span>Vin:</span><span>{car.vin}</span>
        </div>
      </div>
    </React.Fragment>
  )
}
