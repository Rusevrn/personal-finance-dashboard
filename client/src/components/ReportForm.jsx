import { useState } from "react";
import { FaBug } from "react-icons/fa";
import { RiLightbulbFlashFill } from "react-icons/ri";

const ReportForm = () => {
    const [isBugReport, setIsBugReport] = useState(true);

    return (
        <form className="space-y-5">
            {/* Request type */}
            <fieldset className="space-y-3">
                <legend className="mb-1.5 text-sm font-medium text-gray-200">
                    What would you like to tell us?
                </legend>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => setIsBugReport(true)}
                        aria-pressed={isBugReport}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${isBugReport
                                ? "border-violet-400/60 bg-violet-500/10"
                                : "border-white/10 bg-[#1f2028] hover:border-white/20"
                            }`}
                    >
                        <FaBug className={`shrink-0 text-xl ${isBugReport ? "text-violet-300" : "text-gray-400"}`}/>
                        <div>
                            <p className="text-sm font-medium text-white">Report a bug</p>
                            <p className="mt-1 text-xs text-gray-400">
                                Something isn't working correctly.
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsBugReport(false)}
                        aria-pressed={!isBugReport}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${!isBugReport
                                ? "border-violet-400/60 bg-violet-500/10"
                                : "border-white/10 bg-[#1f2028] hover:border-white/20"
                            }`}
                    >
                        <RiLightbulbFlashFill className={`shrink-0 text-xl ${!isBugReport ? "text-violet-300" : "text-gray-400"}`}/>
                        <div>
                            <p className="text-sm font-medium text-white">
                                Request a feature
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                Suggest an improvement for ZZAP.
                            </p>
                        </div>
                    </button>
                </div>
            </fieldset>

            {/* Subject */}
            <div className="space-y-1.5">
                <label
                    htmlFor="report-subject"
                    className="block text-sm font-medium text-gray-200"
                >
                    Subject
                </label>
                <input
                    id="report-subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={120}
                    placeholder={
                        isBugReport
                            ? "e.g. Transactions aren't loading"
                            : "e.g. Add monthly spending limits"
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#1f2028] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20"
                />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <label
                    htmlFor="report-description"
                    className="block text-sm font-medium text-gray-200"
                >
                    {isBugReport ? "What happened?" : "Describe your idea"}
                </label>
                <textarea
                    id="report-description"
                    name="description"
                    required
                    maxLength={5000}
                    rows={5}
                    placeholder={
                        isBugReport
                            ? "Tell us what went wrong and what you were trying to do..."
                            : "Explain how this feature would work and how it would help..."
                    }
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#1f2028] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20"
                />
            </div>

            {/* Bug-specific details */}
            {isBugReport && (
                <div className="space-y-1.5">
                    <label
                        htmlFor="reproduction-steps"
                        className="block text-sm font-medium text-gray-200"
                    >
                        Steps to reproduce
                        <span className="ml-2 font-normal text-gray-500">
                            Optional
                        </span>
                    </label>
                    <textarea
                        id="reproduction-steps"
                        name="reproductionSteps"
                        maxLength={3000}
                        rows={3}
                        placeholder={
                            "1. Open Transactions\n2. Select a date range\n3. Notice what happens..."
                        }
                        className="w-full resize-y rounded-xl border border-white/10 bg-[#1f2028] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20"
                    />
                </div>
            )}

            {/* Submit */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-gray-500">
                    Please don't include passwords or other sensitive information.
                </p>

                <button
                    type="submit"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                    Submit {isBugReport ? "bug report" : "feature request"}
                </button>
            </div>
        </form>
    );
};

export default ReportForm;