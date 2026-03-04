import { useState, useEffect, useRef } from "react";

const QUOTES = [
  { text: "In the shelter of each other, people live.", source: "Guru Granth Sahib", tradition: "sikh" },
  { text: "Those who remember the Lord, in the Company of the Holy — their faces are radiant and bright.", source: "Guru Granth Sahib", tradition: "sikh" },
  { text: "One who has love for the Lord in the heart — that person is a pure devotee.", source: "Guru Granth Sahib", tradition: "sikh" },
  { text: "Let your soul be immersed in the Lord's Name, so that you may be accepted in His Court.", source: "Guru Granth Sahib", tradition: "sikh" },
  { text: "You are never alone. The One who created you is always with you.", source: "Guru Granth Sahib", tradition: "sikh" },
  { text: "The soul that is steadfast in devotion, finds the highest peace.", source: "Bhagavad Gita 2:66", tradition: "hindu" },
  { text: "Let right deeds be thy motive, not the fruit which comes from them.", source: "Bhagavad Gita 2:47", tradition: "hindu" },
  { text: "The soul is never born nor dies at any time. It is unborn, eternal, ever-existing and primeval.", source: "Bhagavad Gita 2:20", tradition: "hindu" },
  { text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", source: "Bhagavad Gita 6:19", tradition: "hindu" },
  { text: "The happiness which comes from long practice, which leads to the end of suffering — such happiness is beyond the senses.", source: "Bhagavad Gita 6:21", tradition: "hindu" },
  { text: "Fix your mind on Me, be devoted to Me, worship Me, bow down to Me. So shall you come to Me.", source: "Bhagavad Gita 18:65", tradition: "hindu" },
];

const DATE_IDEAS = [
  "Cook a meal from a culture you've never tried together 🍜",
  "Write each other letters about your dreams for the next 5 years 💌",
  "Sunrise walk with no phones — just presence 🌅",
  "Visit a temple or place of worship together 🕌",
  "Create a vision board for your shared future 🎨",
  "Teach each other one skill you have that the other doesn't 📚",
  "Stargazing with a playlist you made each other 🌟",
  "Go to a farmer's market and cook whatever inspires you 🌿",
  "Write down 10 things you love about each other, swap & read aloud 💛",
  "Take a class together — pottery, dance, cooking, anything 🎭",
];

const LOVE_CHALLENGES = [
  "Leave a handwritten note somewhere surprising for your partner today.",
  "Spend 20 minutes asking each other deep questions — no phones.",
  "Plan something for next week that your partner has been wanting to do.",
  "Tell your partner 3 specific things they did this week that you noticed.",
  "Do one of your partner's chores without being asked.",
  "Send an appreciation voice note during the day.",
  "Recreate your first date or a favourite memory.",
  "Meditate or pray together for 10 minutes tonight.",
];

const HABITS = [
  { id: 1, name: "Morning meditation", shared: true, icon: "🧘" },
  { id: 2, name: "Gratitude entry", shared: true, icon: "📖" },
  { id: 3, name: "Exercise", shared: false, icon: "💪" },
  { id: 4, name: "Read 20 mins", shared: false, icon: "📚" },
  { id: 5, name: "Evening walk", shared: true, icon: "🌙" },
];

const MOODS = ["🌟", "😊", "😐", "😔", "🌧️"];
const MOOD_LABELS = ["Radiant", "Good", "Okay", "Low", "Stormy"];

function getDateKey() {
  return new Date().toISOString().split("T")[0];
}

function GradientOrb({ style }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%", filter: "blur(80px)",
      pointerEvents: "none", ...style
    }} />
  );
}

function QuoteCard({ quote }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: "24px",
      padding: "32px", textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: quote.tradition === "sikh"
          ? "linear-gradient(90deg, #c4a882, #e8c99a)"
          : "linear-gradient(90deg, #a78bfa, #7dd3c8)"
      }} />
      <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.6 }}>✦</div>
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(16px, 2.5vw, 20px)",
        color: "rgba(255,255,255,0.92)", lineHeight: 1.7, fontStyle: "italic",
        margin: "0 0 20px"
      }}>"{quote.text}"</p>
      <p style={{
        fontFamily: "'Nunito', sans-serif", fontSize: "13px",
        color: quote.tradition === "sikh" ? "#e8c99a" : "#a78bfa",
        letterSpacing: "0.08em", textTransform: "uppercase", margin: 0
      }}>{quote.source}</p>
    </div>
  );
}

function NavBar({ active, setActive }) {
  const tabs = [
    { id: "home", icon: "✦", label: "Home" },
    { id: "goals", icon: "⬡", label: "Goals" },
    { id: "habits", icon: "◎", label: "Habits" },
    { id: "calendar", icon: "⊡", label: "Calendar" },
    { id: "mood", icon: "☽", label: "Mood" },
    { id: "journal", icon: "♡", label: "Journal" },
    { id: "memories", icon: "◈", label: "Memories" },
    { id: "love", icon: "✿", label: "Love" },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(15, 10, 30, 0.85)", backdropFilter: "blur(24px)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "flex", justifyContent: "space-around", padding: "10px 0 16px"
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActive(t.id)} style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "4px", background: "none", border: "none", cursor: "pointer",
          padding: "4px 8px", transition: "all 0.2s"
        }}>
          <span style={{
            fontSize: "18px", opacity: active === t.id ? 1 : 0.35,
            color: active === t.id ? "#b8a4e8" : "#fff",
            transition: "all 0.2s",
            filter: active === t.id ? "drop-shadow(0 0 6px #b8a4e8)" : "none"
          }}>{t.icon}</span>
          <span style={{
            fontFamily: "'Nunito', sans-serif", fontSize: "9px", letterSpacing: "0.05em",
            color: active === t.id ? "#b8a4e8" : "rgba(255,255,255,0.3)",
            textTransform: "uppercase", fontWeight: active === t.id ? 700 : 400
          }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ---- PAGES ----

function HomePage({ data, setData }) {
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const quote = QUOTES[quoteIdx];

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", letterSpacing: "0.2em", color: "#7dd3c8", textTransform: "uppercase", margin: "0 0 8px" }}>our sacred space</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 8vw, 48px)", color: "#fff", margin: 0, fontWeight: 300, letterSpacing: "0.02em" }}>
          {data.name1} & {data.name2}
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "8px 0 0" }}>
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      {/* Quote */}
      <QuoteCard quote={quote} />
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button onClick={() => setQuoteIdx((quoteIdx + 1) % QUOTES.length)} style={{
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "20px", padding: "8px 20px", color: "rgba(255,255,255,0.5)",
          fontFamily: "'Nunito', sans-serif", fontSize: "12px", cursor: "pointer", letterSpacing: "0.05em"
        }}>next reflection →</button>
      </div>

      {/* Daily challenge */}
      <div style={{ marginTop: "28px", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "20px", padding: "24px" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "#b8a4e8", textTransform: "uppercase", margin: "0 0 10px" }}>✿ today's love challenge</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "rgba(255,255,255,0.88)", margin: 0, lineHeight: 1.5 }}>
          {LOVE_CHALLENGES[new Date().getDay() % LOVE_CHALLENGES.length]}
        </p>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
        {[
          { label: "Streak", value: `${data.streak || 0} days`, icon: "🔥" },
          { label: "Goals done", value: `${(data.goals || []).filter(g => g.done).length} / ${(data.goals || []).length}`, icon: "⬡" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", color: "#fff", fontWeight: 600 }}>{s.value}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalsPage({ data, setData }) {
  const [input, setInput] = useState("");
  const [who, setWho] = useState("shared");
  const goals = data.goals || [];

  const addGoal = () => {
    if (!input.trim()) return;
    const newGoal = { id: Date.now(), text: input, who, done: false, date: getDateKey() };
    setData(d => ({ ...d, goals: [...(d.goals || []), newGoal] }));
    setInput("");
  };

  const toggleGoal = (id) => {
    setData(d => ({ ...d, goals: d.goals.map(g => g.id === id ? { ...g, done: !g.done } : g) }));
  };

  const cats = ["shared", data.name1 || "Partner 1", data.name2 || "Partner 2"];

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 4px", fontWeight: 300 }}>Our Goals</h2>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 28px" }}>growing together, one step at a time</p>

      {/* Add goal */}
      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "20px", marginBottom: "24px" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addGoal()}
          placeholder="Add a new goal..." style={{
            width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", padding: "12px 16px", color: "#fff", fontFamily: "'Nunito', sans-serif",
            fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px"
          }} />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setWho(c)} style={{
              padding: "6px 14px", borderRadius: "20px", fontFamily: "'Nunito', sans-serif",
              fontSize: "12px", cursor: "pointer", border: "1px solid",
              background: who === c ? "rgba(167,139,250,0.25)" : "transparent",
              borderColor: who === c ? "#b8a4e8" : "rgba(255,255,255,0.15)",
              color: who === c ? "#b8a4e8" : "rgba(255,255,255,0.5)"
            }}>{c}</button>
          ))}
        </div>
        <button onClick={addGoal} style={{
          width: "100%", background: "linear-gradient(135deg, rgba(167,139,250,0.4), rgba(125,211,200,0.4))",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "12px",
          color: "#fff", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700,
          cursor: "pointer", letterSpacing: "0.05em"
        }}>Add Goal ⬡</button>
      </div>

      {/* Goals list */}
      {cats.map(cat => {
        const catGoals = goals.filter(g => g.who === cat);
        if (!catGoals.length) return null;
        return (
          <div key={cat} style={{ marginBottom: "24px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "#7dd3c8", textTransform: "uppercase", margin: "0 0 12px" }}>{cat}</p>
            {catGoals.map(g => (
              <div key={g.id} onClick={() => toggleGoal(g.id)} style={{
                display: "flex", alignItems: "center", gap: "14px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px", padding: "14px 16px", marginBottom: "8px", cursor: "pointer",
                opacity: g.done ? 0.5 : 1, transition: "all 0.2s"
              }}>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${g.done ? "#7dd3c8" : "rgba(255,255,255,0.2)"}`,
                  background: g.done ? "rgba(125,211,200,0.3)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {g.done && <span style={{ fontSize: "12px", color: "#7dd3c8" }}>✓</span>}
                </div>
                <span style={{
                  fontFamily: "'Nunito', sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,0.85)", textDecoration: g.done ? "line-through" : "none"
                }}>{g.text}</span>
              </div>
            ))}
          </div>
        );
      })}
      {goals.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.2)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px" }}>
          No goals yet — add your first one ✦
        </div>
      )}
    </div>
  );
}

function HabitsPage({ data, setData }) {
  const today = getDateKey();
  const completions = data.habitCompletions || {};

  const toggle = (id, who) => {
    const key = `${today}_${id}_${who}`;
    setData(d => {
      const c = { ...(d.habitCompletions || {}) };
      c[key] = !c[key];
      return { ...d, habitCompletions: c };
    });
  };

  const isChecked = (id, who) => !!(completions[`${today}_${id}_${who}`]);

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 4px", fontWeight: 300 }}>Daily Habits</h2>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 28px" }}>consistency is an act of love</p>

      {HABITS.map(h => (
        <div key={h.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "18px 20px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: h.shared ? "14px" : 0 }}>
            <span style={{ fontSize: "22px" }}>{h.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)", margin: 0, fontWeight: 600 }}>{h.name}</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: "2px 0 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h.shared ? "shared" : "individual"}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {[data.name1 || "Partner 1", ...(h.shared ? [data.name2 || "Partner 2"] : [])].map(who => (
              <button key={who} onClick={() => toggle(h.id, who)} style={{
                flex: 1, padding: "8px", borderRadius: "10px", border: "1px solid",
                cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontSize: "12px",
                fontWeight: 600, transition: "all 0.2s",
                background: isChecked(h.id, who) ? "rgba(125,211,200,0.25)" : "rgba(255,255,255,0.05)",
                borderColor: isChecked(h.id, who) ? "#7dd3c8" : "rgba(255,255,255,0.1)",
                color: isChecked(h.id, who) ? "#7dd3c8" : "rgba(255,255,255,0.4)"
              }}>
                {isChecked(h.id, who) ? "✓ " : ""}{who}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarPage({ data, setData }) {
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const events = data.events || {};

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const addEvent = () => {
    if (!input.trim() || !selected) return;
    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(selected).padStart(2,"0")}`;
    setData(d => ({ ...d, events: { ...(d.events || {}), [key]: [...(d.events?.[key] || []), input] } }));
    setInput("");
  };

  const getDayKey = (d) => `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 28px", fontWeight: 300 }}>Shared Calendar</h2>

      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "20px", cursor: "pointer" }}>‹</button>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", color: "#fff" }}>{monthNames[month]} {year}</span>
          <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "20px", cursor: "pointer" }}>›</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", padding: "4px 0", letterSpacing: "0.05em" }}>{d}</div>
          ))}
          {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const key = getDayKey(day);
            const hasEvent = events[key]?.length > 0;
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            const isSel = selected === day;
            return (
              <div key={day} onClick={() => setSelected(day)} style={{
                aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "50%", cursor: "pointer", position: "relative",
                background: isSel ? "rgba(167,139,250,0.4)" : isToday ? "rgba(125,211,200,0.2)" : "transparent",
                border: isToday ? "1px solid #7dd3c8" : "1px solid transparent",
                fontFamily: "'Nunito', sans-serif", fontSize: "13px",
                color: isSel ? "#fff" : isToday ? "#7dd3c8" : "rgba(255,255,255,0.7)"
              }}>
                {day}
                {hasEvent && <span style={{ position: "absolute", bottom: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#b8a4e8" }} />}
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div style={{ marginTop: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "20px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", color: "#b8a4e8", margin: "0 0 14px" }}>
            {monthNames[month]} {selected}
          </p>
          {(events[getDayKey(selected)] || []).map((e, i) => (
            <div key={i} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", marginBottom: "6px" }}>
              ◎ {e}
            </div>
          ))}
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addEvent()}
              placeholder="Add event..." style={{
                flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px", padding: "10px 14px", color: "#fff",
                fontFamily: "'Nunito', sans-serif", fontSize: "13px", outline: "none"
              }} />
            <button onClick={addEvent} style={{ background: "rgba(167,139,250,0.3)", border: "1px solid rgba(167,139,250,0.4)", borderRadius: "10px", padding: "0 16px", color: "#fff", cursor: "pointer", fontSize: "16px" }}>+</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MoodPage({ data, setData }) {
  const today = getDateKey();
  const moods = data.moods || {};
  const todayMoods = moods[today] || {};

  const setMood = (who, idx) => {
    setData(d => ({
      ...d,
      moods: { ...(d.moods || {}), [today]: { ...(d.moods?.[today] || {}), [who]: idx } }
    }));
  };

  const partners = [data.name1 || "Partner 1", data.name2 || "Partner 2"];

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 4px", fontWeight: 300 }}>How Are We?</h2>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 28px" }}>check in with each other's soul</p>

      {partners.map(who => (
        <div key={who} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "22px", marginBottom: "16px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", color: "#fff", margin: "0 0 20px" }}>{who}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {MOODS.map((m, i) => (
              <button key={i} onClick={() => setMood(who, i)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                background: todayMoods[who] === i ? "rgba(167,139,250,0.25)" : "transparent",
                border: `1px solid ${todayMoods[who] === i ? "#b8a4e8" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "14px", padding: "10px 8px", cursor: "pointer", transition: "all 0.2s", minWidth: "52px"
              }}>
                <span style={{ fontSize: "24px", filter: todayMoods[who] === i ? "none" : "grayscale(0.5)", opacity: todayMoods[who] === i ? 1 : 0.5 }}>{m}</span>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "9px", color: todayMoods[who] === i ? "#b8a4e8" : "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{MOOD_LABELS[i]}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Mood history */}
      <div style={{ marginTop: "8px" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0 0 12px" }}>recent week</p>
        {Array(7).fill(null).map((_, i) => {
          const d = new Date(); d.setDate(d.getDate() - i);
          const key = d.toISOString().split("T")[0];
          const entry = moods[key] || {};
          return (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", width: "80px" }}>
                {i === 0 ? "Today" : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })}
              </span>
              <div style={{ display: "flex", gap: "16px" }}>
                {partners.map(who => (
                  <span key={who} style={{ fontSize: "18px" }}>{entry[who] !== undefined ? MOODS[entry[who]] : "·"}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JournalPage({ data, setData }) {
  const [text, setText] = useState("");
  const [who, setWho] = useState(data.name1 || "Partner 1");
  const [priv, setPriv] = useState(false);
  const entries = data.journal || [];

  const add = () => {
    if (!text.trim()) return;
    setData(d => ({ ...d, journal: [{ id: Date.now(), text, who, private: priv, date: getDateKey(), time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) }, ...(d.journal || [])] }));
    setText("");
  };

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 4px", fontWeight: 300 }}>Gratitude Journal</h2>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>what are you grateful for today?</p>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "20px", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {[data.name1 || "Partner 1", data.name2 || "Partner 2"].map(w => (
            <button key={w} onClick={() => setWho(w)} style={{
              padding: "6px 14px", borderRadius: "20px", fontFamily: "'Nunito', sans-serif", fontSize: "12px", cursor: "pointer", border: "1px solid",
              background: who === w ? "rgba(125,211,200,0.25)" : "transparent",
              borderColor: who === w ? "#7dd3c8" : "rgba(255,255,255,0.15)",
              color: who === w ? "#7dd3c8" : "rgba(255,255,255,0.4)"
            }}>{w}</button>
          ))}
          <button onClick={() => setPriv(p => !p)} style={{
            marginLeft: "auto", padding: "6px 14px", borderRadius: "20px", fontFamily: "'Nunito', sans-serif", fontSize: "12px", cursor: "pointer", border: "1px solid",
            background: priv ? "rgba(255,180,100,0.2)" : "transparent",
            borderColor: priv ? "rgba(255,180,100,0.5)" : "rgba(255,255,255,0.15)",
            color: priv ? "rgba(255,200,120,0.9)" : "rgba(255,255,255,0.4)"
          }}>{priv ? "🔒 private" : "🌐 shared"}</button>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={3}
          placeholder="I'm grateful for..." style={{
            width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", padding: "12px 16px", color: "#fff", fontFamily: "'Nunito', sans-serif",
            fontSize: "14px", resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.6
          }} />
        <button onClick={add} style={{
          width: "100%", marginTop: "10px", background: "linear-gradient(135deg, rgba(125,211,200,0.3), rgba(167,139,250,0.3))",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px",
          color: "#fff", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, cursor: "pointer"
        }}>Add Entry ♡</button>
      </div>

      {entries.map(e => (
        <div key={e.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "16px 18px", marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", color: "#7dd3c8", letterSpacing: "0.05em" }}>{e.who}</span>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>{e.date} · {e.time} {e.private ? "🔒" : ""}</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "16px", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>"{e.text}"</p>
        </div>
      ))}
    </div>
  );
}

function MemoriesPage({ data, setData }) {
  const [caption, setCaption] = useState("");
  const fileRef = useRef(null);
  const photos = data.photos || [];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setData(d => ({ ...d, photos: [{ id: Date.now(), src: ev.target.result, caption, date: getDateKey() }, ...(d.photos || [])] }));
      setCaption("");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 4px", fontWeight: 300 }}>Our Memories</h2>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>moments worth keeping forever</p>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "24px" }}>
        <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Add a caption..." style={{
          width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px", padding: "10px 16px", color: "#fff", fontFamily: "'Nunito', sans-serif",
          fontSize: "13px", outline: "none", boxSizing: "border-box", marginBottom: "14px"
        }} />
        <button onClick={() => fileRef.current?.click()} style={{
          background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(125,211,200,0.3))",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "14px 28px",
          color: "#fff", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, cursor: "pointer"
        }}>
          ◈ Add a Photo
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </div>

      <div style={{ columns: "2", gap: "10px" }}>
        {photos.map(p => (
          <div key={p.id} style={{ breakInside: "avoid", marginBottom: "10px", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
            <img src={p.src} alt={p.caption} style={{ width: "100%", display: "block" }} />
            {p.caption && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 12px 10px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "13px", color: "#fff", margin: 0, fontStyle: "italic" }}>{p.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.2)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px" }}>
          Your memories will live here ◈
        </div>
      )}
    </div>
  );
}

function LovePage({ data }) {
  const [dateIdx, setDateIdx] = useState(() => Math.floor(Math.random() * DATE_IDEAS.length));

  return (
    <div style={{ padding: "24px 20px", paddingBottom: "100px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 4px", fontWeight: 300 }}>Love & Growth</h2>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", margin: "0 0 28px" }}>nurture the garden between you</p>

      {/* Date idea */}
      <div style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(125,211,200,0.15))", border: "1px solid rgba(167,139,250,0.25)", borderRadius: "24px", padding: "28px", marginBottom: "20px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "#b8a4e8", textTransform: "uppercase", margin: "0 0 16px" }}>✿ date idea</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", color: "#fff", margin: "0 0 20px", lineHeight: 1.4 }}>{DATE_IDEAS[dateIdx]}</p>
        <button onClick={() => setDateIdx((dateIdx + 1) % DATE_IDEAS.length)} style={{
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px",
          padding: "8px 20px", color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito', sans-serif", fontSize: "12px", cursor: "pointer"
        }}>give me another →</button>
      </div>

      {/* Love challenges */}
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0 0 14px" }}>love language challenges</p>
      {LOVE_CHALLENGES.map((c, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "14px 16px", marginBottom: "8px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <span style={{ color: "#b8a4e8", fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>✦</span>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5 }}>{c}</p>
        </div>
      ))}
    </div>
  );
}

// ---- SETUP SCREEN ----
function SetupScreen({ onDone }) {
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>✦</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "36px", color: "#fff", margin: "0 0 8px", fontWeight: 300 }}>Welcome</h1>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "0 0 40px" }}>let's set up your sacred space</p>
      <input value={n1} onChange={e => setN1(e.target.value)} placeholder="Your name" style={{ width: "100%", maxWidth: "300px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "14px 18px", color: "#fff", fontFamily: "'Nunito', sans-serif", fontSize: "15px", outline: "none", marginBottom: "12px", boxSizing: "border-box" }} />
      <input value={n2} onChange={e => setN2(e.target.value)} placeholder="Partner's name" style={{ width: "100%", maxWidth: "300px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "14px 18px", color: "#fff", fontFamily: "'Nunito', sans-serif", fontSize: "15px", outline: "none", marginBottom: "28px", boxSizing: "border-box" }} />
      <button onClick={() => { if (n1.trim() && n2.trim()) onDone(n1.trim(), n2.trim()); }} style={{
        background: "linear-gradient(135deg, rgba(167,139,250,0.5), rgba(125,211,200,0.5))",
        border: "1px solid rgba(255,255,255,0.2)", borderRadius: "16px", padding: "14px 40px",
        color: "#fff", fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em"
      }}>Begin Our Journey ✦</button>
    </div>
  );
}

// ---- MAIN APP ----
export default function App() {
  const [data, setData] = useState({
    name1: "Jai", name2: "Shrey", goals: [], events: {}, moods: {}, journal: [], photos: [], habitCompletions: {}, streak: 7
  });
  const [page, setPage] = useState("home");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ourapp_data");
      if (saved) { const parsed = JSON.parse(saved); setData({ ...parsed, name1: "Jai", name2: "Shrey" }); }
    } catch {}
  }, []);

  const updateData = (updater) => {
    setData(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try { localStorage.setItem("ourapp_data", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const pages = { home: HomePage, goals: GoalsPage, habits: HabitsPage, calendar: CalendarPage, mood: MoodPage, journal: JournalPage, memories: MemoriesPage, love: LovePage };
  const PageComponent = pages[page];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0a1e 0%, #1a0f2e 40%, #0a1a2a 100%)", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
      <GradientOrb style={{ top: "-15%", left: "-15%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(184,164,232,0.18), transparent)" }} />
      <GradientOrb style={{ bottom: "10%", right: "-15%", width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(125,211,200,0.15), transparent)" }} />
      <GradientOrb style={{ top: "40%", left: "30%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(184,164,232,0.08), transparent)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "480px", margin: "0 auto" }}>
        <PageComponent data={data} setData={updateData} />
      </div>
      <NavBar active={page} setActive={setPage} />
    </div>
  );
}
