import React, { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import URLImage from "./drag&drop/URLImage ";
// import { CustumHook } from "../context/appContext";

const Dnd = () => {
  // const { handelToStage } = CustumHook();
  let shouldPreventDefault = true;
  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const Images_Src = [
    "./images/Asset1.svg",
    "./images/Asset2.svg",
    "./images/Asset3.svg",
  ];

  const handleDragStart = (e) => {
    dragUrl.current = e.target.src;
  };


  const handleDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);

    setImages((prevImages) => [
      ...prevImages,
      {
        id: images.length,
        x: stageRef.current.getPointerPosition().x,
        y: stageRef.current.getPointerPosition().y,
        src: dragUrl.current,
      },
    ]);

  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    dragUrl.current = touch.target.src;
    shouldPreventDefault = true;
  };
  

  const handleTouchMove = (e) => {
    if (!shouldPreventDefault) return;
    e.preventDefault();
    const touch = e.touches[0];
    const stage = stageRef.current;
    stage.setPointersPositions(touch);

    const updatedImages = [
      ...images,
      {
        id: images.length,
        x: stageRef.current.getPointerPosition().x,
        y: stageRef.current.getPointerPosition().y,
        src: dragUrl.current,
      },
    ];

    setImages(updatedImages);
  };



  const callBack = (e) => {
    const RemoveImage = images.filter((img) => {
      return img.id !== e.id;
    });
    setImages(RemoveImage);
  };



  return (
    <div style={{ touchAction: "none" }}>
      Try to drag an image into the stage:
      <br />
      {Images_Src.map((src, i) => (
        <img
          key={i}
          alt={i}
          width={100}
          height={100}
          src={src}
          draggable="true"
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchMove}
        />
      ))}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ touchAction: "none" }}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth }
          height={window.innerHeight}
          style={{ border: "5px solid gray", backgroundColor: "#fff" }}
        >
          <Layer>
            {images.map((image, index) => (
              <>
                <URLImage key={index} onClick={callBack} image={image} />
              </>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Dnd;
