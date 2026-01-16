interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div style={{ display: 'flex', flexDirection:'column' , lineHeight: 1.1 }}>
        <h1 className="header-title">{title}</h1>
        <span className="header-subtitle">Happy Shopping</span>
      </div>
      <div className="header-user">
        <span>Profile</span>
        <div className="header-avatar">A</div>
      </div>
    </header>
  );
}

export default Header;
