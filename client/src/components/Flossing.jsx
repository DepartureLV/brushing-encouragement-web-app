import "./Flossing.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Flossing = ({ setFlossingDisplay, handleSetScores }) => {
  const handleFlossing = async () => {
    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    const resFloss = await fetch(`${BASE_URL}/starScore/flossy/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    console.log(resFloss);
    setFlossingDisplay(false);
  };

  return (
    <div className="flossingContainer">
      <p>Would you like to floss now?</p>
      <div className="flossingButtonContainer">
        <button
          onClick={async () => {
            await handleFlossing();
            handleSetScores();
          }}
        >
          Yes
        </button>
        <button onClick={() => setFlossingDisplay(false)}>No</button>
      </div>
    </div>
  );
};

export default Flossing;
