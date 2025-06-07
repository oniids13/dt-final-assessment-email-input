import { useEffect } from "react";
import { fetchEmails } from "../emailMock";

const InputBox = ({
  setEmailList,
  recipients,
  handleRemove,
  inputValue,
  setInputValue,
  setRecipients,
}) => {
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        if (!inputValue) return setEmailList([]);
        const emailSuggestions = await fetchEmails(inputValue);
        const filteredSuggestions = emailSuggestions.filter(
          (email) => !recipients.includes(email)
        );
        if (isMounted) {
          setEmailList(filteredSuggestions);
          console.log(filteredSuggestions);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [inputValue, recipients, setEmailList]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTabEnter = (e) => {
    if (
      (e.key === "Enter" || e.key === "Tab") &&
      inputValue.trim() &&
      !recipients.includes(inputValue.trim())
    ) {
      e.preventDefault();
      setRecipients([
        ...recipients,
        {
          value: inputValue.trim(),
          isEmailValid: validateEmail(inputValue.trim()),
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="input-box">
      {recipients.map((email) => (
        <span
          key={email.value}
          className={email.isEmailValid ? "" : "invalid-email"}
        >
          {email.value}
          {!email.isEmailValid && <span className="error-icon">!</span>}
          <button onClick={() => handleRemove(email)}>x</button>
        </span>
      ))}
      <input
        type="text"
        placeholder="Enter recipients..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleTabEnter}
      />
    </div>
  );
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default InputBox;
