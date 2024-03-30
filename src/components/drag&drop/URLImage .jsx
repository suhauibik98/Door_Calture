import React, { useState } from "react";
import { Stage, Layer, Image, Text, Group } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleRotate = () => {
    setRotation(rotation + 45); // Rotate by 45 degrees on each click
  };

  return (
    <Group
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
    >
      <Image
        image={img}
        x={image.x}
        y={image.y}
        // Set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        rotation={rotation}
        onClick={handleRotate}
      />
      {isHovered && (
        <Text
          fill="red"
          width={100}
          height={100}
          fontSize={100}
          x={image.x + (img ? img.width / 2 : 0)} // Position relative to Image
          y={image.y - (img ? img.height / 2 : 0)} // Position relative to Image
          offsetX={100} // Adjust to position text to the right
          offsetY={-100} // Adjust to position text to the top
          text="X"
        />
      )}
    </Group>
  );
};

export default URLImage;
