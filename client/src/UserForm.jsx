import { useState } from "react";

export default function UserForm({ onSubmit, lang, setLang }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    income: "",
    state: "",
    category: "Student",
  });

  const t = {
    en: {
      title: "User Information",
      name: "Full Name",
      age: "Age",
      income: "Annual Income (₹)",
      state: "State",
      category: "Category",
      start: "Continue",
    },
    hi: {
      title: "आपकी जानकारी",
      name: "पूरा नाम",
      age: "उम्र",
      income: "वार्षिक आय (₹)",
      state: "राज्य",
      category: "श्रेणी",
      start: "आगे बढ़ें",
    },
  };

  return (
    <div className="modal-overlay">
      <div className="form-card">
        <div className="form-header">
          <h2>{t[lang].title}</h2>
          <div className="lang-switch">
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={lang === "hi" ? "active" : ""}
              onClick={() => setLang("hi")}
            >
              HI
            </button>
          </div>
        </div>

        <div className="form-body">
          <label>{t[lang].name}</label>
          <input
            type="text"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label>{t[lang].age}</label>
          <input
            type="number"
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
          />

          <label>{t[lang].income}</label>
          <input
            type="number"
            onChange={(e) =>
              setForm({ ...form, income: e.target.value })
            }
          />

          <label>{t[lang].state}</label>
          <input
            type="text"
            onChange={(e) =>
              setForm({ ...form, state: e.target.value })
            }
          />

          <label>{t[lang].category}</label>
          <select
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="Student">Student</option>
            <option value="Farmer">Farmer</option>
            <option value="Women">Women</option>
            <option value="General">General</option>
          </select>

          <button
            className="primary-btn"
            onClick={() => onSubmit(form)}
          >
            {t[lang].start}
          </button>
        </div>
      </div>
    </div>
  );
}
<button className="primary-btn" onClick={() => onSubmit(form)}>
  {t[lang].start}
</button>
