import React from 'react'
import { useDrag } from 'react-dnd';

const Drag = ({imageUrl}) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'IMAGE',
        item: { type: 'image', imageUrl },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
    

    return (
    <>

<img
      ref={drag}
      src={imageUrl}
      alt="Draggable Image"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />

    </>
  )
}

export default Drag
