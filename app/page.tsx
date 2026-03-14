"use client";

import { useState } from "react";

type ActionItem = {
  owner: string;
  task: string;
  deadline: string;
};

type AnalysisResult = {
  summary: string;
  actionItems: ActionItem[];
  deadlines: string[];
  blockers: string[];
  followUpEmail: string;
};

export default function Home() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
  if (!notes.trim()) {
    setError("Please paste your meeting notes first.");
    setResult(null);
    return;
  }

  try {
    setLoading(true);
    setError("");
    setResult(null);

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });

    const text = await response.text();
    console.log("RAW BACKEND RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Backend did not return valid JSON. Raw response: ${text}`);
    }

    if (!response.ok) {
      throw new Error(data.error || data.details || "Something went wrong");
    }

    setResult(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-6 py-12 relative">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-white to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-pulse">
            MinuteMate AI
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Turn messy meeting notes into{" "}
            <span className="text-cyan-300 font-semibold">clear summaries</span>,{" "}
            <span className="text-violet-300 font-semibold">action items</span>,{" "}
            <span className="text-blue-300 font-semibold">deadlines</span>,{" "}
            <span className="text-pink-300 font-semibold">blockers</span>, and polished follow-up emails.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <label className="block text-sm font-medium text-slate-200 mb-3 tracking-wide">
            Paste your meeting notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Example: Today we discussed the mobile app launch. Ravi will complete the login page by Wednesday. Priya will test the payment integration before Friday. The client wants a demo on Monday. We still have an API delay issue from the backend side."
            className="w-full h-56 rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-4 py-4 text-white placeholder:text-slate-400 shadow-inner outline-none transition duration-300 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
          />

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-7 py-3 font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {loading ? "Generating..." : "Generate Insights"}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm">
            <p className="text-slate-300">
              Characters typed:{" "}
              <span className="font-semibold text-cyan-300">{notes.length}</span>
            </p>
            <p className="text-slate-400 hidden sm:block">
              AI-powered meeting clarity in seconds
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 grid gap-6">
            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
              <h2 className="text-2xl font-bold text-cyan-300 mb-3">Summary</h2>
              <p className="text-slate-200 leading-relaxed">{result.summary}</p>
            </div>

            <div className="rounded-3xl border border-violet-400/20 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
              <h2 className="text-2xl font-bold text-violet-300 mb-3">Action Items</h2>
              <div className="space-y-3">
                {result.actionItems?.length > 0 ? (
                  result.actionItems.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-slate-900/60 border border-white/10 p-4"
                    >
                      <p>
                        <span className="font-semibold text-cyan-300">Owner:</span>{" "}
                        {item.owner}
                      </p>
                      <p>
                        <span className="font-semibold text-cyan-300">Task:</span>{" "}
                        {item.task}
                      </p>
                      <p>
                        <span className="font-semibold text-cyan-300">Deadline:</span>{" "}
                        {item.deadline}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">No action items found.</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-blue-400/20 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
                <h2 className="text-2xl font-bold text-blue-300 mb-3">Deadlines</h2>
                {result.deadlines?.length > 0 ? (
                  <ul className="space-y-2 text-slate-200">
                    {result.deadlines.map((deadline, index) => (
                      <li
                        key={index}
                        className="rounded-xl bg-slate-900/60 border border-white/10 p-3"
                      >
                        {deadline}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">No deadlines found.</p>
                )}
              </div>

              <div className="rounded-3xl border border-pink-400/20 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
                <h2 className="text-2xl font-bold text-pink-300 mb-3">Blockers</h2>
                {result.blockers?.length > 0 ? (
                  <ul className="space-y-2 text-slate-200">
                    {result.blockers.map((blocker, index) => (
                      <li
                        key={index}
                        className="rounded-xl bg-slate-900/60 border border-white/10 p-3"
                      >
                        {blocker}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">No blockers found.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
              <h2 className="text-2xl font-bold text-emerald-300 mb-3">Follow-up Email</h2>
              <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                {result.followUpEmail}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}