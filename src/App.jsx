import { Button } from '@material-tailwind/react'
import { Input } from "@material-tailwind/react";
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from './lib/firebase'

import { useState } from "react";
import { uploadDataToFirestore } from './lib/upload';

function App() {
  const [value, loading] = useDocumentData(doc(db, 'your-collection', 'your-document-id'));
  const [input, setInput] = useState("");

  const handleInput = function (event) {
    setInput(event.target.value);
  }

  const handleButton = function () {
    // Add logic to handle the button click, e.g., upload data to Firestore
    uploadDataToFirestore(input);
  }

  if (loading) {
    return <p> loading... </p>
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-4xl">Note Maker</h1>
          <div className="w-72">
            <Input label="Your notes" value={input} onChange={handleInput} />
          </div>
          <Button onClick={handleButton}>Add</Button>
          {value.todos.map((elem, i) => {
            return <li key={i}>{elem}</li>
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
