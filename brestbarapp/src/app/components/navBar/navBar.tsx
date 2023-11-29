export default function NavBar() {
    return (
      <div className="float-bar flex justify-center items-center">
        <div className="beer-emoji flex flex-row items-center">
          🍻<h2 className="ml-2">Brest bar</h2>
        </div>
        <button className="rounded-full flex flex-row bg-violet-400"> 🙋‍♀️ <p>Faire une demande</p> </button>
      </div>
    );
  }
  