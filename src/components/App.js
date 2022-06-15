import { useState, useRef } from "react";
import axios from "axios";
import "./app.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function App() {
  const [questions, setQuestion] = useState([]);
  const [value, setValue] = useState('mongoDB');
  const limitRef = useRef("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function submitHandler(event) {
    event.preventDefault();

    fetchQuestion();
    //clear input Value after submit
    limitRef.current.value = "";
  }

  const fetchQuestion = async () => {
    await axios
      .post(`http://localhost:5000/question/`, {
        lang: value,
        limit: limitRef.current.value,
      })
      .then((response) => {
        setQuestion(response.data.result);
        if (response.data.result.length > 0) {
          NotificationManager.success("Success!", "", 1000);
        } else if (response.data.result.length === 0) {
          NotificationManager.info("No Data Found", "", 1000);
        }
      })
      .catch(({ error }) => {
        // throw new Error("Something went wrong!");
        NotificationManager.error("Something went wrong!");
      });
  };

  return (
    <div>
      <NotificationContainer />
      <div className="form">
        <form className="formSubmit" onSubmit={submitHandler}>
          <div className="inputbox">
            <select className="selectbox" value={value} onChange={handleChange}>
              <option value="mongoDB">mongoDB</option>
              <option value="PHP">PHP</option>
              <option value="React">React</option>
              <option value="SQL">SQL</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <div className="inputbox">
            <input type="number" ref={limitRef} placeholder="Limit" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="quiz-container">
        <h1>Today's Question</h1>
        {questions.map((item) => (
          <div className="quiz-header" key={item._id}>
            <h2>{item.questionTitle}</h2>
            <ol type="A">
              <li>
                <label>{item.optionA}</label>
              </li>
              <li>
                <label>{item.optionB}</label>
              </li>
              <li>
                <label>{item.optionC}</label>
              </li>
              <li>
                <label>{item.optionD}</label>
              </li>
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
