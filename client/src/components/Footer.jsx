import { FaBug } from "react-icons/fa";

const Footer = () => {

  return (
    <footer className="border-t border-violet-400/20 bg-[#24232f] px-6 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <h3 className="text-base font-semibold text-white">Help us make Zzap better.</h3>
          <p className="mt-1 text-sm text-gray-400">Want a new feature or found a bug? Send us a heads-up!</p>
        </div>

        <button className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-2.5 text-sm font-medium text-violet-200 transition hover:border-violet-400/60 hover:bg-violet-500/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
          <FaBug className="text-lg" />Report an issue</button>
      </div>
    </footer>
  );
};

export default Footer;