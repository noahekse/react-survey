import { useState, useEffect } from "react";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";
import AnswersList from "./AnswersList";
import axios from "axios";

function Survey() {
  const [open, setOpen] = useState(false); // Ignore this state
  const [answers, setAnswers] = useState({
    id: "",
    color: "",
    spendTime: [],
    review: "",
    username: "",
    email: "",
  });
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/answers");
        setSubmittedAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers from the server:", error);
      }
    };

    fetchData();
  }, [submitted]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setAnswers((prev) => ({
        ...prev,
        spendTime: checked
          ? [...prev.spendTime, value]
          : prev.spendTime.filter((item) => item !== value),
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
  };

  const submitAnswers = async (newAnswer, method) => {
    try {
      console.log("Submitting answers:", newAnswer);
      const url = method === 'PUT'
        ? `http://localhost:5000/answers/${newAnswer.id}`
        : 'http://localhost:5000/answers';
  
      const response = await axios({
        method: method, 
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: newAnswer, 
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const answerToSubmit = {
      ...answers,
      id: answers.id == "" ? submittedAnswers.length.toString() : answers.id.toString(),
    };
  
    console.log("Form submitted with answers:", answerToSubmit);
  
    const existingAnswerIndex = submittedAnswers.findIndex((answer) => answer.id === answerToSubmit.id);
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...submittedAnswers];
      updatedAnswers[existingAnswerIndex] = answerToSubmit;
      await submitAnswers(answerToSubmit, "PUT");
    } else {
      await submitAnswers(answerToSubmit, "POST");
    }
    setSubmitted(true);
    setAnswers({ id: null, color: "", spendTime: [], review: "", username: "", email: "" });
  };

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={submittedAnswers} setAnswers={setAnswers} />
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck color?</h3>
            <ul>
              <RadioButton id="color-one" name="color" value="1" label="1" onChange={handleChange} checked={answers.color === "1"} />
              <RadioButton id="color-two" name="color" value="2" label="2" onChange={handleChange} checked={answers.color === "2"} />
              <RadioButton id="color-three" name="color" value="3" label="3" onChange={handleChange} checked={answers.color === "3"} />
              <RadioButton id="color-four" name="color" value="4" label="4" onChange={handleChange} checked={answers.color === "4"} />
            </ul>
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck?</h3>
            <ul>
              <Checkbox id="spend-swimming" name="spend-time" value="swimming" label="Swimming" onChange={handleChange} checked={answers.spendTime.includes("swimming")} />
              <Checkbox id="spend-bathing" name="spend-time" value="bathing" label="Bathing" onChange={handleChange} checked={answers.spendTime.includes("bathing")} />
              <Checkbox id="spend-chatting" name="spend-time" value="chatting" label="Chatting" onChange={handleChange} checked={answers.spendTime.includes("chatting")} />
              <Checkbox id="spend-noTime" name="spend-time" value="noTime" label="I don't like to spend time with it" onChange={handleChange} checked={answers.spendTime.includes("noTime")} />
            </ul>
          </div>
          <label>
            What else have you got to say about your rubber duck?
            <textarea name="review" cols="30" rows="10" value={answers.review} onChange={handleChange}></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input type="text" name="username" value={answers.username} onChange={handleChange} />
          </label>
          <label>
            Leave us your email pretty please??
            <input type="email" name="email" value={answers.email} onChange={handleChange} />
          </label>
          <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
