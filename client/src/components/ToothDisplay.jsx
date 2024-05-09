import { useState, useEffect } from "react";

const ToothDisplay = ({ starScore }) => {
  const [toothDisplay, setToothDisplay] = useState("https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothNaked.png?alt=media&token=d6c363a1-096c-47d1-a682-6739a827e761");

  useEffect(() => {
    handleToothDisplay();
  }, [starScore]);

  //handlerFunctions
 const handleToothDisplay = () => {
    if (starScore >= 5 && starScore <= 10) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothChild.png?alt=media&token=635837c5-4e84-422e-b18b-201574b1c4e3"
      );
    }
    if (starScore >= 10 && starScore <= 15) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothBusiness.png?alt=media&token=963d42eb-e2c5-4f4e-aaa8-f9944a4787c9"
      );
    }
    if (starScore >= 15 && starScore <= 20) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothVacation.png?alt=media&token=af2e8ef1-8409-41fa-8102-ffcd7ab1921f"
      );
    }
    if (starScore >= 20 && starScore <= 25) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothCool.png?alt=media&token=ff6bc403-1a8f-457f-9c35-c6ddbc8019e6"
      );
    }
    if (starScore >= 25 && starScore <= 30) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothFancy.png?alt=media&token=d8db8989-7870-44ba-b12c-b1f37893c3b9"
      );
    }
    if (starScore >= 30 && starScore <= 35) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothFlowers.png?alt=media&token=fcc8a854-6ab2-43cf-8d02-185959443aef"
      );
    }
    if (starScore >= 35 && starScore <= 40) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothSherrif.png?alt=media&token=b9ba4bb5-4eea-4af0-9934-3f6a51b37e8d"
      );
    }
    if (starScore >= 40 && starScore <= 45) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothWizard.png?alt=media&token=ab4fd174-2989-420d-b62a-35b6264dbeb6"
      );
    }
    if (starScore >= 45 && starScore <= 50) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothButterfly.png?alt=media&token=d2f3b3a9-ea09-49ae-a09c-ff1614d42a7b"
      );
    }
    if (starScore >= 50 && starScore <= 55) {
      setToothDisplay(
        "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FtoothUnicorn.png?alt=media&token=c71fe1c5-b2ac-4084-a39d-f55b15180631"
      );
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        className="helloBuddy"
        src="https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/brushBuddy%2FTeeth%20(1).png?alt=media&token=9cfc2aff-d9e9-4b7a-99c5-1f9e89d29ca9"
        style={{ width: "300px" }}
      ></img>
      <img src={toothDisplay} style={{ width: "250px" }}></img>
    </div>
  );
};

export default ToothDisplay;
