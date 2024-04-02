import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Text, Group, Transformer } from "react-konva";
import useImage from "use-image";


const URLImage = ({ image,onClick }) => {
  const [img] = useImage(image.src);
  const [hover, setHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const trRef = useRef();
  const shapeRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // Attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const node = shapeRef.current;
    // console.log(imageSize);
    if (node) {
      setImageSize({
        width: node.width() * node.scaleX(),
        height: node.height() * node.scaleY(),
      });
    }
  }, [img]);

  const handleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  const handleDeselect = () => {
    setHover(false);
  };

  const handleTransformEnd = () => {
    const node = trRef.current.node();
    if (node) {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      setImageSize({
        width: node.width() * scaleX,
        height: node.height() * scaleY,
      });
    }
  };

  return ( <>
    <Group
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleDeselect}
      draggable
      onClick={handleSelect}
      onTap={handleSelect} // For touch devices
    >
      <Image
        ref={shapeRef}
        image={img}
        x={image.x}
        width={100}
        height={100}
        y={image.y}
        offsetX={img ? img.width / 10 : 0}
        offsetY={img ? img.height / 10 : 0}
      />
      
      {/* {console.log(imageSize.height)} */}
      {isSelected && (
        <Text
          ref={textRef}
          fill="green"
          fontSize={30}
          x={image.x }
          y={image.y }
          
        //   
        
          text="X"
          onClick={()=>{onClick(image)}}
          onTap={()=>{onClick(image)}}
        />
      )}
    </Group>
    {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          flipEnabled={false}
          onTransformEnd={handleTransformEnd}
        />
      )}
   </>
  );
};

export default URLImage;
