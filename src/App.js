import Landing from './pages/Landing'
import styled from 'styled-components'

const Button = styled.button`
  background: red;
  color: white;
  font-size: 2rem;
`
const SecondButton = styled.button`
  background: blue;
  color: yellow;
  font-size: 3rem;
`

const App = () => {
  return (
    <div>
      <Button>click me</Button>
      <SecondButton>click me</SecondButton>
      <Landing />
    </div>
  )
}

export default App
