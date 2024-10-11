import React from 'react';

function LoginPage() {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label>Username: </label>
        <input type="text" name="username" />
        <br />
        <label>Password: </label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
