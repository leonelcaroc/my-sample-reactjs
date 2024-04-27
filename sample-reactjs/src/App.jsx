import React, {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback,
  useRef,
} from "react";

import "./App.css";
import Card from "./Card";

const Counter = ({ count }) => {
  return <div className="bigFont">{count}</div>;
};

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  // useEffect(() => {
  //   console.log("Component rendered");

  //   return () => {
  //     console.log("Component removed");
  //   };
  // }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setTriviaQuestions(jsonData.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const incrementCount = () => {
    for (let i = 0; i < 1000000000; i++) {}
    setCount(count + 1);
  };

  const triggerInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <div className="bigFont">My Number</div>
      <Counter count={count} />
      <button className="bigFont" onClick={incrementCount}>
        Plus 1
      </button>
      <input
        className="input"
        type="text"
        ref={inputRef}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={triggerInput}>Trigger Input</button>
      <Card num={count} />

      {triviaQuestions?.map((item, index) => {
        return <div key={index}>{`${index + 1 + "."} ${item.question}`}</div>;
      })}
    </div>
  );
}

export default App;
