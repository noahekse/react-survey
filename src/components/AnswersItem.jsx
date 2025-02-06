// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below

import PropTypes from "prop-types";
import axios from "axios";

const answersSet = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  noTime: "I don't like to spend time with it",
};

ItemsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.key}>{answersSet[item]}</li>
      ))}
    </ul>
  );
}

AnswersItem.propTypes = {
  answerItem: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    color: PropTypes.string,
    spendTime: PropTypes.arrayOf(PropTypes.string),
    review: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  setAnswers: PropTypes.func.isRequired,
};


export default function AnswersItem({
  answerItem: { id, color, spendTime = [], review, username, email },
  setAnswers,
}) {

  const handleOnClick = () => {
    setAnswers({ id, color, spendTime, review, username, email });
  };

  const handleDelete = () => {
    try {
      console.log(id, color, spendTime, review, username, email);
      console.log("Deleting answers of id:", id);
      const url = `http://localhost:5000/answers/${id}`;
  
      const response = axios.delete(url);
  
      console.log("Delete successful:", response.data);
    } catch (error) {
      console.error("Error deleting answers:", error);
    }
  };

  return (
    <li>
      <article className="answer">
        <h3>{username || "Anon"} said:</h3>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{color}</span>
        </p>

        <em>How do you like to spend time with your rubber duck?</em>
        <ItemsList list={spendTime} />

        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
        <button className="answer__edit" onClick={handleOnClick}>
          Edit{" "}
        </button>
        <button className="answer__edit" onClick={handleDelete}>
          Delete{" "}
        </button>
      </article>
    </li>
  );
}
