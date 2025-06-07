import { useState } from "react";

const InputBox = ({ emails, setEmailList, setEmailSuggestions }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const suggestions = emails.filter((email) =>
        email.toLowerCase().startsWith(value.toLowerCase())
      );
      setEmailList(suggestions);
      setEmailSuggestions(true);
    } else {
      setEmailList([]);
      setEmailSuggestions(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter recipients..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputBox;
