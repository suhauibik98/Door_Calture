import React from 'react';
import { useDrop } from 'react-dnd';

const Drop = ({ onDrop }) => {
  const [, drop] = useDrop({
    accept: 'IMAGE',
    drop: (item, monitor) => {
      const dropPosition = monitor.getClientOffset();
      if (dropPosition) {
        const { x, y } = dropPosition;
        onDrop(item.imageUrl, x, y);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ border: '2px dashed #000', padding: '10px', width: '90%', height: '40vh' }}>
      Drop here
    </div>
  );
};

export default Drop;
