import React from 'react';

const Streamlist = ({items}) => {
  console.log('items', items);
  return (
    <div>
      {items.map(item => {
        return item.id;
      })}
    </div>
  );
}

export default Streamlist;
