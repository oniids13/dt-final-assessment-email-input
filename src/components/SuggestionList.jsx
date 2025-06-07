const SuggestionList = ({ emailLists, handleClick }) => {
  return (
    <ul className="suggestion-list">
      {emailLists.map((email, index) => (
        <li
          key={index}
          className="suggestion-item"
          onClick={() => handleClick(email)}
        >
          {email}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;
