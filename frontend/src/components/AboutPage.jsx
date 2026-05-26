import Navbar from './Navbar'

function AboutPage() {
  const compilerPhases = [
    {
      name: "1. Lexical Analysis (Lexer)",
      purpose: "Transforms raw string streams into symbolic token streams.",
      description: "Our compiler contains a dual-stage lexical analyzer. Stage 1 takes AI response configurations and extracts high-level intent. Stage 3 parses the final generated C or Python program with regex matching rules to classify characters into Keywords, Identifiers, Operators, String Literals, and Number constants along with line numbers.",
      theory: "In standard compilers, this is implemented using Finite Automata (DFA/NFA) and tools like Lex/Flex."
    },
    {
      name: "2. Syntax Analysis (Parser)",
      purpose: "Validates grammatical structure and builds hierarchical AST trees.",
      description: "The parser accepts the tokens and constructs a simplified abstract syntax model (represented as ProgramNode). The AST captures the logical structure of the program (e.g. language, targets, parameters) without visual formatting.",
      theory: "Parsers utilize Context-Free Grammars (CFGs) and parsing strategies (LL, LR, LALR) to enforce program syntax."
    },
    {
      name: "3. Semantic Analysis (Semantic)",
      purpose: "Enforces typing rules, identifier declarations, and context rules.",
      description: "Our semantic analyzer checks that the compiled request corresponds to one of the 53 validated standard compiler algorithms. If the program name is slightly misspelled, it uses a SequenceMatcher algorithm (Spell Helper) to make real-time corrections. It also verifies that language-specific program templates are present.",
      theory: "Semantic checks are crucial to confirm that a syntactically correct program actually makes logical sense."
    },
    {
      name: "4. Intermediate Code Gen (IR & 3AC)",
      purpose: "Builds a machine-independent representation of the source logic.",
      description: "In this phase, we generate highly realistic register-based Three-Address Code (3AC). This serves as the Intermediate Representation (IR). 3AC simplifies execution loops and checks into explicit jump operations, labels, and temporary variables (t1, t2), making it perfect for machine-level translation.",
      theory: "3AC is represented in compilers as Quadruples, Triples, or Indirect Triples before code optimization."
    },
    {
      name: "5. Code Generation (CodeGen)",
      purpose: "Outputs the final target high-level source or assembly code.",
      description: "The code generator receives the validated IR and maps it to target templates (Python/C) to produce executable scripts. The generated code can be run, copied, and visually tokenized in the workspace.",
      theory: "Translates intermediate representations into the final target instructions, mapping variables to registers or variables."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 py-16 max-w-7xl mx-auto w-full text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Compiler Design{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Theory & Implementation
            </span>
          </h1>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            This workspace serves as a Project-Based Learning (PBL) compiler platform designed to visually illustrate the major phases of compiler execution.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="space-y-8">
          {compilerPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-100">
                  {phase.name}
                </h2>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold self-start md:self-auto">
                  {phase.purpose}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {phase.description}
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 text-xs font-mono text-slate-500 flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Standard Compiler Theory Connection:</span>
                  {phase.theory}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 bg-slate-900/20 border-t border-slate-900 w-full text-center mt-auto">
        <div className="max-w-3xl mx-auto text-slate-500 text-xs leading-relaxed">
          <p className="mb-2">
            <strong>Project Objective:</strong> Developed as part of a Course Project in Compiler Design (Project-Based Learning) to build a hands-on compiler that translates high-level natural language algorithm instructions into structural code using lexers, parsers, spell analyzers, 3AC generation, and template loader components.
          </p>
          <p>© 2026 LingoComp PBL Workspace. All Rights Reserved.</p>
        </div>
      </section>
    </div>
  )
}

export default AboutPage