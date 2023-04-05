import React, { useEffect, useState } from "react";
import BoxCreator from "./components/boxcreator";

function App() {
  const [showBoxes, setShowboxes] = useState(false);
  const [numBoxes, setNumBoxes] = useState(10);
  const [numBoxesInput, setNumBoxesInput] = useState(10);
  const [showOptions, setShowOptions] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [tempTextValue, setTempTextValue] = useState("");
  const [textArray, setTextArray] = useState([]);
  const [textFinalArray, setTextFinalArray] = useState([]);
  const [boxCreatorArray, setBoxCreatorArray] = useState([]);

  const handleButtonClick = (e) => {
    setTextValue(tempTextValue);
    setShowboxes(true);
    const trimmedTextArray = textArray.map((text) => text.trim());
    setTextFinalArray(trimmedTextArray);
    if (numBoxesInput < 1 || numBoxesInput > 11) {
      return alert("Please enter a number between 1 and 20");
    } else if (textFinalArray.length > 0) {
      setNumBoxes(textFinalArray.length);
    } else {
      setNumBoxes(numBoxesInput);
    }
  };
  useEffect(() => {
    console.log(textFinalArray[2]);
    const newBoxCreatorArray = Array.from({ length: numBoxes }).map((_, i) => (
      <BoxCreator key={i} numBoxes={numBoxes} color={textFinalArray[i]} />
    ));
    setBoxCreatorArray(newBoxCreatorArray);
  }, [numBoxes, textFinalArray]);
  const handleBoxInputChange = (e) => {
    setNumBoxesInput(parseInt(e.target.value));
  };
  const handleTextInputChange = (e) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9#,\s]/g, "");
    setTextArray(filteredValue.split(",").map((text) => text.trim("")));

    setTempTextValue(filteredValue);
  };
  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 p-2 w-full h-20">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Generate the boxes
        </button>
        <div className="relative inline-block text-left ml-4">
          <button
            className="bg-white rounded text-gray-700 py-2 px-4 border"
            onClick={handleOptionsClick}
          >
            Options
          </button>
          {showOptions && (
            <div className="inline-flex items-center bg-white rounded-md border-gray-300 px-4">
              <label className="text-gray-700 font-bold m-2">Amount:</label>
              <input
                id="amount-input"
                type="number"
                min={1}
                max={11}
                className="border rounded-md py-1 px-2 focus:outline-none w-20"
                value={numBoxesInput}
                onChange={handleBoxInputChange}
              />
              <label className="text-gray-700 font-bold m-2">
                Palette hex codes:
              </label>
              <textarea
                id="text"
                type="text"
                className="border rounded-md px-2 focus:outline-none resize-none w-[49rem]"
                textValue={textValue}
                onChange={handleTextInputChange}
                maxLength={178}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <h2>text array:</h2>
        <ul>
          {textFinalArray.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap">{showBoxes && boxCreatorArray}</div>
    </div>
  );
}

export default App;
