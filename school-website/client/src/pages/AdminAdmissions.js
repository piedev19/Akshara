import React, { useEffect, useState } from 'react';
import { admissionAPI } from '../utils/api';

const stylesCSS = `
  body { background: #070b14; }

  .app {
    min-height: 100vh;
    background: #070b14;
    padding: 120px 40px;
  }

  .grid-overlay {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: auto;
  }

  .table-wrap {
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1.2fr 2fr 1.5fr 1fr 1fr 60px;
    padding: 14px 20px;
    font-size: 11px;
    color: #64748b;
    background: rgba(255,255,255,0.03);
  }

  .user-row {
    display: grid;
    grid-template-columns: 1.2fr 2fr 1.5fr 1fr 1fr 60px;
    padding: 18px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
    transition: 0.2s;
  }

  .user-row:hover {
    background: rgba(0,229,255,0.04);
  }

  .user-name-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .user-name {
    font-weight: 600;
    color: #e8edf5;
  }

  .cell-email {
    color: #64748b;
    font-size: 12px;
  }

  .cell-phone {
    font-size: 12px;
  }

  .row-arrow {
    color: #00e5ff;
    text-align: right;
  }
`;
const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: 20
};

const Title = ({ children }) => (
  <div style={{
    fontSize: 11,
    letterSpacing: '0.2em',
    color: '#00e5ff',
    marginBottom: 16,
    textTransform: 'uppercase'
  }}>
    {children}
  </div>
);

const Field = ({ label, value }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{
      fontSize: 10,
      color: '#64748b',
      textTransform: 'uppercase'
    }}>
      {label}
    </div>
    <div style={{ fontSize: 14 }}>{value || '-'}</div>
  </div>
);

export default function AdminAdmissions() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const res = await admissionAPI.getAll();

        const arr = Array.isArray(res) ? res : res?.data || [];

        setData(arr);
        setOriginalData(arr);

    } catch (err) {
        console.error(err);
    }
    };

  // ================= DETAIL PAGE =================
  if (selected) {
  const getInitials = (name) =>
    name?.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#070b14',
      color: '#e8edf5',
      padding: '120px 40px'
    }}>
      {/* BACK BUTTON */}
      <button
        onClick={() => setSelected(null)}
        style={{
          marginBottom: 30,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px 18px',
          color: '#94a3b8',
          borderRadius: 8,
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      {/* HERO SECTION */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        marginBottom: 40
        }}>
        <div style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: 'rgba(0,229,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 'bold',
            color: '#00e5ff'
        }}>
            {getInitials(selected.studentName)}
        </div>

        <div>
            <h1 style={{
            fontSize: 40,
            fontWeight: 800,
            margin: 0,
            background: 'linear-gradient(135deg,#e8edf5,#94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
            }}>
            {selected.studentName}
            </h1>

            {/* 🔥 ADD THIS */}
            <div
                onClick={() => {
                    navigator.clipboard.writeText(selected.applicationNumber);
                    alert('Copied!');
                }}
                title="Click to copy"
                style={{
                    marginTop: 8,
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 12,
                    letterSpacing: '1px',
                    background: 'rgba(0,229,255,0.1)',
                    border: '1px solid rgba(0,229,255,0.3)',
                    color: '#00e5ff',
                    cursor: 'pointer'
                }}
                >
                #{selected.applicationNumber || 'N/A'}
                </div>

            <p style={{ color: '#00e5ff', marginTop: 8 }}>
            Admission Record
            </p>
        </div>
        </div>

      {/* GRID CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
        gap: 20
      }}>

        {/* CONTACT */}
        <div style={cardStyle}>
          <Title>Contact</Title>
          <Field label="Email" value={selected.email} />
          <Field label="Phone" value={selected.primaryContact} />
        </div>

        {/* ADDRESS */}
        <div style={cardStyle}>
          <Title>Address</Title>
          <Field label="Street" value={selected.address?.street} />
          <Field label="City" value={selected.address?.city} />
          <Field label="State" value={selected.address?.state} />
        </div>

        {/* STUDENT */}
        <div style={cardStyle}>
          <Title>Student</Title>
          <Field label="Class" value={selected.classAppliedFor} />
          <Field label="DOB" value={selected.dateOfBirth} />
          <Field label="Gender" value={selected.gender} />
        </div>

        {/* PARENTS */}
        <div style={cardStyle}>
          <Title>Parents</Title>
          <Field label="Father" value={selected.fatherName} />
          <Field label="Mother" value={selected.motherName} />
        </div>

        {/* FACILITIES */}
        <div style={cardStyle}>
          <Title>Facilities</Title>
          <Field label="Transport" value={selected.transportRequired ? 'Yes' : 'No'} />
          <Field label="Hostel" value={selected.hostelRequired ? 'Yes' : 'No'} />
        </div>

        {/* STATUS */}
        <div style={cardStyle}>
            <Title>Status</Title>

            <span
                onClick={async () => {
                    const newStatus =
                        selected.status === 'Confirmed' ? 'Pending' : 'Confirmed';

                    try {
                        await admissionAPI.updateStatus(selected._id, newStatus);

                        const updatedSelected = { ...selected, status: newStatus };
                        setSelected(updatedSelected);

                        const updated = data.map(d =>
                            d._id === selected._id
                                ? updatedSelected
                                : d
                        );

                        setData(updated);
                        setOriginalData(updated);

                    } catch (err) {
                        console.error(err);
                    }
                    }}
                style={{
                padding: '8px 14px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 13,
                display: 'inline-block',

                background:
                    selected.status === 'Confirmed'
                    ? 'rgba(52,211,153,0.15)'
                    : 'rgba(255,107,107,0.15)',

                color:
                    selected.status === 'Confirmed'
                    ? '#34d399'
                    : '#ff6b6b',

                border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                {selected.status || 'Pending'}
            </span>
            </div>

      </div>
    </div>
  );
}

  // ================= MAIN TABLE =================
  return (
  <div className="app">
    <style>{stylesCSS}</style>

    <div className="grid-overlay" />

    <div className="container">

      {/* HEADER */}
      <div style={{ marginBottom: 30 }}>
        <div style={{
          fontSize: 11,
          letterSpacing: '0.2em',
          color: '#00e5ff',
          marginBottom: 8
        }}>
          SCHOOL MANAGEMENT
        </div>

        <h1 style={{
          fontSize: 42,
          fontWeight: 800,
          background: 'linear-gradient(135deg,#e8edf5,#94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Admissions Dashboard
        </h1>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search by name or class..."
          onChange={(e) => {
            const val = e.target.value.toLowerCase();

            const filtered = originalData.filter(x =>
              x.studentName?.toLowerCase().includes(val) ||
              x.classAppliedFor?.toLowerCase().includes(val)
            );

            setData(filtered);
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            color: '#fff'
          }}
        />
      </div>

      {/* TABLE */}
      <div className="table-wrap">

        {/* HEADER */}
        <div className="table-header">
          <span>Adm No</span>
          <span>Name</span>
          <span>Contact</span>
          <span>Class</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* ROWS */}
        {data.map((item, i) => (
          <div
            key={i}
            className="user-row"
            onClick={() => setSelected(item)}
          >
            <span className="cell-phone">
                {item.applicationNumber || '—'}
            </span>
            {/* NAME + AVATAR */}
            <div className="user-name-cell">
              <div className="avatar" style={{
                background: 'rgba(0,229,255,0.15)',
                color: '#00e5ff'
              }}>
                {item.studentName?.slice(0,2).toUpperCase()}
              </div>
              <span className="user-name">{item.studentName}</span>
            </div>

            <span className="cell-phone">{item.primaryContact}</span>
            <span className="cell-phone">{item.classAppliedFor}</span>

            {/* STATUS BUTTON */}
            <span
                onClick={async (e) => {
                    e.stopPropagation();

                    const newStatus =
                    item.status === 'Confirmed' ? 'Pending' : 'Confirmed';

                    try {
                    // ✅ update in backend (IMPORTANT)
                    await admissionAPI.updateStatus(item._id, newStatus);

                    // ✅ update UI
                    const updated = data.map(d =>
                        d._id === item._id
                        ? { ...d, status: newStatus }
                        : d
                    );

                    setData(updated);
                    setOriginalData(updated); // for search sync

                    } catch (err) {
                    console.error(err);
                    }
                }}
                style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 12,
                    background:
                    item.status === 'Confirmed'
                        ? 'rgba(52,211,153,0.15)'
                        : 'rgba(255,107,107,0.15)',
                    color:
                    item.status === 'Confirmed'
                        ? '#34d399'
                        : '#ff6b6b',
                    border: '1px solid rgba(255,255,255,0.2)',
                    width: 'fit-content'
                }}
                >
                {item.status || 'Pending'}
                </span>

            <span className="row-arrow">→</span>
          </div>
        ))}

      </div>

      <div style={{ height: 60 }} />
    </div>
  </div>
);
}