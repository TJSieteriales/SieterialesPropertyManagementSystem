function AppHeader({ user, onLogout }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Property Hotel Management PMS</p>
        <h1>PMS System Control Panel</h1>
      </div>

      <div className="account-box">
        <div>
          <strong>{user.name}</strong>
          <span>{user.role.replace("_", " ")}</span>
        </div>
        <button className="secondary-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
