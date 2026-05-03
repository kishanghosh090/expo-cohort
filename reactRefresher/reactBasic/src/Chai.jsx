import React, { useState } from "react";

function Chai() {
  const [task, setTask] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date());

  function handleTaskText(e) {
    setTaskText(e.target.value);
  }
  function handleDate(e) {
    setTaskDate(e.target.value);
  }
  function formatIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function formatDisplayDate(dateString) {
    if (!dateString) {
      return "Pick a date";
    }
    return new Date(dateString).toLocaleDateString();
  }
  function handleSelectDate(date) {
    setTaskDate(formatIsoDate(date));
    setIsPickerOpen(false);
  }
  function handlePrevMonth() {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }
  function handleNextMonth() {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }
  function handleClearDate() {
    setTaskDate("");
    setIsPickerOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!taskText.trim()) {
      return;
    }
    setTask((prev) => [...prev, { taskText: taskText.trim(), taskDate }]);
    setTaskText("");
    setTaskDate("");
  }
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <p className="brand-title">Nebula Boards</p>
            <p className="brand-subtitle">Product Delivery</p>
          </div>
        </div>
        <div className="top-actions">
          <input
            className="search"
            type="search"
            placeholder="Search issues"
            aria-label="Search issues"
          />
          <button className="ghost-button" type="button">
            Filters
          </button>
          <button className="primary-button" type="button">
            Create
          </button>
          <div className="avatar">KC</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="side-nav">
          <div className="nav-section">
            <p className="nav-title">Project</p>
            <button className="nav-item is-active" type="button">
              Board
            </button>
            <button className="nav-item" type="button">
              Backlog
            </button>
            <button className="nav-item" type="button">
              Reports
            </button>
            <button className="nav-item" type="button">
              Releases
            </button>
          </div>
          <div className="nav-section">
            <p className="nav-title">Teams</p>
            <button className="nav-item" type="button">
              Design
            </button>
            <button className="nav-item" type="button">
              Engineering
            </button>
            <button className="nav-item" type="button">
              QA
            </button>
          </div>
        </aside>

        <main className="board-area">
          <section className="board-header">
            <div>
              <p className="eyebrow">Sprint 12</p>
              <h1>Growth Platform Board</h1>
            </div>
            <div className="meta">
              <span className="pill">High focus</span>
              <span className="pill is-muted">24 open</span>
              <span className="pill is-muted">6 blocked</span>
            </div>
          </section>

          <section className="board-controls">
            <form className="task-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="task">Issue summary</label>
                <input
                  id="task"
                  type="text"
                  name="task"
                  placeholder="Add a new issue"
                  value={taskText}
                  onChange={handleTaskText}
                />
              </div>
              <div className="field">
                <label htmlFor="date">Due date</label>
                <div className="date-picker">
                  <button
                    className="date-button"
                    type="button"
                    id="date"
                    aria-haspopup="dialog"
                    aria-expanded={isPickerOpen}
                    onClick={() => setIsPickerOpen((prev) => !prev)}
                  >
                    {formatDisplayDate(taskDate)}
                  </button>
                  {isPickerOpen ? (
                    <div className="calendar-popover" role="dialog">
                      <div className="calendar-head">
                        <button
                          className="calendar-nav"
                          type="button"
                          onClick={handlePrevMonth}
                          aria-label="Previous month"
                        ></button>
                        <div className="calendar-title">
                          {viewDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <button
                          className="calendar-nav"
                          type="button"
                          onClick={handleNextMonth}
                          aria-label="Next month"
                        ></button>
                      </div>
                      <div className="calendar-grid">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div className="calendar-weekday" key={day}>
                              {day}
                            </div>
                          ),
                        )}
                        {(() => {
                          const year = viewDate.getFullYear();
                          const month = viewDate.getMonth();
                          const firstDay = new Date(year, month, 1);
                          const dayOffset = (firstDay.getDay() + 6) % 7;
                          const daysInMonth = new Date(
                            year,
                            month + 1,
                            0,
                          ).getDate();
                          const cells = [];

                          for (let i = 0; i < dayOffset; i += 1) {
                            cells.push(
                              <div
                                className="calendar-cell is-muted"
                                key={`blank-${i}`}
                              />,
                            );
                          }

                          for (let day = 1; day <= daysInMonth; day += 1) {
                            const date = new Date(year, month, day);
                            const iso = formatIsoDate(date);
                            const isSelected = taskDate === iso;
                            cells.push(
                              <button
                                className={`calendar-day${
                                  isSelected ? " is-selected" : ""
                                }`}
                                type="button"
                                key={iso}
                                onClick={() => handleSelectDate(date)}
                              >
                                {day}
                              </button>,
                            );
                          }

                          return cells;
                        })()}
                      </div>
                      <div className="calendar-actions">
                        <button
                          className="ghost-button"
                          type="button"
                          onClick={handleClearDate}
                        >
                          Clear
                        </button>
                        <button
                          className="primary-button"
                          type="button"
                          onClick={() => setIsPickerOpen(false)}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
                <input
                  className="sr-only"
                  type="date"
                  value={taskDate}
                  onChange={handleDate}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
              <button className="primary-button" type="submit">
                Add issue
              </button>
            </form>
            <div className="board-summary">
              <div>
                <p className="summary-label">Velocity</p>
                <p className="summary-value">42 pts</p>
              </div>
              <div>
                <p className="summary-label">Cycle time</p>
                <p className="summary-value">4.2 days</p>
              </div>
              <div>
                <p className="summary-label">Release</p>
                <p className="summary-value">May 10</p>
              </div>
            </div>
          </section>

          <section className="board">
            <div className="column">
              <div className="column-head">
                <span>Backlog</span>
                <span className="count">{task.length}</span>
              </div>
              {task.length ? (
                <ul className="card-list">
                  {task.map((element, index) => (
                    <li
                      className="card"
                      key={`${element.taskText}-${element.taskDate}-${index}`}
                    >
                      <div className="card-title">{element.taskText}</div>
                      <div className="card-meta">
                        <span className="tag">Story</span>
                        <span>
                          {element.taskDate
                            ? new Date(element.taskDate).toLocaleDateString()
                            : "No due date"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-state">
                  No issues yet. Add your first backlog item.
                </div>
              )}
            </div>

            <div className="column">
              <div className="column-head">
                <span>In Progress</span>
                <span className="count">3</span>
              </div>
              <div className="empty-state">Drag issues here to start work.</div>
            </div>

            <div className="column">
              <div className="column-head">
                <span>Review</span>
                <span className="count">1</span>
              </div>
              <div className="empty-state">Pending feedback.</div>
            </div>

            <div className="column">
              <div className="column-head">
                <span>Done</span>
                <span className="count">12</span>
              </div>
              <div className="empty-state">Shipped this sprint.</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Chai;
