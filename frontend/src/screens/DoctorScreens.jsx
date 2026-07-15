/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api/client';
// JRISSI deep-dive panel, Predictive forecasting view.

// ============================================================================
// 1. SOAP CONSULTATION EDITOR
// ============================================================================
export function SoapEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || { id: 1, full_name: 'A. Perera', employee_id: 'E-002417', department: 'engineering', jrissi: 78 };
  
  const [tab, setTab] = React.useState('s');
  const [s, setS] = React.useState('');
  const [o, setO] = React.useState('');
  const [a, setA] = React.useState('');
  const [p, setP] = React.useState('');
  const [consultId, setConsultId] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [dashboard, setDashboard] = React.useState(null);
  const [consultHistory, setConsultHistory] = React.useState([]);

  React.useEffect(() => {
    // Create draft on load
    api.post('/consultations/', { patient_id: patient.id })
      .then(res => setConsultId(res.data.id))
      .catch(err => console.error("Failed to create draft", err));
    // Load dashboard & history for side rail
    api.get(`/patients/${patient.id}/dashboard`)
      .then(res => setDashboard(res.data))
      .catch(err => console.error("Failed to load dashboard", err));
    api.get(`/consultations/patient/${patient.id}?limit=4`)
      .then(res => setConsultHistory(res.data))
      .catch(err => console.error("Failed to load consultation history", err));
  }, [patient.id]);

  const handleSaveDraft = async () => {
    if (!consultId) return;
    setSaving(true);
    try {
      await api.patch(`/consultations/${consultId}`, { subjective: s, objective: o, assessment: a, plan: p });
      alert("Draft saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  const handleSign = async () => {
    if (!consultId) return;
    setSaving(true);
    try {
      await api.patch(`/consultations/${consultId}`, { subjective: s, objective: o, assessment: a, plan: p });
      await api.post(`/consultations/${consultId}/sign`);
      alert("Consultation signed and closed!");
      navigate('/doctor/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to sign consultation");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { value: 's', label: 'Subjective', icon: 'edit_note' },
    { value: 'o', label: 'Objective', icon: 'monitor_heart' },
    { value: 'a', label: 'Assessment', icon: 'psychology' },
    { value: 'p', label: 'Plan', icon: 'task_alt' },
  ];
  const content = { s, o, a, p };
  const setters = { s: setS, o: setO, a: setA, p: setP };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Consultation · started now</div>
          <h1 className="type-h1">SOAP — {patient.full_name}</h1>
          <p className="type-body" style={{ marginTop: 6 }}>{patient.employee_id} · {patient.department} · {patient.jrissi ? <span style={{ color: 'var(--danger-fg)' }}>JRISSI {patient.jrissi}</span> : 'No JRISSI data'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="pill" onClick={() => navigate('/doctor/prescriptions', { state: { patient } })}>Write Prescription</Button>
          <Button kind="ghost" icon="history" onClick={() => navigate('/doctor/patients', { state: { patient } })}>History</Button>
          <Button kind="secondary" icon="save" onClick={handleSaveDraft} disabled={saving}>Save draft</Button>
          <Button kind="primary" icon="check" onClick={handleSign} disabled={saving}>Sign &amp; close</Button>
        </div>
      </header>

      <Banner tone="warning" title="JRISSI sustained High for 14 days.">Consider escalation to OH psych as part of plan. <a href="#" onClick={(e) => { e.preventDefault(); navigate('/doctor/jrissi', { state: { patient } }); }} style={{ color: 'var(--warning-fg)', textDecoration: 'underline' }}>Open JRISSI deep-dive</a>.</Banner>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <Card padding={0}>
          <div style={{ padding: '14px 20px 0' }}>
            <Tabs value={tab} onChange={setTab} items={tabs} />
          </div>
          <div style={{ padding: 20 }}>
            <div className="type-eyebrow" style={{ marginBottom: 10 }}>
              {tabs.find(t => t.value === tab).label} · {tab === 's' ? 'what the patient says' : tab === 'o' ? 'what you observe' : tab === 'a' ? 'your assessment' : 'agreed plan'}
            </div>
            <Textarea rows={9} value={content[tab]} onChange={setters[tab]} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
              <div className="type-caption">{content[tab].length} chars · auto-saved 12 s ago</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Button kind="ghost" size="sm" icon="auto_awesome">Suggest from history</Button>
                <Button kind="ghost" size="sm" icon="mic">Dictate</Button>
              </div>
            </div>
          </div>
          {/* Tab strip footer with progress */}
          <div style={{ display: 'flex', borderTop: '1px solid var(--border-1)' }}>
            {tabs.map((t, i) => (
              <button key={t.value} onClick={() => setTab(t.value)} style={{
                flex: 1, border: 0, padding: '14px 16px', cursor: 'pointer',
                background: tab === t.value ? 'var(--bg-selected)' : 'var(--surface-1)',
                borderRight: i < tabs.length - 1 ? '1px solid var(--border-1)' : 0,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                color: 'var(--fg-2)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name={content[t.value] ? 'check_circle' : 'radio_button_unchecked'} size={20} style={{ fontSize: 14, color: content[t.value] ? 'var(--success)' : 'var(--fg-4)' }} />
                  <span style={{ font: '500 12px var(--font-sans)' }}>{t.label}</span>
                </div>
                <span className="type-caption" style={{ fontSize: 11 }}>{content[t.value] ? `${content[t.value].split(/\s+/).length} words` : 'Empty'}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Side rail — patient context + vitals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardHeader eyebrow="Vitals · today" title="At a glance" />
            {dashboard?.latest_vitals ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { l: 'HR', v: dashboard.latest_vitals.heart_rate ?? '—', u: 'bpm', t: (dashboard.latest_vitals.heart_rate >= 60 && dashboard.latest_vitals.heart_rate <= 100) ? 'success' : 'warning' },
                  { l: 'SpO₂', v: dashboard.latest_vitals.spo2 ?? '—', u: '%', t: (dashboard.latest_vitals.spo2 ?? 100) >= 95 ? 'success' : 'warning' },
                  { l: 'Temp', v: dashboard.latest_vitals.temperature ?? '—', u: '°C', t: (dashboard.latest_vitals.temperature ?? 37) <= 37.5 ? 'success' : 'warning' },
                  { l: 'Steps', v: dashboard.latest_vitals.steps?.toLocaleString() ?? '—', u: 'today', t: (dashboard.latest_vitals.steps ?? 0) >= 8000 ? 'success' : 'info' },
                ].map((m, i) => (
                  <div key={i} style={{ padding: 12, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
                    <div className="type-caption" style={{ marginBottom: 4 }}>{m.l}</div>
                    <div className="type-clinical" style={{ fontSize: 18 }}>{m.v}<span style={{ font: '400 11px var(--font-sans)', color: 'var(--fg-3)', marginLeft: 3 }}>{m.u}</span></div>
                    <div style={{ marginTop: 4, height: 3, borderRadius: 999, background: `var(--${m.t})`, opacity: 0.7 }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--fg-3)', fontSize: 13, padding: '8px 0' }}>No vitals recorded today.</div>
            )}
          </Card>

          <Card>
            <CardHeader eyebrow="Known flags" title="Patient context" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {patient.jrissi ? <Chip tone="high" dot>JRISSI {patient.jrissi}</Chip> : null}
              {dashboard?.conditions?.map((c, i) => <Chip key={i} tone="warning">{c}</Chip>)}
              {(!dashboard || !dashboard.conditions?.length) && !patient.jrissi && <span style={{ color: 'var(--fg-3)', fontSize: 13 }}>No flags on record.</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {consultHistory.length > 0 ? consultHistory.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 8, borderBottom: i < consultHistory.length - 1 ? '1px dashed var(--border-1)' : 0 }}>
                  <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)', width: 56, flexShrink: 0 }}>
                    {new Date(r.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>
                  <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>
                    {r.assessment || r.subjective?.slice(0, 40) || 'Consultation'}{r.status === 'signed' ? '' : ' · draft'}
                  </span>
                </div>
              )) : (
                <div style={{ color: 'var(--fg-3)', fontSize: 13 }}>No prior consultations on record.</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. PRESCRIPTION WRITER
// ============================================================================
export function PrescriptionWriter() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || { id: 1, full_name: 'A. Perera' };
  
  const [saving, setSaving] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [rx, setRx] = useState([]);
  const [toast, setToast] = useState(null);

  // Debounced drug search
  React.useEffect(() => {
    if (!searchQ.trim()) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await api.get(`/drugs?q=${encodeURIComponent(searchQ)}&limit=8`);
        setSearchResults(res.data);
      } catch (e) { console.error(e); }
      finally { setSearching(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQ]);

  const addDrug = (drug) => {
    setRx(prev => [...prev, {
      drug_id: drug.id,
      name: drug.generic_name,
      brand: drug.brand_name || '',
      strength: drug.strength || '',
      form: drug.form || 'tab',
      dose: '1 tab OD',
      duration_days: 7,
      route: 'oral',
      instructions: '',
      stock: drug.total_quantity ?? 0,
    }]);
    setSearchQ('');
    setSearchResults([]);
  };

  const updateRx = (i, key, val) => setRx(prev => prev.map((r, idx) => idx === i ? { ...r, [key]: val } : r));
  const removeRx = (i) => setRx(prev => prev.filter((_, idx) => idx !== i));

  const handleSignAndSend = async () => {
    if (rx.length === 0) { alert('Add at least one medication.'); return; }
    setSaving(true);
    try {
      for (const r of rx) {
        const res = await api.post('/prescriptions', {
          patient_id: patient.id,
          drug_name: `${r.name} ${r.strength}`.trim(),
          dosage: r.dose,
          frequency: r.dose,
          duration_days: parseInt(r.duration_days) || 7,
          instructions: r.instructions,
        });
        await api.post(`/prescriptions/${res.data.id}/sign`);
      }
      setToast({ tone: 'success', title: 'Prescriptions sent to pharmacy queue!' });
      setTimeout(() => navigate('/doctor/dashboard'), 1800);
    } catch (err) {
      console.error(err);
      setToast({ tone: 'danger', title: 'Failed to create prescription. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Consultation · prescription</div>
          <h1 className="type-h1">Prescription — {patient.full_name}</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Search the drug catalogue, add medications, then sign &amp; send to pharmacy.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" icon="save" disabled={saving}>Save draft</Button>
          <Button kind="primary" icon="send" onClick={handleSignAndSend} disabled={saving || rx.length === 0}>Sign &amp; send</Button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <Card padding={0}>
          {/* Drug search bar */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', position: 'relative' }}>
            <Input value={searchQ} placeholder="Search by generic, brand, or ATC code…" leading="search" style={{ width: '100%' }}
              onChange={setSearchQ} />
            {(searchResults.length > 0 || searching) && (
              <div style={{
                position: 'absolute', top: '100%', left: 20, right: 20, zIndex: 99,
                background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 10,
                boxShadow: 'var(--shadow-2)', overflow: 'hidden',
              }}>
                {searching && <div style={{ padding: '12px 16px', color: 'var(--fg-3)', fontSize: 13 }}>Searching…</div>}
                {searchResults.map((d, i) => (
                  <button key={d.id} onClick={() => addDrug(d)} style={{
                    width: '100%', padding: '12px 16px', textAlign: 'left', border: 0,
                    borderTop: i > 0 ? '1px solid var(--border-1)' : 0,
                    background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Icon name="medication" size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <div>
                      <div style={{ font: '500 14px var(--font-sans)', color: 'var(--fg-1)' }}>{d.generic_name} {d.strength}</div>
                      <div style={{ font: '400 12px var(--font-sans)', color: 'var(--fg-3)' }}>{d.brand_name || 'Generic'} · {d.form} · {d.total_quantity ?? 0} in stock</div>
                    </div>
                    <Icon name="add_circle" size={20} style={{ color: 'var(--primary)', marginLeft: 'auto' }} />
                  </button>
                ))}
                {!searching && searchResults.length === 0 && searchQ.trim() && (
                  <div style={{ padding: '12px 16px', color: 'var(--fg-3)', fontSize: 13 }}>No drugs found for "{searchQ}"</div>
                )}
              </div>
            )}
          </div>

          {/* Added medications */}
          <div>
            {rx.length === 0 && (
              <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--fg-3)' }}>
                <Icon name="search" size={36} style={{ marginBottom: 8, opacity: 0.4 }} />
                <div style={{ fontSize: 14 }}>Search for a drug above to add it to this prescription.</div>
              </div>
            )}
            {rx.map((r, i) => (
              <div key={i} style={{ padding: 20, borderBottom: i < rx.length - 1 ? '1px solid var(--border-1)' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="type-h4">{r.name} {r.strength}</div>
                      {r.brand && <Chip tone="neutral">{r.brand}</Chip>}
                    </div>
                    <div className="type-caption" style={{ marginTop: 4 }}>
                      Stock: {r.stock} units · {r.form}
                    </div>
                  </div>
                  <button style={{ border: 0, background: 'transparent', cursor: 'pointer' }} onClick={() => removeRx(i)}>
                    <Icon name="close" size={20} style={{ color: 'var(--fg-3)' }} />
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <Input label="Dose / Frequency" value={r.dose} onChange={v => updateRx(i, 'dose', v)} />
                  <Input label="Duration (days)" value={String(r.duration_days)} onChange={v => updateRx(i, 'duration_days', v)} />
                  <Select label="Route" value={r.route} options={[
                    { value: 'oral', label: 'Oral' }, { value: 'topical', label: 'Topical' }, { value: 'iv', label: 'IV' },
                  ]} onChange={v => updateRx(i, 'route', v)} />
                  <Input label="Quantity" value={`${r.duration_days} ${r.form}`} onChange={() => {}} />
                </div>
                <Textarea label="Instructions to patient" rows={2} value={r.instructions}
                  onChange={v => updateRx(i, 'instructions', v)} style={{ marginTop: 12 }} />
              </div>
            ))}
          </div>
          {rx.length > 0 && (
            <div style={{ padding: 16, background: 'var(--bg-canvas)', borderTop: '1px solid var(--border-1)' }}>
              <Button kind="ghost" icon="add" onClick={() => setSearchQ(' ')}>Add another medication</Button>
            </div>
          )}
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardHeader eyebrow="Summary" title="Prescription" />
            {rx.length === 0 ? (
              <div style={{ color: 'var(--fg-3)', fontSize: 13 }}>No medications added yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {rx.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < rx.length - 1 ? '1px dashed var(--border-1)' : 0 }}>
                    <span className="type-body-s">{r.name} {r.strength}</span>
                    <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{r.dose} × {r.duration_days}d</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <CardHeader eyebrow="Coverage" title="Pharmacy &amp; cost" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="type-body-s">Medications</span>
                <span className="type-mono">{rx.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="type-body-s">Co-pay (employee)</span>
                <span className="type-mono">LKR 0.00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 100 }}>
          <Toast tone={toast.tone} title={toast.title} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. JRISSI DEEP-DIVE
// ============================================================================
export function JrissiDeepDive() {
  const [toast, setToast] = React.useState(null);
  const [report, setReport] = React.useState(null);

  React.useEffect(() => {
    // Assuming patient 1 is A. Perera for this specific screen
    api.get('/jrissi/1')
      .then(res => {
        if (res.data) setReport(res.data);
      })
      .catch(err => console.error("Failed to fetch JRISSI report", err));
  }, []);

  const trend = report?.trend || [38, 42, 51, 49, 55, 58, 62, 60, 64, 68, 71, 73, 76, 78];
  const days = ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '14'];
  const subscores = report?.subscores?.map(s => {
    // Map backend subscore to UI format
    const tone = s.contribution > 0.3 ? 'high' : s.contribution > 0.15 ? 'moderate' : 'low';
    return {
      name: s.label || s.key,
      score: Math.round(s.value * 100),
      tone,
      delta: 'computed',
      signals: [`Weight: ${s.weight}`, `Contribution: ${s.contribution.toFixed(2)}`]
    };
  }) || [
    { name: 'Sleep', score: 82, tone: 'high', delta: '↑ 14 vs baseline', signals: ['<6h sleep · 9 of 14 nights', 'WHOOP recovery <40%'] },
    { name: 'Mood',  score: 71, tone: 'high', delta: '↑ 8',  signals: ['Self-report low · 12/14', 'Meeting overrun pattern'] },
    { name: 'Stress', score: 76, tone: 'high', delta: '↑ 10', signals: ['Calendar density 87%', 'After-hours email +42%'] },
    { name: 'Engagement', score: 38, tone: 'low', delta: '↓ 4', signals: ['Activity logs stable'] },
    { name: 'Social', score: 44, tone: 'moderate', delta: 'stable', signals: ['Team check-ins normal'] },
  ];
  
  const currentScore = report?.current_score || 78;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>JRISSI · Doctor-only</div>
          <h1 className="type-h1">Mental health risk — A. Perera</h1>
          <p className="type-body" style={{ marginTop: 6 }}>14-day score window · signals derived from passive &amp; self-report inputs</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="info" onClick={() => setToast({ tone: 'info', title: 'Methodology guide opened.', description: 'Refer to JRISSI v3 algorithm documentation.' })}>Methodology</Button>
          <Button kind="secondary" icon="download" onClick={() => setToast({ tone: 'success', title: 'Report exported.', description: 'JRISSI report downloaded.' })}>Export</Button>
          <Button kind="danger" icon="forward" onClick={() => setToast({ tone: 'danger', title: 'Escalated to OH.', description: 'Occupational Health notified.' })}>Escalate to OH</Button>
        </div>
      </header>

      <Banner tone="danger" title="JRISSI sustained High for 14 days.">Threshold for escalation is 14 consecutive days ≥ 67. Today is day 14.</Banner>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Current score" title="Composite" />
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
            <JrissiGauge score={currentScore} size={200} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            <Stat label="7-day avg" value={report?.avg_7d || "74"} tone={report?.avg_7d >= 67 ? 'danger' : 'warning'} />
            <Stat label="30-day avg" value={report?.avg_30d || "61"} tone="moderate" />
            <Stat label="Highest" value={report?.highest || "78"} tone={report?.highest >= 67 ? 'danger' : 'warning'} />
            <Stat label="Trend" value={report ? "vs 30d" : "↑ 14"} tone="danger" />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Trend · 14 days" title="Score over time"
            action={<div style={{ display: 'flex', gap: 6 }}><Chip tone="neutral">7 d</Chip><Chip tone="info" dot>14 d</Chip><Chip tone="neutral">30 d</Chip></div>} />
          <LineChart data={trend} width={600} height={220} xLabels={days} yMin={0} yMax={100}
            refLines={[
              { value: 34, label: 'Low threshold', color: 'var(--success)' },
              { value: 67, label: 'High threshold', color: 'var(--danger)' },
            ]} />
        </Card>
      </div>

      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
          <div className="type-eyebrow">Sub-scores</div>
          <div className="type-h3" style={{ marginTop: 2 }}>Component breakdown</div>
        </div>
        <div>
          {subscores.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 90px 1fr 1fr 40px', gap: 16, alignItems: 'center', padding: '14px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
              <div className="type-label" style={{ color: 'var(--fg-1)' }}>{s.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ font: '600 22px var(--font-mono)', color: 'var(--fg-1)' }}>{s.score}</span>
                <Chip tone={s.tone} dot style={{ padding: '2px 8px' }}>{s.tone === 'high' ? 'High' : s.tone === 'moderate' ? 'Mod' : 'Low'}</Chip>
              </div>
              <div>
                <Progress value={s.score} tone={s.tone === 'high' ? 'danger' : s.tone === 'moderate' ? 'warning' : 'success'} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {s.signals.map((sig, j) => <span key={j} className="type-caption">· {sig}</span>)}
              </div>
              <Icon name="chevron_right" size={20} style={{ color: 'var(--fg-3)' }} />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Suggested" title="Closed-loop interventions" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'self_improvement', t: 'Refer to OH psychologist', d: 'Highest score driver: stress + mood. Auto-book within 48 h.', tone: 'danger' },
              { icon: 'event_busy', t: 'Block 1h "deep work" daily', d: 'Recommend calendar protect via HR.', tone: 'warning' },
              { icon: 'bedtime', t: 'Sleep hygiene module', d: 'Push notification to MRAS app this evening.', tone: 'info' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 8, border: '1px solid var(--border-1)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `var(--${s.tone}-bg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <Icon name={s.icon} size={20} style={{ color: `var(--${s.tone})` }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{s.t}</div>
                  <div className="type-caption" style={{ marginTop: 2 }}>{s.d}</div>
                </div>
                <Button kind="secondary" size="sm">Apply</Button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader eyebrow="Escalation timeline" title="Audit trail" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { d: '14 May · 09:30', e: 'Threshold crossed for escalation (14d sustained High).', tone: 'danger' },
              { d: '07 May · 16:12', e: 'Auto-notification sent · self-report wellness module.', tone: 'info' },
              { d: '02 May · 09:00', e: 'JRISSI High first observed (score 71).', tone: 'warning' },
              { d: '14 Apr · 11:00', e: 'Baseline established at 38 (annual check).', tone: 'success' },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: `var(--${e.tone})` }} />
                  {i < 3 && <span style={{ width: 1, flex: 1, background: 'var(--border-1)', marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="type-mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{e.d}</div>
                  <div className="type-body-s" style={{ color: 'var(--fg-1)', marginTop: 2 }}>{e.e}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  const map = { warning: 'var(--warning-fg)', danger: 'var(--danger-fg)', success: 'var(--success-fg)', moderate: 'var(--warning-fg)' };
  return (
    <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
      <div className="type-caption" style={{ marginBottom: 2 }}>{label}</div>
      <div className="type-clinical" style={{ fontSize: 18, color: map[tone] || 'var(--fg-1)' }}>{value}</div>
    </div>
  );
}

// ============================================================================
// 4. PREDICTIVE FORECASTING
// ============================================================================
export function ForecastingView() {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.get('/forecasts').then(res => {
      setForecasts(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const dayLbls = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun', '', 'Tue', '', 'Thu', '', 'Sat', ''];

  if (loading) {
    return <div style={{ padding: 40 }}><Skeleton rows={10} /></div>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Predictive layer · 14-day horizon</div>
          <h1 className="type-h1">Forecasts</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Illness signals 3–14 days ahead. Cross-referenced with employee condition register.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="refresh">Last sync 12 min</Button>
          <Button kind="secondary" icon="settings">Sources</Button>
          <Button kind="primary" icon="campaign">Push pre-emptive alerts</Button>
        </div>
      </header>

      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { l: 'Watch events', v: '2', d: 'Pollen Thu · Heat Sat', tone: 'warning' },
            { l: 'Employees flagged', v: '5', d: '3 allergy · 2 hypertension', tone: 'warning' },
            { l: 'Pre-alerts queued', v: '5', d: 'Awaiting doctor approval', tone: 'info' },
            { l: 'Forecast confidence', v: '0.86', d: 'Above threshold (0.7)', tone: 'success' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '16px 20px', borderRight: i < 3 ? '1px solid var(--border-1)' : 0 }}>
              <div className="type-eyebrow" style={{ marginBottom: 4 }}>{s.l}</div>
              <div className="type-clinical" style={{ fontSize: 26, color: `var(--${s.tone}-fg)`, marginBottom: 4 }}>{s.v}</div>
              <div className="type-caption">{s.d}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {forecasts.map((f, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: f.risk === 'moderate' || f.risk === 'high' ? 'var(--warning-bg)' : 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={f.kind === 'pollen' ? 'cloud' : f.kind === 'heat' ? 'thermostat' : f.kind === 'air_quality' ? 'air' : 'water_drop'} size={24} style={{ color: f.risk === 'moderate' || f.risk === 'high' ? 'var(--warning)' : 'var(--success)' }} />
                </div>
                <div>
                  <div className="type-eyebrow" style={{ marginBottom: 2 }}>{new Date(f.peak_day).toLocaleDateString()} · {f.peak_label}</div>
                  <div className="type-h3">{f.kind.replace('_', ' ').charAt(0).toUpperCase() + f.kind.replace('_', ' ').slice(1)}</div>
                </div>
              </div>
              <Chip tone={f.risk === 'high' ? 'danger' : f.risk === 'moderate' ? 'warning' : 'good'} dot>{f.risk === 'moderate' ? 'Watch' : f.risk === 'high' ? 'Alert' : 'Stable'}</Chip>
            </div>
            <LineChart data={f.series} width={460} height={120} color={f.risk === 'moderate' || f.risk === 'high' ? 'var(--warning)' : 'var(--success)'} xLabels={dayLbls} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--border-1)' }}>
              <div className="type-body-s">
                {f.affected_employees?.length > 0 ? (<>{f.affected_employees.length} employees flagged · {f.related_conditions.join(', ')}</>) : <span style={{ color: 'var(--fg-3)' }}>No employees flagged for this signal.</span>}
              </div>
              {f.affected_employees?.length > 0 && <Button kind="ghost" size="sm" icon="open_in_new">Review</Button>}
            </div>
          </Card>
        ))}
      </div>
      {toast && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 100 }}>
          <Toast tone={toast.tone} title={toast.title} description={toast.description} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 5. JRISSI / AI — workforce mental-health scores + AI predictions (/ai)
// ============================================================================
export function JrissiAiOverview({ onOpenPatient }) {
  const [toast, setToast] = React.useState(null);
  const [stats, setStats] = React.useState({
    workforce_avg_jrissi: 34,
    on_watchlist: 15,
    watchlist_high: 4,
    watchlist_moderate: 11,
    escalations_due: 1,
    escalation_target: 'A. Perera',
    model_confidence: 0.86,
    distribution: { low: 968, moderate: 271, high: 45 },
    avg_trend: [36, 35, 37, 38, 36, 35, 34, 35, 34, 33, 34, 35, 34, 34],
    watchlist_details: [
      { id: 'E-002417', name: 'A. Perera', dept: 'Engineering', jrissi: 78, delta: '+12', days: 14, driver: 'Sleep · Stress', escalate: true },
      { id: 'E-001602', name: 'M. Karunaratne', dept: 'Engineering', jrissi: 66, delta: '+9', days: 6, driver: 'Stress · Mood', escalate: false },
      { id: 'E-002104', name: 'S. Fernando', dept: 'HR', jrissi: 52, delta: '+6', days: 3, driver: 'Mood', escalate: false },
      { id: 'E-001890', name: 'P. Jayasinghe', dept: 'Operations', jrissi: 44, delta: '+2', days: 2, driver: 'Sleep', escalate: false },
    ]
  });
  const trendDays = ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '14'];
  const [predictions, setPredictions] = React.useState([
    { icon: 'psychology', tone: 'danger', conf: 0.91, title: 'A. Perera likely to breach escalation threshold today', body: '14-day sustained High projected to continue. Recommend OH referral within 48 h.', when: 'Now', pid: 'E-002417' },
    { icon: 'groups', tone: 'warning', conf: 0.84, title: 'Engineering team stress rising into sprint deadline', body: '3 employees trending toward Moderate. Suggest workload check-in with team lead.', when: 'This week' },
    { icon: 'cloud', tone: 'warning', conf: 0.86, title: 'Pollen peak Thursday — 3 allergy-history employees', body: 'Cross-referenced with JRISSI: 1 also shows elevated stress. Monitor closely.', when: 'Thu 14' },
    { icon: 'bedtime', tone: 'info', conf: 0.78, title: 'Sleep-debt cluster in night-shift cohort', body: '6 employees averaging <6 h. Push sleep-hygiene module proactively.', when: '3–5 days' },
  ]);

  React.useEffect(() => {
    api.get('/interventions/suggested')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPredictions(res.data);
        }
      })
      .catch(err => console.error("Failed to fetch AI interventions", err));

    api.get('/jrissi/stats')
      .then(res => {
        if (res.data) setStats(res.data);
      })
      .catch(err => console.error("Failed to fetch JRISSI stats", err));
  }, []);

  const handlePushInterventions = async () => {
    try {
      await api.post('/interventions/push', predictions);
      setToast({ tone: 'success', title: 'Interventions pushed.', description: `Sent ${predictions.length} interventions to workforce.` });
    } catch (err) {
      setToast({ tone: 'danger', title: 'Failed.', description: 'Could not push interventions.' });
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>JRISSI / AI · doctor-only · workforce</div>
          <h1 className="type-h1">Mental health &amp; AI predictions</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Population-level JRISSI signal with the predictive model\u2019s next-best-actions. 4 employees on the watchlist · 1 escalation due.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="info" onClick={() => setToast({ tone: 'info', title: 'Model card opened.', description: 'Viewing JRISSI model v3 parameters.' })}>Model card</Button>
          <Button kind="secondary" icon="download" onClick={() => setToast({ tone: 'success', title: 'Exported.', description: 'Workforce report downloaded.' })}>Export</Button>
          <Button kind="primary" icon="campaign" onClick={handlePushInterventions}>Push interventions</Button>
        </div>
      </header>

      {/* Model status strip */}
      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {[
            { l: 'Workforce avg JRISSI', v: stats.workforce_avg_jrissi, d: 'vs last 30d', tone: 'success', icon: 'monitoring' },
            { l: 'On watchlist', v: stats.on_watchlist, d: `${stats.watchlist_high} High · ${stats.watchlist_moderate} Moderate`, tone: 'warning', icon: 'visibility' },
            { l: 'Escalations due', v: stats.escalations_due, d: stats.escalation_target ? `${stats.escalation_target} · 14d` : 'None', tone: stats.escalations_due > 0 ? 'danger' : 'success', icon: 'priority_high' },
            { l: 'Model confidence', v: stats.model_confidence, d: 'Above threshold 0.70', tone: 'success', icon: 'auto_awesome' },
            { l: 'Last inference', v: 'Just now', d: 'cadence synced', tone: 'info', icon: 'schedule' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '16px 18px', borderRight: i < 4 ? '1px solid var(--border-1)' : 0 }}>
              <div className="type-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Icon name={s.icon} size={20} style={{ color: 'var(--primary)', fontSize: 16 }} />{s.l}
              </div>
              <div className="type-clinical" style={{ fontSize: 26, color: `var(--${s.tone}-fg)`, marginBottom: 2 }}>{s.v}</div>
              <div className="type-caption">{s.d}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* AI predictions feed */}
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="type-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="auto_awesome" size={20} style={{ color: 'var(--primary)', fontSize: 15 }} />Predictive model
              </div>
              <div className="type-h3" style={{ marginTop: 2 }}>Next-best-actions</div>
            </div>
            <Chip tone="info" dot>4 active</Chip>
          </div>
          <div>
            {predictions.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `var(--${p.tone}-bg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <Icon name={p.icon} size={24} style={{ color: `var(--${p.tone})` }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                    <span className="type-label" style={{ color: 'var(--fg-1)' }}>{p.title}</span>
                    <span className="type-caption" style={{ flex: '0 0 auto' }}>{p.when}</span>
                  </div>
                  <div className="type-body-s" style={{ marginTop: 4 }}>{p.body}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, maxWidth: 180 }}>
                      <span className="type-caption" style={{ flex: '0 0 auto' }}>Confidence</span>
                      <div style={{ flex: 1, height: 5, borderRadius: 999, background: 'var(--bg-hover)', overflow: 'hidden' }}>
                        <div style={{ width: `${p.conf * 100}%`, height: '100%', background: `var(--${p.tone})`, borderRadius: 999 }} />
                      </div>
                      <span className="type-mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{p.conf.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                      <Button kind="ghost" size="sm">Dismiss</Button>
                      <Button kind="secondary" size="sm" icon={p.pid ? 'open_in_new' : 'check'}
                        onClick={() => p.pid && onOpenPatient && onOpenPatient(p.pid)}>
                        {p.pid ? 'Open record' : 'Apply'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right rail: distribution + trend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card>
            <CardHeader eyebrow="Workforce · today" title="JRISSI distribution" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Donut size={120} thickness={16} segments={[
                { value: stats.distribution.low, color: 'var(--risk-low)' },
                { value: stats.distribution.moderate, color: 'var(--risk-moderate)' },
                { value: stats.distribution.high, color: 'var(--risk-high)' },
              ]} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {[
                  { c: 'var(--risk-low)', l: 'Low', v: stats.distribution.low, p: Math.round((stats.distribution.low / ((stats.distribution.low + stats.distribution.moderate + stats.distribution.high) || 1)) * 100) + '%' },
                  { c: 'var(--risk-moderate)', l: 'Moderate', v: stats.distribution.moderate, p: Math.round((stats.distribution.moderate / ((stats.distribution.low + stats.distribution.moderate + stats.distribution.high) || 1)) * 100) + '%' },
                  { c: 'var(--risk-high)', l: 'High', v: stats.distribution.high, p: Math.round((stats.distribution.high / ((stats.distribution.low + stats.distribution.moderate + stats.distribution.high) || 1)) * 100) + '%' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: r.c }} />
                    <span className="type-body-s" style={{ flex: 1, color: 'var(--fg-2)' }}>{r.l}</span>
                    <span className="type-mono" style={{ color: 'var(--fg-1)' }}>{r.v}</span>
                    <span className="type-caption" style={{ width: 36, textAlign: 'right' }}>{r.p}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader eyebrow="14-day" title="Avg score trend"
              action={<Chip tone="success" dot>Stable</Chip>} />
            <LineChart data={stats.avg_trend} width={420} height={150} xLabels={trendDays} yMin={0} yMax={100}
              refLines={[{ value: 34, label: 'Low threshold', color: 'var(--success)' }]} />
          </Card>
        </div>
      </div>

      {/* Watchlist table */}
      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="type-eyebrow">Doctor-only</div>
            <div className="type-h3" style={{ marginTop: 2 }}>JRISSI watchlist · AI-ranked</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Chip tone="high" dot>High · {stats.watchlist_high}</Chip>
            <Chip tone="moderate" dot>Moderate · {stats.watchlist_moderate}</Chip>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              {['Employee', 'JRISSI', '14d', 'Δ', 'Sustained', 'Top drivers (AI)', ''].map((h, i) => (
                <th key={i} style={{ font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--fg-3)', textAlign: i === 1 || i === 3 ? 'right' : 'left', padding: '12px 16px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-canvas)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.watchlist_details.map((p, i) => {
              const tone = p.jrissi < 34 ? 'low' : p.jrissi < 67 ? 'moderate' : 'high';
              const spark = [p.jrissi - 18, p.jrissi - 14, p.jrissi - 12, p.jrissi - 9, p.jrissi - 6, p.jrissi - 3, p.jrissi];
              return (
                <tr key={i} onClick={() => onOpenPatient && onOpenPatient(p.id)} style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={p.name} size={30} color="var(--slate-500)" />
                      <div>
                        <div className="type-label" style={{ color: 'var(--fg-1)' }}>{p.name}</div>
                        <div className="type-caption">{p.id} · {p.dept}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ font: '600 16px var(--font-mono)', color: 'var(--fg-1)' }}>{p.jrissi}</span>
                      <Chip tone={tone} dot style={{ padding: '2px 8px' }}>{tone === 'high' ? 'High' : tone === 'moderate' ? 'Mod' : 'Low'}</Chip>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)' }}>
                    <Sparkline data={spark} width={80} height={26} color={tone === 'high' ? 'var(--danger)' : tone === 'moderate' ? 'var(--warning)' : 'var(--success)'} />
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)', textAlign: 'right' }}>
                    <span className="type-mono" style={{ color: 'var(--danger-fg)' }}>↑ {p.delta.replace('+', '')}</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)' }}>
                    <span className="type-mono" style={{ color: p.days >= 14 ? 'var(--danger-fg)' : 'var(--fg-2)' }}>{p.days} d</span>
                    {p.days >= 14 && <Chip tone="danger" style={{ padding: '2px 8px', marginLeft: 6 }}>Escalate</Chip>}
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)' }}>
                    <span className="type-body-s" style={{ color: 'var(--fg-2)' }}>{p.driver}</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-1)' }}>
                    <Icon name="chevron_right" size={20} style={{ color: 'var(--fg-3)' }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {toast && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 100 }}>
          <Toast tone={toast.tone} title={toast.title} description={toast.description} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}


