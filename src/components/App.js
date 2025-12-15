import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const App = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("December");
  const [editYear, setEditYear] = useState(false);

  const monthIndex = months.indexOf(month);
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const cells = Array(42).fill("");

  for (let i = 0; i < totalDays; i++) {
    cells[firstDay + i] = i + 1;
  }

  const changeMonth = (step) => {
    let idx = monthIndex + step;
    if (idx < 0) {
      setMonth("December");
      setYear(year - 1);
    } else if (idx > 11) {
      setMonth("January");
      setYear(year + 1);
    } else {
      setMonth(months[idx]);
    }
  };

  return (
    <div>

      <h1 id="heading">Calendar</h1>

      <select
        id="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {months.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {!editYear && (
        <span
          id="year"
          onDoubleClick={() => setEditYear(true)}
        >
          {year}
        </span>
      )}

      {editYear && (
        <input
          id="year-text-box"
          type="number"
          value={year}
          autoFocus
          onChange={(e) => setYear(Number(e.target.value))}
          onBlur={() => setEditYear(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setEditYear(false);
          }}
        />
      )}

      <table>
        <thead>
          <tr>
            {days.map(d => <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5].map(row => (
            <tr key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button id="prev-year" onClick={() => setYear(year - 1)}>{"<<"}</button>
      <button id="prev-month" onClick={() => changeMonth(-1)}>{"<"}</button>
      <button id="next-month" onClick={() => changeMonth(1)}>{">"}</button>
      <button id="next-year" onClick={() => setYear(year + 1)}>{">>"}</button>
    </div>
  );
};

export default App;
