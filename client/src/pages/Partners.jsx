const Partners = () => {

    return (
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-white">
                        Our Partners
                    </h1>
                    <p className="max-w-2xl text-gray-400">
                        Connect with financial professionals who can help you make informed decisions about your financial future.
                    </p>
                </div>
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
                    <section className="min-w-0 h-full rounded-2xl border border-white/10 bg-white/2.5 p-6 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-3xl font-semibold text-violet-400">
                                JD
                            </div>

                            <div className="min-w-0 flex-1 space-y-5">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl font-semibold text-white">
                                            Doe Financial Consulting
                                        </h2>

                                        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                                            Zzap Partner
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-400">
                                        Financial planning · Budgeting · Personal finance
                                    </p>
                                </div>

                                <p className="max-w-3xl leading-7 text-gray-300">
                                    Doe Financial Consulting helps individuals
                                    understand their financial position, organize
                                    their budgets, and plan for their long-term
                                    goals. From building better spending habits to
                                    preparing for major life decisions, the focus
                                    is on practical guidance tailored to each
                                    client's circumstances.
                                </p>

                                <div className="space-y-3">
                                    <h3 className="font-medium text-white">Services</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300">
                                            Budget optimization</span>

                                        <span className="rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300">
                                            Savings strategies</span>

                                        <span className="rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300">
                                            Financial consultations</span>
                                    </div>
                                </div>

                                <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="text-sm text-gray-200">Sofia, Bulgaria</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Contact</p>
                                        <p className="text-sm text-gray-200">contact@example.com</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500"> Phone</p>
                                        <p className="text-sm text-gray-200">012 3455 234</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="min-w-0 space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold text-white">Find our office</h2>
                            <p className="text-sm text-gray-400">Visit us in Sofia, Bulgaria.</p>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-white/10">
                            <iframe
                                title="Doe Financial Consulting demo office location"
                                src="https://maps.google.com/maps?q=Sofia%2C%20Bulgaria&output=embed"
                                className="h-80 w-full sm:h-96"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default Partners;