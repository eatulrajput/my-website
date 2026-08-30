"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Home,
  Heart,
  Briefcase,
  UserX,
  LockKeyhole,
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

type Step =
  | "relation"
  | "dob"
  | "character"
  | "anime"
  | "musical instrument"
  | "rejected"
  | "authorized";

interface ProtectionModalProps {
  onAuthorized: () => void;
}

export const ProtectionModal = ({ onAuthorized }: ProtectionModalProps) => {
  const [step, setStep] = useState<Step>("relation");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  const dobAnswers = (
    process.env.NEXT_PUBLIC_SECURITY_DOB || "dob"
  )
    .toLowerCase()
    .split(",");
  const characterAnswer = (
    process.env.NEXT_PUBLIC_SECURITY_CHARACTER || "character"
  )
    .toLowerCase()
    .trim();
  const animeAnswer = (
    process.env.NEXT_PUBLIC_SECURITY_ANIME || "anime"
  )
    .toLowerCase()
    .trim();
  const instrumentAnswer = (
    process.env.NEXT_PUBLIC_SECURITY_INSTRUMENT || "instrument"
  )
    .toLowerCase()
    .trim();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRelationSelect = (relation: string) => {
    if (relation === "Visitor" || relation === "Soulmate") {
      setStep("rejected");
    } else {
      setStep("dob");
    }
  };

  const triggerError = () => {
    setError(true);
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  const handleNext = () => {
    const val = inputValue.toLowerCase().trim();
    setError(false);

    if (step === "dob") {
      if (dobAnswers.every((ans) => val.includes(ans))) {
        setStep("character");
        setInputValue("");
      } else triggerError();
    } else if (step === "character") {
      if (val.includes(characterAnswer)) {
        setStep("anime");
        setInputValue("");
      } else triggerError();
    } else if (step === "anime") {
      if (val.includes(animeAnswer)) {
        setStep("musical instrument");
        setInputValue("");
      } else triggerError();
    } else if (step === "musical instrument") {
      if (val.includes(instrumentAnswer)) {
        setStep("authorized");
        setTimeout(() => onAuthorized(), 1500);
      } else triggerError();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) handleNext();
  };

  const relations = [
    { name: "Friend",    icon: Users,    label: "close friend" },
    { name: "Relative",  icon: Home,     label: "family member" },
    { name: "Soulmate",  icon: Heart,    label: "significant other" },
    { name: "Colleague", icon: Briefcase,label: "work buddy" },
    { name: "Visitor",   icon: UserX,    label: "just browsing" },
  ];

  const getProgress = (s: Step) => {
    const map: Partial<Record<Step, number>> = {
      dob: 25, character: 50, anime: 75, "musical instrument": 100, authorized: 100,
    };
    return map[s] ?? 0;
  };

  const getStepNumber = (s: Step) => {
    const map: Partial<Record<Step, number>> = {
      dob: 1, character: 2, anime: 3, "musical instrument": 4,
    };
    return map[s] ?? 0;
  };

  const shakeVariants = {
    idle:  { x: 0, opacity: 1, scale: 1, y: 0 },
    shake: { x: [0, -10, 10, -7, 7, -4, 4, 0], opacity: 1, scale: 1, y: 0, transition: { duration: 0.45 } },
  };

  const prevStep = (s: Step): Step =>
    s === "dob"
      ? "relation"
      : s === "character"
      ? "dob"
      : s === "anime"
      ? "character"
      : "anime";

  const inputSteps: Step[] = ["dob", "character", "anime", "musical instrument"];
  const questionLabel: Partial<Record<Step, string>> = {
    dob:                 "What is Atul's Date of Birth? (e.g. 1st Jan)",
    character:           "Who is Atul's favourite superhero character?",
    anime:               "Who is Atul's favourite anime character?",
    "musical instrument":"What is Atul's favourite musical instrument?",
  };

  return (
    /* ── Backdrop ── */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(12,12,17,0.75)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        variants={shakeVariants}
        animate={shakeTrigger ? "shake" : "idle"}
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-lg overflow-hidden"
        style={{
          borderRadius: "1.75rem",
          background: "var(--modal-bg)",
          border: "1px solid var(--modal-border)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* CSS vars for light / dark */}
        <style>{`
          .protection-modal-root,
          .protection-modal-root * { box-sizing: border-box; }

          :root {
            --modal-bg:             #f8efe8;
            --modal-border:         rgba(23,32,52,0.10);
            --modal-surface:        rgba(23,32,52,0.04);
            --modal-surface-hover:  rgba(23,32,52,0.08);
            --modal-text:           #172034;
            --modal-muted:          #7690ac;
            --modal-divider:        rgba(23,32,52,0.10);
            --modal-input-bg:       rgba(255,255,255,0.70);
            --modal-input-border:   rgba(23,32,52,0.14);
            --modal-input-focus:    #facdb2;
            --modal-kbd-bg:         rgba(255,255,255,0.80);
            --modal-kbd-border:     rgba(23,32,52,0.12);
            --modal-kbd-text:       #7690ac;
          }

          .dark {
            --modal-bg:             #0c0c11;
            --modal-border:         rgba(250,205,178,0.08);
            --modal-surface:        rgba(250,205,178,0.05);
            --modal-surface-hover:  rgba(250,205,178,0.09);
            --modal-text:           #f8efe8;
            --modal-muted:          #7690ac;
            --modal-divider:        rgba(250,205,178,0.08);
            --modal-input-bg:       rgba(255,255,255,0.04);
            --modal-input-border:   rgba(250,205,178,0.12);
            --modal-input-focus:    #facdb2;
            --modal-kbd-bg:         rgba(255,255,255,0.06);
            --modal-kbd-border:     rgba(255,255,255,0.10);
            --modal-kbd-text:       #7690ac;
          }

          @keyframes modal-shimmer {
            0%   { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(250%)  skewX(-15deg); }
          }

          .modal-cta-btn {
            position: relative;
            overflow: hidden;
          }
          .modal-cta-btn::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.45) 50%,
              transparent 100%
            );
            width: 40%;
            animation: modal-shimmer 2s ease-in-out infinite;
            pointer-events: none;
          }
          .modal-cta-btn:disabled::after {
            display: none;
          }
        `}</style>

        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Progress bar */}
        {getStepNumber(step) > 0 && (
          <div className="absolute top-0 left-0 right-0 z-10 h-[2px]"
            style={{ background: "var(--modal-divider)" }}
          >
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg,#b55a30,#facdb2)" }}
              initial={{ width: 0 }}
              animate={{ width: `${getProgress(step)}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Inner pad */}
        <div className="relative z-10 p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {/* ── STEP: relation ── */}
            {step === "relation" && (
              <motion.div
                key="relation"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div
                  className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl"
                  style={{ background: "var(--modal-surface)", border: "1px solid var(--modal-divider)" }}
                >
                  <LockKeyhole className="w-6 h-6" style={{ color: "#7690ac" }} />
                </div>

                {/* Label pill */}
                <span
                  className="mb-3 text-[9px] font-mono font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full"
                  style={{ color: "#7690ac", background: "var(--modal-surface)", border: "1px solid var(--modal-divider)" }}
                >
                  Verification Required
                </span>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight"
                  style={{ color: "var(--modal-text)" }}
                >
                  Who are you?
                </h2>
                <p
                  className="text-sm mb-8 max-w-xs leading-relaxed"
                  style={{ color: "var(--modal-muted)" }}
                >
                  To access these private resources, confirm your relationship with Atul.
                </p>

                {/* Relation buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {relations.map((rel) => {
                    const Icon = rel.icon;
                    const isVisitor = rel.name === "Visitor";
                    return (
                      <button
                        key={rel.name}
                        onClick={() => handleRelationSelect(rel.name)}
                        className={`group flex items-center gap-3 py-3.5 px-4 rounded-2xl text-left transition-all duration-200 hover:scale-[1.015] active:scale-[0.98] ${isVisitor ? "sm:col-span-2" : ""}`}
                        style={{
                          background: "var(--modal-surface)",
                          border: "1px solid var(--modal-divider)",
                          color: "var(--modal-text)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = isVisitor
                            ? "rgba(239,68,68,0.1)"
                            : "var(--modal-surface-hover)";
                          (e.currentTarget as HTMLElement).style.borderColor = isVisitor
                            ? "rgba(239,68,68,0.25)"
                            : "#facdb2";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "var(--modal-surface)";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--modal-divider)";
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-colors duration-200"
                          style={{
                            background: isVisitor ? "rgba(239,68,68,0.08)" : "rgba(250,205,178,0.12)",
                            color: isVisitor ? "#ef4444" : "#b55a30",
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold" style={{ color: "var(--modal-text)" }}>
                            {rel.name}
                          </div>
                          <div className="text-[10px] font-mono" style={{ color: "var(--modal-muted)" }}>
                            {rel.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors px-3 py-1.5 rounded-lg"
                    style={{ color: "var(--modal-muted)" }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ── STEP: input questions ── */}
            {inputSteps.includes(step as Step) && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between mb-7">
                  <button
                    onClick={() => { setStep(prevStep(step)); setInputValue(""); setError(false); }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors px-3 py-1.5 rounded-lg"
                    style={{ color: "var(--modal-muted)" }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  {/* Step dots */}
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4].map((n) => (
                      <div
                        key={n}
                        className="transition-all duration-300"
                        style={{
                          width: n === getStepNumber(step) ? "1.5rem" : "0.4rem",
                          height: "0.4rem",
                          borderRadius: "9999px",
                          background: n <= getStepNumber(step) ? "#facdb2" : "var(--modal-divider)",
                        }}
                      />
                    ))}
                  </div>

                  <span
                    className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: "#7690ac", background: "var(--modal-surface)", border: "1px solid var(--modal-divider)" }}
                  >
                    {getStepNumber(step)}&thinsp;/&thinsp;4
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ background: "rgba(250,205,178,0.12)", border: "1px solid rgba(250,205,178,0.2)", color: "#b55a30" }}
                  >
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-0.5"
                      style={{ color: "var(--modal-muted)" }}
                    >
                      Security Challenge
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-extrabold tracking-tight"
                      style={{ color: "var(--modal-text)" }}
                    >
                      Question {getStepNumber(step)}
                    </h3>
                  </div>
                </div>

                <p
                  className="text-base sm:text-lg font-semibold mb-6 leading-relaxed"
                  style={{ color: "var(--modal-text)" }}
                >
                  {questionLabel[step]}
                </p>

                {/* Input */}
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    autoFocus
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value); setError(false); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your answer…"
                    className="w-full py-3.5 pl-5 pr-16 text-base rounded-2xl outline-none transition-all duration-200"
                    style={{
                      background: "var(--modal-input-bg)",
                      border: `1.5px solid ${error ? "rgba(239,68,68,0.5)" : "var(--modal-input-border)"}`,
                      color: "var(--modal-text)",
                      boxShadow: error
                        ? "0 0 0 3px rgba(239,68,68,0.10)"
                        : inputValue
                        ? "0 0 0 3px rgba(250,205,178,0.15)"
                        : "none",
                    }}
                    onFocus={(e) => {
                      if (!error)
                        (e.target as HTMLInputElement).style.borderColor = "#facdb2";
                    }}
                    onBlur={(e) => {
                      if (!error)
                        (e.target as HTMLInputElement).style.borderColor = "var(--modal-input-border)";
                    }}
                  />
                  <div className="absolute right-4 pointer-events-none">
                    <kbd
                      className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono rounded"
                      style={{
                        background: "var(--modal-kbd-bg)",
                        border: "1px solid var(--modal-kbd-border)",
                        color: "var(--modal-kbd-text)",
                      }}
                    >
                      Enter ↵
                    </kbd>
                  </div>
                </div>

                {/* Error */}
                <div className="min-h-[1.4rem] mt-2 pl-1">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: "#ef4444" }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      Incorrect — try again!
                    </motion.div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={handleNext}
                  disabled={!inputValue.trim()}
                  className="modal-cta-btn mt-4 w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-35 disabled:cursor-not-allowed"
                  style={{
                    background: "#facdb2",
                    color: "#172034",
                    boxShadow: "0 4px 20px rgba(250,205,178,0.30)",
                  }}
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {/* ── STEP: rejected ── */}
            {step === "rejected" && (
              <motion.div
                key="rejected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.18)",
                    color: "#ef4444",
                    boxShadow: "0 8px 32px rgba(239,68,68,0.10)",
                  }}
                >
                  <ShieldAlert className="w-8 h-8" />
                </div>

                <span
                  className="mb-3 text-[9px] font-mono font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full"
                  style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  Access Denied
                </span>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight"
                  style={{ color: "var(--modal-text)" }}
                >
                  Not Authorised
                </h2>
                <p
                  className="text-sm max-w-xs mb-8 leading-relaxed"
                  style={{ color: "var(--modal-muted)" }}
                >
                  You don't have the permissions to view these private resources.
                </p>
                <button
                  onClick={() => setStep("relation")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200"
                  style={{
                    background: "var(--modal-surface)",
                    border: "1px solid var(--modal-divider)",
                    color: "var(--modal-text)",
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Start Over
                </button>
              </motion.div>
            )}

            {/* ── STEP: authorized ── */}
            {step === "authorized" && (
              <motion.div
                key="authorized"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center text-center py-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(250,205,178,0.15)",
                    border: "1px solid rgba(250,205,178,0.3)",
                    color: "#b55a30",
                    boxShadow: "0 8px 32px rgba(250,205,178,0.18)",
                  }}
                >
                  <ShieldCheck className="w-8 h-8" />
                </motion.div>

                <span
                  className="mb-3 text-[9px] font-mono font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full"
                  style={{ color: "#b55a30", background: "rgba(250,205,178,0.12)", border: "1px solid rgba(250,205,178,0.22)" }}
                >
                  Identity Verified
                </span>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight"
                  style={{ color: "var(--modal-text)" }}
                >
                  Welcome back!
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--modal-muted)" }}>
                  Access granted. Opening your private workspace…
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
