import { Link } from "react-router";

const Header = ({ appVariant }) => {

    return (
        <header className={`fixed top-0 z-50 h-20 text-white 
            ${appVariant
                ? 'left-1/2 w-[95%] -translate-x-1/2 mt-2'
                : 'inset-x-0 border-b border-[#8a2e922f]'
            }`}
        >
            <div className="absolute bottom-0 left-1/2 h-px w-[63%] -translate-x-1/2 bg-linear-to-r from-transparent via-violet-600 to-transparent" />
            <nav className={`mx-auto flex h-full max-w-6xl items-center justify-between px-6 text-xl
                ${appVariant && 'border-2 border-[#7b258379] rounded-4xl'} `}>
                <Link to="/" className="text-3xl font-bold transition hover:text-violet-500">
                    Zzap
                </Link>

                <div className="flex gap-6">

                    <Link to="/partners" className=" transition hover:text-violet-400">
                        Partners
                    </Link>

                    <Link to="/security" className=" transition hover:text-violet-400">
                        Security
                    </Link>

                    <Link to="/app" className=" transition hover:text-violet-400">
                        App
                    </Link>

                </div>
            </nav>
        </header>
    );
};

export default Header;