
import Image from "next/image";
import MovieDisplayer from "./MovieDisplayer";
import StoreProvider from "./StoreProvider";
import TableDisplayer from "./TableDisplayer";

// Step 1: Create a database of movies (name, director, cast, image, etc...keep it simple)
// Step 2: create a new component that takes those movies and displays them
// Step 3: add a "like" and "dislike" button
// Step 3.5: USE MUI TO MAKE IT CLEANER!! It looks like garbage. Make sure that the list ends once there's no other left. And try and output all the likes and dislike in a table.
// Step 4: IMPLEMENT REDUX STORE!! add a "database" that keeps track of likes and dislikes. make it local. use redux store.
// Step 5: Implement swiping functionality (replacing like and dislike) FIGURE OUT MOTION.IMG flipping!!!
// Step 6: Add an "already seen" button
// Step 7: Add new page that lets user see liked and disliked movies
// Step 8: Add a review section that allows the user to look up a film and add a review
// Step 9: Add user authentication and profiles

export default function Home() {
  return (
    <StoreProvider>
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

        <div className="font-sans flex gap-4 items-center flex-col sm:flex-row">
        MINDER
        </div>
      <MovieDisplayer />
      <TableDisplayer />
    </div>
    </StoreProvider>
  );
}
