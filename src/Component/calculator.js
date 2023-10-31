import React, { useState } from "react";
import "./calculator.css";
import { BsBackspace } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Calculator6() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState("");
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleDigitClick = (value) => {
    if (value === "0" && current === "0") return;
    setCurrent(current + value);
    if(operation!==""){
      setCurrent(value)
    }
  };

  const handleOperatorClick = (operator) => {
    if (current === "") return;
    if (previous !== "") {
      calculateResult();
      setOperation(operator);
    } else if (operator === operation) {
      setPrevious(current);
    } else {
      setPrevious(current + operation);
      setCurrent(current);
      setOperation(operator);
    }
    setHasDecimal(false);
  };

  const handleDecimalClick = () => {
    if (!hasDecimal) {
      setCurrent(current + ".");
      setHasDecimal(true);
    }
  };

  const calculateResult = () => {
    if (previous === "" || current === "") return;
    let result;
    const prevValue = parseFloat(previous);
    const curValue = parseFloat(current);

    switch (operation) {
      case "+":
        result = prevValue + curValue;
        break;
      case "-":
        result = prevValue - curValue;
        break;
      case "*":
        result = prevValue * curValue;
        break;
      case "/":
        if (curValue === 0) {
          setCurrent("cannot divde by zero");
          setPrevious("");
          setOperation("");
          return;
        }
        result = prevValue / curValue;
        break;
      default:
        return;
    }

    setCurrent(result.toString());

    setPrevious(previous);
    setOperation(operation + current + "=");
  };

  const handleEqualsClick = () => {
    if (operation) {
      calculateResult();
    }
  };

  const handleClearClick = () => {
    setCurrent("");

    setPrevious("");
    setOperation("");
    setHasDecimal(false);
  };

  const toggleSign = () => {
    if (current !== "") {
      setCurrent((parseFloat(current) * -1).toString());
    }
  };

  const percentage = () => {
    if (current === "") return;
    setCurrent((parseFloat(current) / 100).toString());
  };

  // const reciprocal = () => {
  //   if (current === "0") {
  //     setCurrent("Error");
  //     return;
  //   }
  //   setCurrent((1 / parseFloat(current)).toString());
  // };

  const square = () => {
    try {
      const result = (parseFloat(current) ** 2).toString();
      setCurrent(result);
      setPrevious("sqr(" + current + ")");
    } catch (error) {
      setCurrent("ERROR");
    }
  };

  const squareRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(current));
      setCurrent(result);
      setPrevious("√(" + current + ")");
    } catch (error) {
      setCurrent("ERROR");
      setPrevious("ERROR");
    }
  };

  const clearSingleResult = () => {
    try {
      setCurrent(current.slice(0, -1));
    } catch (error) {
      setCurrent("Error");
    }
  };

  const oneByX = () => {
    try {
      const currentVariable = parseFloat(current);
      if (currentVariable !== 0) {
        const result = 1 / currentVariable;
        setCurrent(result.toString());
        setPrevious("1/(" + current + ")");
      } else {
        setCurrent("Error");
      }
    } catch (error) {
      setCurrent("Error");
    }
  };

  const buttons = [
    { label: "%", clickHandler: percentage },
    { label: "CE", clickHandler: handleClearClick },
    { label: "C", clickHandler: handleClearClick },
    { label: <BsBackspace />, clickHandler: clearSingleResult },
    { label: "¹/𝓍", clickHandler: oneByX },
    { label: "𝓍²", clickHandler: square },
    { label: "²√𝓍", clickHandler: squareRoot },
    { label: "/", clickHandler: () => handleOperatorClick("/") },
    { label: "7", clickHandler: () => handleDigitClick("7") },
    { label: "8", clickHandler: () => handleDigitClick("8") },
    { label: "9", clickHandler: () => handleDigitClick("9") },
    { label: "×", clickHandler: () => handleOperatorClick("*") },
    { label: "4", clickHandler: () => handleDigitClick("4") },
    { label: "5", clickHandler: () => handleDigitClick("5") },
    { label: "6", clickHandler: () => handleDigitClick("6") },
    { label: "-", clickHandler: () => handleOperatorClick("-") },
    { label: "1", clickHandler: () => handleDigitClick("1") },
    { label: "2", clickHandler: () => handleDigitClick("2") },
    { label: "3", clickHandler: () => handleDigitClick("3") },
    { label: "+", clickHandler: () => handleOperatorClick("+") },
    { label: "+/-", clickHandler: toggleSign },
    { label: "0", clickHandler: () => handleDigitClick("0") },
    { label: ".", clickHandler: handleDecimalClick },
    { label: "=", clickHandler: handleEqualsClick },
  ];

  const renderButtons = () => {
    return buttons.map((button, index) => (
      <div className="col" key={index} onClick={button.clickHandler}>
        {button.label}
      </div>
    ));
  };

  return (
    <>
    <div className="btn"><Link  to='/'>back</Link></div>
    <div className="calc">
        
      <div className="section">
        <div className="display">
          <div className="heading">
            <div className="head">Calculator</div>
            <div className="standered">
              <span>
                <FaBars />
                Standard
              </span>
            </div>
          </div>

          <div className="secondDisplay">
            <h6>
              {previous}
              {operation}
            </h6>
          </div>
          <div className="firstDisaplay">
            <h2>{current}</h2>
          </div>
        </div>
        <div className="buttons">{renderButtons()}</div>
      </div>
    </div>
    </>
  );
}
export default Calculator6;
