import NavBar from "../components/navigation";
import TableDisplayer from "../TableDisplayer";


export default function Watchlist() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <NavBar />
        Watchlist
      <TableDisplayer />
    </div>
  );
}
