import "./App.css";
import InputBox from "./components/InputBox";
import { useState } from "react";

import SuggestionList from "./components/SuggestionList";

function App() {
  const [emailList, setEmailList] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [input, setInput] = useState("");

  const addRecipientClick = (email) => {
    if (!recipients.includes(email)) {
      setRecipients([...recipients, { value: email, isEmailValid: true }]);
    }
    setInput("");
    setEmailList([]);
  };

  const removeRecipientClick = (emailToDelete) => {
    setRecipients(recipients.filter((email) => email !== emailToDelete));
  };

  return (
    <div className="App">
      <InputBox
        setEmailList={setEmailList}
        recipients={recipients}
        handleRemove={removeRecipientClick}
        inputValue={input}
        setInputValue={setInput}
        setRecipients={setRecipients}
      />
      {emailList.length > 0 && (
        <SuggestionList
          emailLists={emailList}
          handleClick={addRecipientClick}
        />
      )}
    </div>
  );
}

export default App;
