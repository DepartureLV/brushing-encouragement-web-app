import { useState, useEffect } from "react";

const ToothDisplay = ({ starScore }) => {
  const [toothDisplay, setToothDisplay] = useState("../Public/toothNaked.png");

  useEffect(() => {
    handleToothDisplay();
  }, [starScore]);

  //handlerFunctions
  const handleToothDisplay = () => {
    if (starScore >= 5 && starScore <= 10) {
      setToothDisplay("../Public/toothChild.png");
    }
    if (starScore >= 10 && starScore <= 15) {
      setToothDisplay("../Public/toothBusiness.png");
    }
    if (starScore >= 15 && starScore <= 20) {
      setToothDisplay("../Public/toothCat.png");
    }
    if (starScore >= 20 && starScore <= 25) {
      setToothDisplay("../Public/toothCool.png");
    }
    if (starScore >= 25 && starScore <= 30) {
      setToothDisplay("../Public/toothFancy.png");
    }
    if (starScore >= 30 && starScore <= 35) {
      setToothDisplay("../Public/toothFlowers.png");
    }
    if (starScore >= 35 && starScore <= 40) {
      setToothDisplay("../Public/toothSherrif.png");
    }
    if (starScore >= 40 && starScore <= 45) {
      setToothDisplay("../Public/toothWizard.png");
    }
    if (starScore >= 45 && starScore <= 50) {
      setToothDisplay("../Public/toothButterfly.png");
    }
    if (starScore >= 50 && starScore <= 55) {
      setToothDisplay("../Public/toothUnicorn.png");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        className="helloBuddy"
        src="../public/HELLOBUDDY.png"
        style={{ width: "300px" }}
      ></img>
      <img src={toothDisplay} style={{ width: "250px" }}></img>
    </div>
  );
};

export default ToothDisplay;
