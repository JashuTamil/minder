import TableDisplayer from "../TableDisplayer";


export default function Watchlist() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-1 pb-20 sm:p-20 gap-15">
      <h1 className="text-xl font-semibold"> Watchlist</h1>
      <TableDisplayer />
    </div>
  );
}
