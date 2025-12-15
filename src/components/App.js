import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const App = () => {
  const [month, setMonth] = useState(1); // February
  const [year, setYear] = useState(2023);
  const [editYear, setEditYear] = useState(false);

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push("");
  for (let i = 1; i <= totalDays; i++) calendarCells.push(i);

  const changeMonth = (step) => {
    let newMonth = month + step;
    if (newMonth < 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (newMonth > 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(newMonth);
    }
  };

  return (
    <div>
      {/* Heading */}
      <h1 id="calendar-heading">Calendar</h1>

      {/* Month Dropdown */}
      <select
        id="month-select"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        {months.map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))}
      </select>

      {/* Year Display / Edit */}
      {editYear ? (
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          onBlur={() => setEditYear(false)}
          autoFocus
        />
      ) : (
        <span
          id="year-text"
          onDoubleClick={() => setEditYear(true)}
        >
          {year}
        </span>
      )}

      <hr />

      {/* Calendar Table */}
      <table id="calendar-table">
        <thead>
          <tr>
            {days.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <tr key={row}>
              {calendarCells
                .slice(row * 7, row * 7 + 7)
                .map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Navigation Buttons */}
      <button id="prev-year" onClick={() => setYear(year - 1)}>{"<<"}</button>
      <button id="prev-month" onClick={() => changeMonth(-1)}>{"<"}</button>
      <button id="next-month" onClick={() => changeMonth(1)}>{">"}</button>
      <button id="next-year" onClick={() => setYear(year + 1)}>{">>"}</button>
    </div>
  );
};

export default App;
