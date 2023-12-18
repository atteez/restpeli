import React, { useEffect, useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:3001/'

function App() {
  const [questions, setQuestions] = useState([])
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    axios.get(URL + 'questions')
    .then(res=> 
      setQuestions(res.data))
    .catch(error => 
      console.log(error.message))  
  }, [])
  


  const Addquestion = async () => {
      axios.post(URL + 'addquestion', {
      que: questionText,
      ans: answerText
    })
      .then(res => {
        console.log(res.data.message)
        setQuestions([])
      })
      .catch(error => {
        console.log(error.message)
      });
  };
  return (

    <div className="App">
    <h1>Tietovisa</h1>
    <div>
      {questions.map(q => (
        <div key={q.id}>
          <strong>Kysymys:</strong> {q.question}<br />
          <strong>Vastaus:</strong> {q.answer}<br /><br />
        </div>
      ))}
    </div>
    <form onSubmit={Addquestion}>
      <label>Kysymys:</label>
      <input type="text" id="question" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required /><br /><br />
      <label>Vastaus:</label>
      <input type="text" id="answer" value={answerText} onChange={(e) => setAnswerText(e.target.value)} required /><br /><br />
      <button type="submit">Lisää kysymys</button>
    </form>
  </div>
  
  
  );
}

export default App;
