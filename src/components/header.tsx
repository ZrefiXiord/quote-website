import Link from "next/link";
import LoginDialog from "./loginDialog";

export default function Header() {
  return (
    <header>
      <nav className="px-4 py-4 flex justify-between items-center h-32 bg-blue-300 shadow-md rounded-md">
        <select className="border-2 h-2/3 w-max rounded-xl px-2 font-bold">
          <option>Trier par:</option>
          <option>Auteur</option>
          <option>Date</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher une citation"
          className="border-2 px-2 size-2/3 rounded-xl shadow-md placeholder:font-bold focus:border-cyan-800"
        />
        <Link
          href={"/api"}
          className="border-2 rounded-xl px-2 h-2/3 flex items-center text-slate-950 bg-blue-500 border-blue-600 shadow-md font-bold"
        >
          Ajouter une citation
        </Link>
        <LoginDialog />
      </nav>
    </header>
  );
}
