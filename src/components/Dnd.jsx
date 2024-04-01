import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import URLImage from "./drag&drop/URLImage ";
import { CustumHook } from "../context/appContext";

const Dnd = () => {
  const { handelToStage } = CustumHook();

  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const Images_Src = ["./images/Asset1.svg","./images/Asset2.svg","./images/Asset3.svg"];
  let shouldPreventDefault = true;

  const handleDragStart = (e) => {
    dragUrl.current = e.target.src;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);
    console.log(stageRef.current.getPointerPosition());
    setImages((prevImages) => [
      ...prevImages,
      {
        id:images.length,
        x: stageRef.current.getPointerPosition().x,
        y: stageRef.current.getPointerPosition().y,
        src: dragUrl.current,
      },
    ]);
  };

  const handleDragOver = (e) => {
    // console.log("insi");
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    // console.log(e,"Touch");
    const touch = e.touches[0];
    dragUrl.current = touch.target.src;
    // setImages({dragUrl.current})
    shouldPreventDefault = true;
  };
  // useEffect(() => {
  //   const handleTouchMove = (e) => {
  //     if (!shouldPreventDefault) return;
  //     e.preventDefault();
  //     const touch = e.touches[0];
  //     const stage = stageRef.current;

  //     // Check if the touch event is within the boundaries of the stage
  //     const stageRect = stage.container().getBoundingClientRect();
  //     if (
  //       touch.clientX >= stageRect.left &&
  //       touch.clientX <= stageRect.right &&
  //       touch.clientY >= stageRect.top &&
  //       touch.clientY <= stageRect.bottom
  //     ) {
  //       // Update the position of the last added image only when the touch is within the stage
  //       setImages((prevImages) => {
  //         const updatedImages = [...prevImages];
  //         if (updatedImages.length > 0) {
  //           const lastImageIndex = updatedImages.length - 1;
  //           updatedImages[lastImageIndex] = {
  //             ...updatedImages[lastImageIndex],
  //             x: stage.getPointerPosition().x,
  //             y: stage.getPointerPosition().y,
  //           };
  //         }
  //         return updatedImages;
  //       });
  //     }
  //   };

  //   window.addEventListener('touchmove', handleTouchMove, { passive: false });

  //   return () => {
  //     window.removeEventListener('touchmove', handleTouchMove);
  //   };
  // }, [images]);
  const handleTouchMove = (e) => {
    // console.log("jhiu");
    if (!shouldPreventDefault) return;
    e.preventDefault();
    const touch = e.touches[0];
    const stage = stageRef.current;
    stage.setPointersPositions(touch);
    

    const updatedImages = [
      ...images,
      {
        id:images.length,
        x: stageRef.current.getPointerPosition().x,
        y: stageRef.current.getPointerPosition().y,
        src: dragUrl.current,
      },
    ];
    setImages(updatedImages);
   
  };
  const callBack= (e)=>{
    const Updated = images.filter((img)=>{
     console.log(img,e.target._id);
      return img !== e.target._id 
        
    })
    setImages(Updated)
    console.log(e.target);
  }

 
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
          width={window.innerWidth - 1}
          height={window.innerHeight}
          style={{ border: "3px solid grey", backgroundColor: "#fff" }}
          ref={stageRef}
        
        >
          <Layer>
            {images.map((image, index) => (
              <>
            
              <URLImage key={index} onClick={callBack} image={image} /></>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Dnd;
