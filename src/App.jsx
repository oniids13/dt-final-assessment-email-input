import "./App.css";
import InputBox from "./components/InputBox";
import { useState } from "react";
import { emails } from "./emails";
import SuggestionList from "./components/SuggestionList";
import Recipients from "./components/Recipients";

function App() {
  const [emailList, setEmailList] = useState([]);
  const [emailSuggestions, setEmailSuggestions] = useState(false);
  const [recipients, setRecipients] = useState([]);

  const handleClick = (email) => {
    setRecipients([...recipients, email]);
    setEmailSuggestions(false);
  };

  const handleRemove = (emailToDelete) => {
    setRecipients(recipients.filter((email) => email !== emailToDelete));
  };

  console.log(recipients);

  return (
    <div className="App">
      {recipients.map((email, index) => (
        <Recipients key={index} email={email} handleRemove={handleRemove} />
      ))}
      <InputBox
        emails={emails}
        setEmailList={setEmailList}
        setEmailSuggestions={setEmailSuggestions}
      />
      {emailSuggestions && emailList.length > 0 && (
        <SuggestionList emailLists={emailList} handleClick={handleClick} />
      )}
    </div>
  );
}

export default App;
