
import AnswersItem from "./AnswersItem";
import PropTypes from 'prop-types';

AnswersList.propTypes = {
  answersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAnswers: PropTypes.func.isRequired,
};

export default function AnswersList({ answersList = [], setAnswers }) {
  console.log("Inside AnswersList: ", answersList);

  return (
    <ul>
      {answersList.map((answerItem, i) => (
        <AnswersItem answerItem={answerItem} key={i} setAnswers={setAnswers}/>
      ))}
    </ul>
)}



