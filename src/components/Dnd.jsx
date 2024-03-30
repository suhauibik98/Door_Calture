import React, { useState,useRef } from 'react';
import { Stage, Layer, Image,Text } from 'react-konva';
import useImage from 'use-image';
import URLImage from './drag&drop/URLImage ';

const Dnd = () => {
  
  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);

  const Images_Src =[
    "./images/po.jpg",
    "./images/i0.jpg"
  ]
  return (
    <div>
      Try to drag an image into the stage:
      <br />
      {
        Images_Src.map((src,i)=>(
          <>
          <img
          alt={[i]}
          width={100}
          height={100}
          src={src}
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
          /></>
        ))
}
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth-1}
          height={window.innerHeight}
          style={{ border: '3px solid grey' ,backgroundColor:"#fff" }}
          ref={stageRef}
        >
          <Layer>
            {console.log(images)}
            {images.map((image, index) => {
              return(
                <>
                <URLImage key={index} image={image} /></> )
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Dnd;
// const [imagePosition, setImagePosition] = useState({ x: 50, y: 40 });

  // const [image] = useImage("./images/po.jpg");

  // const handleDragEnd = (e) => {
  //   setImagePosition({
  //     x: e.target.x(),
  //     y: e.target.y()
  //   });
  // };

  // const handleRotation = (e) => {
  //   e.target.rotation(e.target.rotation() + 45); // Rotate by 45 degrees
  // };

  // return (
  //   <div>
  //     <Stage width={window.innerWidth} height={window.innerHeight}>
  //       <Layer>
  //          <Image
  //           image={image}
  //           x={imagePosition.x}
  //           y={imagePosition.y}
  //           draggable
  //           onDragEnd={handleDragEnd}
  //           // rotationDeg={10} // Initial rotation
  //           // onDblTap={handleRotation} // Rotate on double tap
  //           onClick={handleRotation}
  //           fill='red'
            
  //           />
  //       </Layer>
  //     </Stage>
  //   </div>
  // );