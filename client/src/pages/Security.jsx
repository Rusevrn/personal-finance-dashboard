import { FiLock } from "react-icons/fi";

const securityMeasures = [
    {
        title: "Data in transit",
        algorithm: "TLS 1.3",
        description:
            "HTTPS protects data exchanged between the application and its server from interception and tampering.",
    },
    {
        title: "Password storage",
        algorithm: "Argon2id",
        description:
            "Passwords should be hashed with a unique salt using a password-hashing algorithm, never stored as plaintext.",
    },
    {
        title: "Data encryption",
        algorithm: "AES-256-GCM",
        description:
            "Authenticated encryption can protect sensitive stored data when encryption at rest is required.",
    },
    {
        title: "Authentication",
        algorithm: "Session management",
        description:
            "Secure authentication, protected routes, and appropriate session expiration help prevent unauthorized access.",
    },
];

const Security = () => {
    return (
        <div className="flex flex-1 items-center justify-center px-4 py-8 pt-20 sm:px-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-white">
                        Security Overview *Illustrative page*
                    </h1>
                    <p className="max-w-2xl text-gray-400">
                        An overview of the security principles and
                        cryptographic technologies considered in Zzap's
                        application design.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-2 text-violet-400">
                            <FiLock size={20} className="text-violet-400" />
                        </div>

                        <div className="space-y-1">
                            <h2 className="font-semibold text-white">
                                Security by design
                            </h2>
                            <p className="text-sm leading-6 text-gray-400">
                                Zzap is designed around protecting sensitive
                                information, limiting unauthorized access, and
                                using established security standards rather
                                than custom cryptographic implementations.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {securityMeasures.map((measure) => (
                        <section
                            key={measure.title}
                            className="space-y-3 rounded-2xl border border-white/10 bg-white/2.5 p-5"
                        >
                            <h2 className="font-semibold text-white">
                                {measure.title}
                            </h2>

                            <span className="inline-flex rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-300">
                                {measure.algorithm}
                            </span>

                            <p className="text-sm leading-6 text-gray-400">
                                {measure.description}
                            </p>
                        </section>
                    ))}
                </div>

                <p className="leading-5 text-gray-200">
                    DISCLAIMER: This page presents examples of security technologies
                    and practices that may be used in a production application. They
                    are not claims about the project's current implementation. Authentication
                    is implemented as part of this project, but has not been
                    independently security-audited.
                </p>
            </div>
        </div>
    );
};

export default Security;