export default function Login() {
    return (
      <main className="login-body">
        <div className="login-container">
          <img
            src="https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt518e5105a0686696/663e30a08f19535905e50af2/Logo.svg"
            alt="Contentstack Logo" className="logo" />
          <a href={`${process.env.OAUTH_AUTHORIZE_URL}?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&response_type=code`}
            className="login-btn">Log In</a>
        </div>
      </main>
    );
  }