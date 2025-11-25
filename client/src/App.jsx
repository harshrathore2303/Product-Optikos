import { useState } from "react"

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="">
      <input type="text" name="prompt" placeholder=""/>
    </div>
  )
}

export default App
