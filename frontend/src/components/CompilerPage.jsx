import { useState } from 'react'
import Navbar from './Navbar'

function CompilerPage() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)
  const [activeTab, setActiveTab] = useState("code")
  const [tokenSearch, setTokenSearch] = useState("")
  const [copiedCode, setCopiedCode] = useState(false)
  const [copied3ac, setCopied3ac] = useState(false)
  const [copiedEnglish3ac, setCopiedEnglish3ac] = useState(false)

  const examples = [
    { label: "Prime Check (Python)", prompt: "Write a python program to check if a number is prime" },
    { label: "Binary Search (C)", prompt: "Give me binary search code in c" },
    { label: "Factorial (C)", prompt: "Calculate factorial in c" },
    { label: "Bubble Sort (Python)", prompt: "Write bubble sort code in python" }
  ]

  const handleCompile = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)
    setCopiedCode(false)
    setCopied3ac(false)

    try {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: prompt })
      })

      const data = await res.json()

      if (data.success) {
        setResponse(data)
        setActiveTab("code")
      } else {
        setError(data.error || "Compilation failed.")
        setResponse(null)
      }
    } catch (err) {
      setError("Unable to connect to Flask backend. Please make sure the backend is running.")
      setResponse(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyCode = () => {
    if (!response || !response.code) return
    navigator.clipboard.writeText(response.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopy3ac = () => {
    if (!response || !response.three_address_code) return
    navigator.clipboard.writeText(response.three_address_code)
    setCopied3ac(true)
    setTimeout(() => setCopied3ac(false), 2000)
  }

  const handleCopyEnglish3ac = () => {
    if (!response || !response.english_3ac) return
    navigator.clipboard.writeText(response.english_3ac)
    setCopiedEnglish3ac(true)
    setTimeout(() => setCopiedEnglish3ac(false), 2000)
  }

  const getTokenTypeBadge = (type) => {
    const base = "px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider "
    switch (type.toUpperCase()) {
      case 'KEYWORD':
        return base + "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      case 'IDENTIFIER':
        return base + "bg-purple-500/10 text-purple-400 border border-purple-500/20"
      case 'OPERATOR':
        return base + "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      case 'NUMBER':
        return base + "bg-blue-500/10 text-blue-400 border border-blue-500/20"
      case 'STRING':
        return base + "bg-rose-500/10 text-rose-400 border border-rose-500/20"
      case 'COMMENT':
        return base + "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
      case 'PREPROCESSOR':
        return base + "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
      case 'LANGUAGE':
        return base + "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
      case 'ALGORITHM':
        return base + "bg-pink-500/15 text-pink-300 border border-pink-500/30"
      case 'PUNCTUATION':
        return base + "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
      case 'WORD':
        return base + "bg-slate-500/10 text-slate-300 border border-slate-700/50"
      default:
        return base + "bg-slate-500/10 text-slate-400 border border-slate-500/20"
    }
  }

  const filteredEnglishTokens = response && response.english_tokens
    ? response.english_tokens.filter(t => 
        t.type.toLowerCase().includes(tokenSearch.toLowerCase()) || 
        t.value.toLowerCase().includes(tokenSearch.toLowerCase())
      )
    : []

  const filteredCodeTokens = response && response.lexical_tokens
    ? response.lexical_tokens.filter(t => 
        t.type.toLowerCase().includes(tokenSearch.toLowerCase()) || 
        t.value.toLowerCase().includes(tokenSearch.toLowerCase())
      )
    : []

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 py-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <section className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

            <div>
              <h2 className="text-xl font-extrabold mb-1">Compiler Input</h2>
              <p className="text-slate-400 text-xs">Enter your natural language instructions to compile.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="prompt-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Instruction prompt
              </label>
              <textarea
                id="prompt-input"
                className="w-full h-36 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 resize-none font-sans"
                placeholder="e.g. write a C program to check if a number is prime"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <div className="space-y-2.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Examples
              </span>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(example.prompt)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition duration-200"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCompile}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/10 active:scale-95 disabled:active:scale-100 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Running Compilation...
                </>
              ) : (
                <>
                  Compile Program
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {response && (
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-900 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Compilation Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Language Target</span>
                  <span className="font-extrabold text-sm text-emerald-400">{response.language}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Resolved Program</span>
                  <span className="font-extrabold text-sm text-indigo-400">{response.program}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="lg:col-span-7 h-full">
          {error && (
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 space-y-3">
              <div className="flex items-center gap-2 font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Compilation Error
              </div>
              <p className="text-sm leading-relaxed font-mono bg-rose-950/20 p-4 rounded-xl border border-rose-900/30">
                {error}
              </p>
            </div>
          )}

          {!response && !error && (
            <div className="p-10 md:p-20 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden min-h-[480px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Awaiting Compilation</h3>
                <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                  Submit a natural language prompt on the left to invoke the compiler analysis stages.
                </p>
              </div>
            </div>
          )}

          {response && !error && (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-[480px]">
              <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-950 border-b border-slate-800 px-4 pt-4 gap-1">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-t border-x transition-all duration-200 shrink-0 ${
                    activeTab === "code"
                      ? "bg-slate-900 border-slate-800 text-indigo-400"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30"
                  }`}
                >
                  Source Code
                </button>
                <button
                  onClick={() => setActiveTab("lexer")}
                  className={`px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-t border-x transition-all duration-200 shrink-0 ${
                    activeTab === "lexer"
                      ? "bg-slate-900 border-slate-800 text-indigo-400"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30"
                  }`}
                >
                  Lexical analysis ({(response.english_tokens ? response.english_tokens.length : 0) + (response.lexical_tokens ? response.lexical_tokens.length : 0)})
                </button>
                <button
                  onClick={() => setActiveTab("3ac")}
                  className={`px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-t border-x transition-all duration-200 shrink-0 ${
                    activeTab === "3ac"
                      ? "bg-slate-900 border-slate-800 text-indigo-400"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30"
                  }`}
                >
                  Intermediate (3AC)
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col bg-slate-900">
                {activeTab === "code" && (
                  <div className="space-y-4 flex-grow flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Generated {response.language} Code
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        {copiedCode ? (
                          <>
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy Source Code
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="flex-grow p-5 bg-slate-950 rounded-2xl border border-slate-950 font-mono text-sm leading-relaxed overflow-auto text-indigo-200 select-all max-h-[400px]">
                      <code>{response.code}</code>
                    </pre>
                  </div>
                )}

                {activeTab === "lexer" && (
                  <div className="space-y-8 flex-grow flex flex-col bg-slate-900">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                          Multi-Phase Lexical Analysis
                        </span>
                        <p className="text-xs text-slate-400">Track and compare tokens generated across multiple phases of the compiler pipeline.</p>
                      </div>
                      <input
                        type="text"
                        className="px-3 py-1.5 w-full sm:w-48 rounded-lg bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs font-medium placeholder-slate-600 text-slate-200"
                        placeholder="Search type or value..."
                        value={tokenSearch}
                        onChange={(e) => setTokenSearch(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col space-y-8">
                      <div className="flex flex-col space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                              Phase 1: Input English Prompt Lexer
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {filteredEnglishTokens.length} Tokens
                          </span>
                        </div>
                        <div className="overflow-auto border border-slate-950 bg-slate-950 rounded-xl max-h-[350px]">
                          <table className="w-full text-left border-collapse font-sans text-xs">
                            <thead className="sticky top-0 bg-slate-950 border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                              <tr>
                                <th className="px-5 py-3.5">Line</th>
                                <th className="px-5 py-3.5">Token Class</th>
                                <th className="px-5 py-3.5">Lexeme Value</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900 font-mono text-slate-300">
                              {filteredEnglishTokens.length > 0 ? (
                                filteredEnglishTokens.map((tok, idx) => (
                                  <tr key={idx} className="hover:bg-slate-900/35 transition-colors">
                                    <td className="px-5 py-3 text-slate-500">{tok.line}</td>
                                    <td className="px-5 py-3">
                                      <span className={getTokenTypeBadge(tok.type)}>
                                        {tok.type}
                                      </span>
                                    </td>
                                    <td className="px-5 py-3 font-semibold text-indigo-100">{tok.value}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3} className="px-5 py-8 text-center text-slate-600 font-medium">
                                    No tokens found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <span className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                              Phase 6: Generated Code Lexer ({response.language})
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {filteredCodeTokens.length} Tokens
                          </span>
                        </div>
                        <div className="overflow-auto border border-slate-950 bg-slate-950 rounded-xl max-h-[350px]">
                          <table className="w-full text-left border-collapse font-sans text-xs">
                            <thead className="sticky top-0 bg-slate-950 border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                              <tr>
                                <th className="px-5 py-3.5">Line</th>
                                <th className="px-5 py-3.5">Token Class</th>
                                <th className="px-5 py-3.5">Lexeme Value</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-900 font-mono text-slate-300">
                              {filteredCodeTokens.length > 0 ? (
                                filteredCodeTokens.map((tok, idx) => (
                                  <tr key={idx} className="hover:bg-slate-900/35 transition-colors">
                                    <td className="px-5 py-3 text-slate-500">{tok.line}</td>
                                    <td className="px-5 py-3">
                                      <span className={getTokenTypeBadge(tok.type)}>
                                        {tok.type}
                                      </span>
                                    </td>
                                    <td className="px-5 py-3 font-semibold text-emerald-100">{tok.value}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3} className="px-5 py-8 text-center text-slate-600 font-medium">
                                    No tokens found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "3ac" && (
                  <div className="space-y-8 flex-grow flex flex-col bg-slate-900">
                    <div className="flex flex-col gap-1 pb-4 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Intermediate Representation & Code Generation Stages
                      </span>
                      <p className="text-xs text-slate-400">Review register allocations mapping the Natural Language compile phase and Compiled program logic.</p>
                    </div>

                    <div className="flex flex-col space-y-8">
                      <div className="flex flex-col space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                              Phase 4: Prompt Translation Pipeline (3AC)
                            </span>
                          </div>
                          <button
                            onClick={handleCopyEnglish3ac}
                            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 active:scale-95 transition-all"
                          >
                            {copiedEnglish3ac ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2" />
                                </svg>
                                Copy Pipeline 3AC
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-5 bg-slate-950 rounded-xl border border-slate-950 font-mono text-sm leading-relaxed overflow-auto text-indigo-300 select-all max-h-[350px]">
                          <code>{response.english_3ac}</code>
                        </pre>
                      </div>

                      <div className="flex flex-col space-y-4 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <span className="text-sm font-extrabold text-slate-200 uppercase tracking-wider">
                              Phase 5: Compiled Algorithm Logic (3AC)
                            </span>
                          </div>
                          <button
                            onClick={handleCopy3ac}
                            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 active:scale-95 transition-all"
                          >
                            {copied3ac ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2" />
                                </svg>
                                Copy Algorithm 3AC
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-5 bg-slate-950 rounded-xl border border-slate-950 font-mono text-sm leading-relaxed overflow-auto text-emerald-300 select-all max-h-[350px]">
                          <code>{response.three_address_code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

      </main>

      <footer className="py-6 border-t border-slate-900 bg-slate-950 text-center text-[11px] text-slate-600">
        Compiler design PBL workspace • Natural Language to Code Compiler
      </footer>
    </div>
  )
}

export default CompilerPage