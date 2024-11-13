import React, { useState } from 'react';
import axios from 'axios';
import './LogForm.css';  // Add styles for the form

const LogForm = () => {
  const [log, setLog] = useState({ timestamp: '', level: '', message: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/logs', log);
      setResult(res.data.detectedFake ? 'Fake Log Detected' : 'Legitimate Log');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="log-form">
      <input
        type="text"
        name="timestamp"
        placeholder="Timestamp"
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="text"
        name="level"
        placeholder="Log Level"
        onChange={handleChange}
        className="input-field"
        required
      />
      <textarea
        name="message"
        placeholder="Log Message"
        onChange={handleChange}
        className="input-field"
        required
      />
      <button type="submit" className="submit-btn">Submit Log</button>
      {result && <p className="result">{result}</p>}
    </form>
  );
};

export default LogForm;
