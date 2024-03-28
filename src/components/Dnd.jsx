import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import i0 from './gender.svg'; // Import your image file

const Dnd = () => {
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 40 });

  const handleDragEnd = (e) => {
    setImagePosition({
      x: e.target.x(),
      y: e.target.y()
    });
  };

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            image={i0} // Use i0 instead of i
            x={imagePosition.x}
            y={imagePosition.y}
            draggable
            onDragEnd={handleDragEnd}
          />
          <Image
            image={i0} // Use i0 instead of i
            x={window.innerWidth / 2}
            y={40}
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Dnd;
