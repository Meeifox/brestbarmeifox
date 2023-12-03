export default function NavBar() {
    return (
      <div className="z-20 flex w-full flex-col items-start gap-4 bg-bg p-4 text-[28px] shadow-md transition-colors lg:flex-row lg:items-center lg:justify-between">
        <div className="beer-emoji flex flex-row flex items-center text-white hover:text-violet-center pr-2">
          🍻<h2 className="ml-2">Brest bar</h2>
        </div>
        <button type="button" className="rounded-[4px] bg-violet-500 px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 flex flex-row"> 🙋‍♀️ <p>Faire une demande</p> </button>
      </div>
    );
  }
  