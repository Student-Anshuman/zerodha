function Signup() {
  return (
    <div className="signup-container">
      <h1>Signup Page</h1>
      <form className="signup-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </form>
    </div>
  );
}

export default Signup;