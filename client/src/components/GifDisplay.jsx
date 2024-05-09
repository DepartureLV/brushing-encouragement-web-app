import { useEffect, useState } from "react";
const gifKey = import.meta.env.VITE_GIPHY_API;

const GifDisplay = ({ remainingSeconds, isRunning }) => {
  const [gifs, setGifs] = useState([]);
  const [index, setIndex] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    handleGetGifs();
  }, []);

  useEffect(() => {
    if (remainingSeconds === 120) {
      setIndex(0);
      setMessage("Geeeeeet Ready!");
    } else if (remainingSeconds === 90) {
      setIndex(1);
      setMessage("You are doing great! Switch sides.");
    } else if (remainingSeconds === 60) {
      setIndex(2);
      setMessage("You know what time it is! Switch again");
    } else if (remainingSeconds === 30) {
      setIndex(3);
      setMessage("Almost done Champ! Dont forget to floss :)");
    }
  }, [remainingSeconds]);

  async function handleGetGifs() {
    const gifArray = [];
    let randomNumber = Math.floor(Math.random() * 100);
    const fetchAdvice = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=toothbrush&api_key=${gifKey}&limit=4&offset=${randomNumber}`
    );
    const data = await fetchAdvice.json();

    for (let i = 0; i < 4; i++) {
      let newGif = data.data[i].images.downsized.url;
      gifArray.push(newGif);
    }

    setGifs(gifArray);

    // setGif(newGif);
    // setGifs(["https://media1.giphy.com/media/xT9IgpwOQfx9WmFxN6/giphy-downsized.gif?cid=4e996b57b40tws5xjzcsbpncnsjaw34og10k5rshqsyx7img&ep=v1_gifs_search&rid=giphy-downsized.gif&ct=g"]);
  }

  return (
    <>
      {isRunning && index >= 0 ? (
        <div>
          <h3>{message}</h3>
          <img
            className="gifSize"
            src={gifs[index]}
            alt="a tooth brushing gif"
          />
        </div>
      ) : (
        <div className="buffer"></div>
      )}
    </>
  );
};

export default GifDisplay;
