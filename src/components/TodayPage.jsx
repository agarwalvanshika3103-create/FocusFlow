import { useState } from 'react'
import HabitRow from './HabitRow'
import { todayKey, getRecord, getCurrentStreak } from '../data/utils'

function TodayPage({ habits, records, onToggle, onSkip, onDelete, onOpenModal }) {
  const today     = todayKey()
  const doneCount = habits.filter(h => getRecord(records, h.id, today) === 'done').length
  const total     = habits.length
  const pct       = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  const R    = 22
  const circ = 2 * Math.PI * R
  const dash = circ - (pct / 100) * circ

  const h        = new Date().getHours()
  const greeting = h < 5 ? 'Still up?' : h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  const dateStr  = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const [search, setSearch] = useState("")
  const filteredHabits = habits.filter(habit =>
  habit.name.toLowerCase().includes(search.toLowerCase())
)
const quotes = [
  "Small progress is still progress. 💪",
  "Success comes from consistency.",
  "One habit at a time.",
  "Stay focused and never give up!",
  "Your future self will thank you.",
  "Discipline beats motivation.",
  "Every day is a fresh start.",
];

const day = new Date().getDate();
const quote = quotes[today % quotes.length];
  return (
    <div className="today-page">
      <div className="today-header">
        <div className="quote-card">
  <p className="quote-title">Quote of the Day</p>
  <p className="quote-text">"Success comes from consistency."</p>
</div>
        <div className="today-header-left">
          <div className="today-date">{ dateStr }</div>
          <div className="today-greeting">{ greeting } 👋</div>
        </div>

        { total > 0 && (
          <div className="today-ring">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle className="ring-bg" cx="28" cy="28" r={ R } />
              <circle className="ring-fg" cx="28" cy="28" r={ R }
                strokeDasharray={ circ }
                strokeDashoffset={ dash }
              />
            </svg>
            <div className="ring-label">{ pct }%</div>
          </div>
        ) }
      </div>

      { total > 0 && (
        <div className="today-progress">
          <span className="prog-label">{ doneCount } of { total } done</span>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: `${ pct }%` }} />
          </div>
          <span className="prog-pct">{ pct }%</span>
        </div>
      ) }

      { habits.length === 0 ? (
        <div className="empty-state">
          <span className="empty-emoji">🌱</span>
          <h3>No habits yet</h3>
          <p>Tap the + button to add<br />your first habit.</p>
        </div>
      ) : (
        <>
          <div className="list-label">
  Today's Habits
</div>

<div className="search-container">
  <input
    type="text"
    className="search-input"
    placeholder="🔍 Search habits..."
  />
</div>
          <div className="habit-list">
            {filteredHabits.map(habit => (
              <HabitRow
                key={ habit.id }
                habit={ habit }
                status={ getRecord(records, habit.id, today) }
                streak={ getCurrentStreak(records, habit.id) }
                onToggle={ () => onToggle(habit.id) }
                onSkip={ () => onSkip(habit.id) }
                onDelete={ () => onDelete(habit.id) }
              />
            )) }
          </div>
        </>
      ) }

      <button className="fab" onClick={ onOpenModal } aria-label="Add habit">+</button>
    </div>
  )
}

export default TodayPage