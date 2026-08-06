import { Link } from "react-router-dom";
import { ChefHat, Search, User, Plus } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-green-600"
                >
                    <ChefHat size={28} />
                    <span>Recipe Organizer</span>
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className="text-gray-700 transition hover:text-green-600"
                    >
                        Home
                    </Link>

                    <Link
                        to="/favorites"
                        className="text-gray-700 transition hover:text-green-600"
                    >
                        Favorites
                    </Link>

                    <Link
                        to="/categories"
                        className="text-gray-700 transition hover:text-green-600"
                    >
                        Categories
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    <button className="rounded-full p-2 transition hover:bg-gray-100">
                        <Search size={20} />
                    </button>

                    <Link
                        to="/recipes/new"
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                    >
                        <Plus size={18} />
                        Add Recipe
                    </Link>

                    <Link
                        to="/profile"
                        className="rounded-full p-2 transition hover:bg-gray-100"
                    >
                        <User size={22} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;