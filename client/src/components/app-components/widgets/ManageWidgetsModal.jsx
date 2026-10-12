import { useEffect } from "react";
import { widgetRegistry } from "./widgetRegistry";
import { FiCheck, FiX } from "react-icons/fi";

const ManageWidgetsModal = ({ activeWidgets, onClose, onToggle, sectionWeights, sectionLimits, widgetLimitMessage }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="manage-widgets-title"
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#24252e] p-5 text-white shadow-2xl sm:p-6"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="manage-widgets-title"
                            className="text-xl font-bold"
                        >
                            Manage widgets
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Choose what appears on your dashboard.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close widget settings"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="space-y-2">
                    {Object.entries(widgetRegistry).map(([widgetKey, widget]) => {
                        const isActive =
                            activeWidgets.includes(widgetKey);

                        return (
                            <button
                                key={widgetKey}
                                type="button"
                                onClick={() => onToggle(widgetKey)}
                                aria-pressed={isActive}
                                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition 
                                        ${isActive
                                        ? "border-violet-500/40 bg-violet-500/5"
                                        : "border-white/5 bg-white/2 hover:border-white/15 hover:bg-white/4"
                                    }`}
                            >
                                <div className="flex-1">
                                    <p className="font-medium">
                                        {widget.label}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {widget.description}
                                    </p>
                                </div>

                                <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border
                                             ${isActive
                                            ? "border-violet-400 bg-violet-500 text-white"
                                            : "border-white/20 text-gray-500"
                                        }`}
                                >
                                    {isActive && <FiCheck size={14} />}
                                </span>
                            </button>
                        );
                    }
                    )}
                </div>

                {widgetLimitMessage && (
                    <p role="alert" className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-sm text-amber-300">
                        {widgetLimitMessage}
                    </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
                    <p className="text-sm text-gray-400">
                        Overview space: {sectionWeights.overview} / {sectionLimits.overview}
                    </p>
                    <p className="text-sm text-gray-400">
                        Activity space: {sectionWeights.activity} / {sectionLimits.activity}
                    </p>

                    <button className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-medium transition hover:bg-violet-500"
                        type="button"
                        onClick={onClose}
                    >Done</button>
                </div>
            </section>
        </div>
    );
};

export default ManageWidgetsModal;