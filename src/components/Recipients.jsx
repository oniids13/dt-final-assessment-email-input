const Recipients = ({ email, handleRemove }) => {
  <span>
    {email}
    <button onClick={() => handleRemove(email)}>x</button>
  </span>;
};

export default Recipients;
