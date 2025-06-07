const SuggestionList = ({ emailLists, handleClick }) => {
  return (
    <>
      <ul>
        {emailLists.map((email, index) => (
          <li key={index} onClick={() => handleClick(email)}>
            {email}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SuggestionList;
