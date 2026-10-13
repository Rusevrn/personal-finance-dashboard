import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TransactionItem from "./TransactionItem";
import DashWidget from "./widgets/DashWidget";

const ExpenseTransactionsWidget = () => {
  const expenses = [
    { id: 1, merchant: "Kaufland", category: "Groceries", date: "Oct 12", amount: -42.80 },
    { id: 2, merchant: "Netflix", category: "Entertainment", date: "Oct 11", amount: -15.99 },
    { id: 3, merchant: "Googlepay", category: "Entertainment", date: "Oct 10", amount: -32.50 },
    { id: 4, merchant: "Spotify", category: "Entertainment", date: "Oct 9", amount: -10.99 },
    { id: 5, merchant: "Lidl", category: "Groceries", date: "Oct 8", amount: -24.60 },
    { id: 6, merchant: "Googlepay", category: "Entertainment", date: "Oct 10", amount: -32.50 },
    { id: 7, merchant: "Spotify", category: "Entertainment", date: "Oct 9", amount: -10.99 },
    { id: 8, merchant: "Lidl", category: "Groceries", date: "Oct 8", amount: -24.60 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const totalPages = Math.ceil(expenses.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleExpenses = expenses.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <DashWidget size="long">
      <div className="flex h-full min-h-0 flex-col">
        <h2 className="mb-3 text-lg font-semibold text-white">
          Expense Transactions
        </h2>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {visibleExpenses.map((expense) => (
            <TransactionItem
              key={expense.id}
              merchant={expense.merchant}
              category={expense.category}
              date={expense.date}
              amount={expense.amount}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
          <span className="text-xs text-white/45">
            {startIndex + 1}–{Math.min(startIndex + pageSize, expenses.length)} of{" "}
            {expenses.length}
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

export default ExpenseTransactionsWidget;