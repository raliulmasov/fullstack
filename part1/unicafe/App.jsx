import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

const Stats = ({ good, neutral, bad }) => {

  const total = good + neutral + bad;
  const average = ((good * 1) + (bad * -1)) / total;
  const positivePercentage = (good * 100) / total;

  if (good < 1) {
    return (
      <p>no feedback given</p>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{average.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{positivePercentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div >
    )
  }

}


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header name="Give Feedback" />

      <Button name="good" onClick={handleGoodClick} />
      <Button name="neutral" onClick={handleNeutralClick} />
      <Button name="bad" onClick={handleBadClick} />

      <Header name="Statistics" />

      <Stats good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App