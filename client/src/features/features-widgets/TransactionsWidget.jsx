import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TransactionItem from "../../components/app-components/TransactionItem";
import DashWidget from "../../components/app-components/widgets/DashWidget";

const TransactionsWidget = ({ title, data }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 6;

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;

    const visibleTransactions = data.slice(
        startIndex,
        startIndex + pageSize
    );

    return (
        <DashWidget size="long">
            <div className="flex h-full min-h-0 flex-col">
                <h2 className="mb-3 text-lg font-semibold text-white">
                    {title}
                </h2>

                <div className="min-h-0 flex-1 overflow-y-auto">
                    {visibleTransactions.map((transaction) => (
                        <TransactionItem
                            key={transaction._id}
                            merchant={transaction.merchant}
                            category={transaction.category}
                            date={transaction.date}
                            type={transaction.type}
                            amount={transaction.amount}
                        />
                    ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                    <span className="text-xs text-white/45">
                        {startIndex + 1}-{Math.min(startIndex + pageSize, data.length)} of{" "}
                        {data.length}
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => page - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:bg-white/5 disabled:opacity-30"
                        >
                            <FiChevronLeft size={16} />
                        </button>

                        <span className="text-xs text-white/65">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => page + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:bg-white/5 disabled:opacity-30"
                        >
                            <FiChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </DashWidget>
    );
};

export default TransactionsWidget;