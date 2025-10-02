import Link from 'next/link'

const NavBar = () => {
      return (
    <div className="items-center">
    <nav>
      <ul style={{ display: "flex", listStyle: "none", gap: "1rem" }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/watchlist">Watchlist</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default NavBar;