import React from 'react';

export const Header = ({ change }) => {
  return (
    <div className="header">
      <input
        type="text"
        placeholder="Введите характеристику"
        onBlur={change}
      />
    </div>
  )
}
