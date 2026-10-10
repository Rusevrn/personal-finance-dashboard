import { useNavigate } from "react-router";
import { BsArrowReturnLeft } from "react-icons/bs";
import ReportForm from "../components/ReportForm";

const Report = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-[#1f2028] px-4 py-10 text-white sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-2xl">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-3 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                >
                    <BsArrowReturnLeft />
                    Go back
                </button>

                <div className="mb-2">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                        Help us improve
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        What's on your mind?
                    </h1>

                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                        Found a bug or have an idea that could make ZZAP better?
                        We'd love to hear about it.
                    </p>
                </div>

                <section className="rounded-2xl border border-white/10 bg-[#25242f] sm:p-8">
                    <ReportForm />
                </section>
            </div>
        </main>
    );
};

export default Report;