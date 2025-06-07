import { useEffect, useState } from "react";
import { fetchEmails } from "../emailMock";

const InputBox = ({
  setEmailList,
  recipients,
  handleRemove,
  inputValue,
  setInputValue,
  setRecipients,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        if (!inputValue) return setEmailList([]);
        setIsLoading(true);
        const emailSuggestions = await fetchEmails(inputValue);
        const filteredSuggestions = emailSuggestions.filter(
          (email) => !recipients.includes(email)
        );
        if (isMounted) {
          setEmailList(filteredSuggestions);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        setIsLoading(false);
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
    <div className="input">
      {recipients.map((email) => (
        <span
          key={email.value}
          className={email.isEmailValid ? "" : "invalid-email"}
        >
          {email.value}
          {!email.isEmailValid && <span className="error-icon">!</span>}
          <button className="delete-btn" onClick={() => handleRemove(email)}>
            x
          </button>
        </span>
      ))}
      <input
        type="text"
        placeholder={recipients.length === 0 ? "Enter recipients..." : ""}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleTabEnter}
      />
      {isLoading && (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default InputBox;
