import Link from 'next/link'

const NavBar = () => {
      return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/watchlist">Watchlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;