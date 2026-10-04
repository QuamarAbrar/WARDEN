import { useEffect, useRef, useState } from "react"

const portrait = "/assets/5a589.png"

const modes = [
  {
    number: "01",
    glyph: "┌───┐\n───┤ + ├───\n└───┘",
    title: "Detect",
    copy: "Identify unusual behavior in the context of identity, activity and environment.",
    output: "OUT / CONTEXTUAL SIGNAL",
  },
  {
    number: "02",
    glyph: "●───○───○\n│   │\n○───●",
    title: "Track",
    copy: "Follow the thread across sessions and systems. Bring related events into one account of what happened.",
    output: "OUT / EVENT NARRATIVE",
  },
  {
    number: "03",
    glyph: "░░▒▒▓▓██→\n  └────→\n    └─→",
    title: "Predict",
    copy: "Develop testable hypotheses about what could happen next. Investigate possibilities without treating them as facts.",
    output: "OUT / INVESTIGATION LEADS",
  },
  {
    number: "04",
    glyph: "[!] → [?]\n      ↓\n     [✓]",
    title: "Respond",
    copy: "Compare response options with the evidence in view. Keep every decision with the people responsible for it.",
    output: "OUT / RECOMMENDED NEXT STEP",
  },
]

const pipeline = [
  [
    "01 / CONNECT",
    "Your signals",
    "Identity, endpoint and cloud events selected by your team.",
  ],
  [
    "02 / INTERPRET",
    "WARDEN model",
    "Event relationships, behavioral context and reasoned hypotheses.",
  ],
  [
    "03 / REVIEW",
    "Analyst judgment",
    "Inspect the rationale, challenge the output and add context.",
  ],
  [
    "04 / DECIDE",
    "Your playbook",
    "Choose an action within your existing controls and approvals.",
  ],
]

const cases = [
  [
    "A",
    "Identity under pressure",
    "Investigate unexpected sign-ins, privilege changes and account behavior as a connected sequence.",
    "AUTH LOGS / ACCESS EVENTS",
  ],
  [
    "B",
    "Cloud without the blind spots",
    "Bring resource access, configuration changes and workload activity into the same investigation.",
    "AUDIT EVENTS / CLOUD CONTEXT",
  ],
  [
    "C",
    "Endpoint stories, not fragments",
    "Explore how process activity and session context relate before deciding what deserves escalation.",
    "PROCESS EVENTS / DEVICE CONTEXT",
  ],
]

const questions = [
  [
    "Is WARDEN a replacement for our security stack?",
    "No. WARDEN is conceived as an additional reasoning layer, not a substitute for your tools, analysts or controls.",
  ],
  [
    "Can the model take action on its own?",
    "The proposed workflow ends in analyst review. Your team chooses the response; autonomous action is not part of this concept.",
  ],
  [
    "What data would an evaluation need?",
    "Use synthetic events or a sample approved by your team. Agree on access, retention and scope before considering a pilot.",
  ],
  [
    "Where are the benchmarks and availability details?",
    "This is a conceptual preview. Benchmarks, deployment choices and release availability have not been established.",
  ],
]

const wardenAscii = [
  "#   #  ###  ####  ####  ##### #   #",
  "#   # #   # #   # #   # #     ##  #",
  "# # # ##### ####  #   # ####  # # #",
  "## ## #   # #  #  #   # #     #  ##",
  "#   # #   # #   # ####  ##### #   #",
]

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function SectionIntro({
  eyebrow,
  title,
  secondLine,
  copy,
}: {
  eyebrow: string
  title: string
  secondLine?: string
  copy: string
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <div className="section-intro-grid">
        <h2 data-reveal>
          {title}
          {secondLine && (
            <>
              <br />
              <span>{secondLine}</span>
            </>
          )}
        </h2>
        <p className="section-copy" data-reveal>
          {copy}
        </p>
      </div>
    </div>
  )
}

function ArrowLink({
  children,
  secondary = false,
}: {
  children: React.ReactNode
  secondary?: boolean
}) {
  return (
    <a
      className={secondary ? "button button-secondary" : "button"}
      href="#evaluation"
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}

function App() {
  useReveal()
  const heroRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [openQuestion, setOpenQuestion] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
        const hero = heroRef.current
        if (hero)
          hero.style.setProperty(
            "--hero-shift",
            `${Math.min(window.scrollY * 0.12, 110)}px`,
          )
      })
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
    }
  }, [])

  return (
    <main id="top">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />

      <section className="hero" ref={heroRef}>
        <div className="pixel-field" aria-hidden="true" />
        <div className="hero-frame">
          <nav className="nav">
            <a className="ascii-logo" href="#top" aria-label="WARDEN home">
              {wardenAscii.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </a>
            <p>AI DEFENSE INTELLIGENCE</p>
            <div className="nav-links">
              <a href="#model">THE MODEL</a>
              <a href="#capabilities">CAPABILITIES</a>
              <a href="#evaluation">EVALUATION</a>
              <a href="#faq">RESOURCES</a>
            </div>
            <ArrowLink>Request access</ArrowLink>
          </nav>

          <div className="hero-meta mono">
            <span>WARDEN / AI DEFENSE — RESEARCH PREVIEW</span>
            <span>RESEARCH PREVIEW · VOL. 01</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <h1>
                <span>Decode.</span>
                <span>Connect.</span>
                <span>Defend.</span>
              </h1>
              <p className="tagline">AI FOR ANALYSTS, NOT AUTOMATION.</p>
              <p className="lede">
                A research concept for connecting security events, explaining
                unusual activity and giving analysts a clearer next step. Your
                team stays in command.
              </p>
              <p className="comment">// BUILT FOR TEAMS THAT INVESTIGATE.</p>
              <div className="hero-actions">
                <ArrowLink>Explore the model</ArrowLink>
                <a className="text-link" href="#model">
                  Read the model brief ↓
                </a>
              </div>
            </div>

            <div className="portrait-wrap" data-reveal>
              <div className="portrait-index mono">[ WDN / 001 ]</div>
              <div className="portrait">
                <img
                  src={portrait}
                  alt="High-contrast portrait rendered in an ASCII-inspired treatment"
                />
                <div className="portrait-scan" aria-hidden="true" />
                <div className="portrait-noise" aria-hidden="true">
                  010101&nbsp; WDN &nbsp; CONTEXT &nbsp; 010011
                </div>
              </div>
              <p className="portrait-caption mono">
                MACHINE INSIGHT. HUMAN DECISION.
              </p>
            </div>

            <div className="hero-modes mono">
              {["Detect", "Track", "Predict", "Respond"].map((item) => (
                <span key={item}>
                  +<b>{item}</b>
                </span>
              ))}
            </div>

            <div className="technical-scan mono">
              <p>TECHNICAL SCAN</p>
              <code>
                {
                  "> input: event_context\n> correlate: behavior + intent\n> output: reasoned_signal\n> control: human_in_loop"
                }
              </code>
              <span>[ illustrative model trace ]</span>
            </div>
          </div>

          <div className="hero-bottom">
            <p>
              A different way to connect signals, explain risk, and keep your
              team in control.
            </p>
            <a href="#model">↓ SCROLL TO DECODE</a>
          </div>
        </div>
      </section>

      <section className="manifesto section" id="model">
        <div className="signal-mark mono" data-reveal aria-hidden="true">
          <span>░░░░▒▒▒▒▓▓▓▓████</span>
          <span>░░░▒▒▒▓▓▓████▓▓▓</span>
          <span>░░▒▒▓▓████▓▓▒▒░░</span>
          <span>░▒▓███▓▒▒░░░░░░░</span>
          <b>
            LESS NOISE.
            <br />
            MORE STORY.
          </b>
        </div>
        <div className="manifesto-copy">
          <p className="eyebrow" data-reveal>
            [01] / A NEW WAY TO READ THE SIGNAL
          </p>
          <h2 data-reveal>
            Signals don’t tell a story.
            <br />
            <span>
              WARDEN helps them explain
              <br />
              what they mean.
            </span>
          </h2>
          <p data-reveal>
            WARDEN is a conceptual AI defense model for teams that need to turn
            alerts into investigation leads. It connects events, explains
            unusual behavior, and gives analysts a clearer story to work from.
          </p>
        </div>
      </section>

      <section className="section modes-section" id="capabilities">
        <SectionIntro
          eyebrow="[02] / THE INVESTIGATION STACK"
          title="Four modes."
          secondLine="One investigation story."
          copy="From first signal to final decision, the model helps analysts connect the dots instead of chasing fragments."
        />
        <div className="mode-grid">
          {modes.map((mode, index) => (
            <article
              className="mode-card"
              data-reveal
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
              key={mode.title}
            >
              <span className="card-number">[ {mode.number} ]</span>
              <pre aria-hidden="true">{mode.glyph}</pre>
              <h3>{mode.title}</h3>
              <p>{mode.copy}</p>
              <span className="card-output">{mode.output}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section terminal-section">
        <SectionIntro
          eyebrow="[03] / INSIDE THE MODEL"
          title="An event."
          secondLine="A story. A next move."
          copy="An alert says something happened. WARDEN is designed to help explain why it matters — and what to examine next."
        />
        <div className="terminal-layout">
          <aside data-reveal>
            <p className="eyebrow">SCENARIO / IDENTITY MISUSE</p>
            <h3>
              A new session. An unusual resource. A sequence that deserves a
              closer look.
            </h3>
            <p className="note">
              ILLUSTRATIVE TRACE ONLY.
              <br />
              SYNTHETIC EVENTS, NOT A LIVE RESULT.
            </p>
          </aside>
          <div className="terminal" data-reveal>
            <div className="terminal-bar">
              <span>warden / inference.console</span>
              <b>● DEMO TRACE</b>
            </div>
            <div className="terminal-tabs">
              <span>01 / IDENTITY</span>
              <span>02 / CLOUD</span>
              <span>03 / ENDPOINT</span>
            </div>
            <div className="terminal-body mono">
              <p className="terminal-label">INPUT / EVENT SEQUENCE</p>
              <code>
                <span>
                  09:41:02&nbsp;&nbsp; auth.session&nbsp;&nbsp;&nbsp;&nbsp;
                  new_device=true
                </span>
                <span>
                  09:43:17&nbsp;&nbsp; role.change&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  scope=privileged
                </span>
                <span>
                  09:44:06&nbsp;&nbsp; storage.read&nbsp;&nbsp;&nbsp;&nbsp;
                  resource=restricted
                </span>
                <span>
                  09:44:12&nbsp;&nbsp;
                  context&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  baseline=unusual_sequence
                </span>
              </code>
              <div className="terminal-output">
                <p className="terminal-label">OUTPUT / CONTEXTUAL ASSESSMENT</p>
                <span className="review-tag">[ REVIEW REQUIRED ]</span>
                <h3>
                  A new session connects elevated access to restricted data.
                </h3>
                <p>
                  <b>WHY /</b> These events share a session and depart from the
                  supplied baseline. That warrants review, not a verdict.
                </p>
                <p>
                  <b>NEXT /</b> Confirm the access change with the owner and
                  examine nearby activity before acting.
                </p>
              </div>
              <p className="terminal-chain">
                MODEL SUGGESTS → ANALYST REVIEWS → TEAM DECIDES <i>▊</i>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reasoning">
        <SectionIntro
          eyebrow="[04] / THE REASONING PATH"
          title="Add perspective."
          secondLine="Keep your playbook."
          copy="A proposed reasoning layer that works alongside your telemetry, analysts and existing controls."
        />
        <div className="pipeline">
          {pipeline.map(([step, title, copy], index) => (
            <article
              data-reveal
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
              key={step}
            >
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              {index < pipeline.length - 1 && <b aria-hidden="true">→</b>}
            </article>
          ))}
        </div>
        <div className="feedback mono" data-reveal>
          ↳ ANALYST FEEDBACK / EVALUATION / POLICY CONTEXT{" "}
          <strong>HUMAN OVERSIGHT IS THE CONSTANT.</strong>
        </div>
      </section>

      <section className="section systems">
        <SectionIntro
          eyebrow="[05] / WHERE CONTEXT COUNTS"
          title="Across systems."
          secondLine="Beyond isolated alerts."
          copy="Explore investigation scenarios spanning identity, cloud activity and endpoint behavior."
        />
        <div className="systems-grid">
          <div className="boundary" data-reveal>
            <p className="eyebrow">ONE MODEL / MULTIPLE LENSES</p>
            <pre>
              {
                ".+-------+.\n .+´    |    `+.\n+´   .---+---.   `+\n/    /    |    \\    \\\n+----+-----+-----+----+\n|    |   [WDN]   |    |\n+----+-----+-----+----+\n\\    \\    |    /    /\n+.   `---+---´   .+\n`+.    |    .+´\n`+-------+´"
              }
            </pre>
            <p>The boundary is yours to define.</p>
            <span>
              CHOOSE THE EVIDENCE.
              <br />
              OWN THE DECISION.
            </span>
          </div>
          <div className="case-list">
            {cases.map(([id, title, copy, source]) => (
              <article data-reveal key={id}>
                <span>[{id}]</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <b>{source}</b>
                </div>
                <i>↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust">
        <div className="trust-copy">
          <p className="eyebrow" data-reveal>
            [06] / TRUST IS AN EVALUATION, NOT A TAGLINE
          </p>
          <h2 data-reveal>
            Show the reasoning.
            <br />
            <span>Challenge the result.</span>
          </h2>
          <p data-reveal>
            WARDEN is a research concept, not a proven production system. Test
            the usefulness of its output against your own evidence, policies and
            analyst judgment.
          </p>
          <div className="warning mono" data-reveal>
            AI CAN BE WRONG.
            <br />
            HUMAN REVIEW IS NOT OPTIONAL.
          </div>
        </div>
        <div className="evaluation-table" data-reveal>
          <div>
            <b>EVALUATION DIMENSION</b>
            <b>ASK BEFORE ADOPTION</b>
          </div>
          <div>
            <strong>Signal quality</strong>
            <span>
              Does the output help separate useful leads from benign activity?
            </span>
          </div>
          <div>
            <strong>Grounded reasoning</strong>
            <span>
              Can the analyst trace the assessment back to supplied events?
            </span>
          </div>
          <div>
            <strong>Operational fit</strong>
            <span>
              Is the model useful within your policies and review process?
            </span>
          </div>
        </div>
      </section>

      <section className="section pathway" id="evaluation">
        <SectionIntro
          eyebrow="[07] / START WITH A CONTROLLED EVALUATION"
          title="Start small."
          secondLine="Learn before you connect."
          copy="Define one investigation question. Evaluate approved sample events before considering access to live systems."
        />
        <div className="pathway-grid">
          <div className="steps">
            {[
              [
                "01",
                "Define the problem",
                "Choose a use case, agree on success criteria and map the data boundary.",
              ],
              [
                "02",
                "Evaluate in a sandbox",
                "Start with synthetic or approved sample events. Review the output with your analysts.",
              ],
              [
                "03",
                "Design the integration",
                "Discuss access controls, event formats and human approval points before any pilot.",
              ],
            ].map(([id, title, copy]) => (
              <article data-reveal key={id}>
                <b>{id}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="brief mono" data-reveal>
            <p>$ cat evaluation-brief.txt</p>
            <code>
              {
                "model        WARDEN\naccess       By request\nstage        Concept / research preview\ninput        Approved sample events\nreview       Human-led\nintegration  Scoped during discovery"
              }
            </code>
            <ArrowLink>Discuss an evaluation</ArrowLink>
          </div>
        </div>
        <p className="no-access mono" data-reveal>
          NO PRODUCTION ACCESS REQUIRED TO START.
        </p>
      </section>

      <section className="section faq" id="faq">
        <div>
          <p className="eyebrow" data-reveal>
            [08] / BEFORE YOU CONNECT
          </p>
          <h2 data-reveal>
            Know the scope.
            <br />
            <span>Set the boundaries.</span>
          </h2>
          <p data-reveal>
            Practical answers for teams exploring the WARDEN concept.
          </p>
        </div>
        <div className="question-list" data-reveal>
          {questions.map(([question, answer], index) => (
            <article
              className={openQuestion === index ? "open" : ""}
              key={question}
            >
              <button
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? -1 : index)
                }
                aria-expanded={openQuestion === index}
              >
                <span>{question}</span>
                <b>{openQuestion === index ? "−" : "+"}</b>
              </button>
              <div className="answer">
                <p>{answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <p className="eyebrow" data-reveal>
            [09] / OPEN A NEW LINE OF DEFENSE
          </p>
          <h2 data-reveal>
            Find the thread.
            <br />
            <span>Own the next move.</span>
          </h2>
          <p data-reveal>
            Bring a question worth investigating. Explore the WARDEN concept
            through a focused, human-led evaluation.
          </p>
          <div data-reveal>
            <ArrowLink>Request model access</ArrowLink>
            <ArrowLink secondary>Read the model brief</ArrowLink>
          </div>
        </div>
        <div
          className="ascii-orb mono"
          data-reveal
          aria-label="Animated ASCII context symbol"
        >
          {[
            "░░░░░░░",
            "░▒▒▒▒▒▒▒▒▒▒░",
            "░▒▓▓▓▓▓▓▓▓▓▒░",
            "░▒▓██     ██▓▒░",
            "░▒▓██  +  ██▓▒░",
            "░▒▓██     ██▓▒░",
            "░▒▓▓▓▓▓▓▓▓▓▒░",
            "░▒▒▒▒▒▒▒▒▒░",
            "░░░░░░░",
          ].map((line, index) => (
            <span
              style={{ "--line": index } as React.CSSProperties}
              key={`${line}-${index}`}
            >
              {line}
            </span>
          ))}
          <b>CONTEXT IS THE LEVERAGE.</b>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div>
            <h3>A clearer story. A human decision.</h3>
            <p>WARDEN / AI DEFENSE</p>
          </div>
          <div>
            <b>EXPLORE</b>
            <a href="#model">The model</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#evaluation">Evaluation</a>
          </div>
          <div>
            <b>RESOURCES</b>
            <a href="#faq">Model brief</a>
            <a href="#faq">Responsible AI</a>
            <a href="#evaluation">Contact</a>
          </div>
        </div>
        <div className="footer-ascii">
          <pre>{wardenAscii.join("\n")}</pre>
          <span>[ END_ ]</span>
        </div>
        <div className="colophon mono">
          <span>© 2026 WARDEN. CONCEPT EDITION.</span>
          <span>RESEARCH PREVIEW / NOT A PRODUCTION OFFERING</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  )
}

export default App
