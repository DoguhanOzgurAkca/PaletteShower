import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

function BoxCreator({ color }) {
  console.log(color);
  if (color === undefined) {
    color = "#F77988";
  }
  const [currentColor, setCurrentColor] = useState(color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [changingColor, setChangingColor] = useState("#fff");
  const appStyle = {
    backgroundColor: currentColor,
  };

  const handlePickerChange = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const boxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [boxRef]);
  return (
    <div className="p-2">
      <div>{color}</div>

      <div className="relative h-28 w-28" style={appStyle} ref={boxRef}>
        <div onClick={handlePickerChange} className="absolute inset-0" />
        {showColorPicker && (
          <div className="h-48 w-48 absolute top-28 left-5">
            <SketchPicker
              color={changingColor}
              onChange={setChangingColor}
              onChangeComplete={handleColorChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BoxCreator;
