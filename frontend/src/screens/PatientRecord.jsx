/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
import { useNavigate, useParams } from 'react-router-dom';

export function PatientRecord({ patientId: propPatientId, onBack }) {
  const navigate = useNavigate();
  const { id: paramPatientId } = useParams();
  const patientId = propPatientId || paramPatientId;

  const [p, setP] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [jrissi, setJrissi] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [briefingText, setBriefingText] = useState("");
  const [briefingStatus, setBriefingStatus] = useState("Loading");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;
    Promise.all([
      api.get(`/patients/${patientId}`),
      api.get(`/consultations/patient/${patientId}`),
      api.get(`/jrissi/${patientId}`).catch(() => ({ data: null })),
      api.get(`/patients/${patientId}/dashboard`).catch(() => ({ data: null }))
    ]).then(([patRes, conRes, jriRes, dashRes]) => {
      setP(patRes.data);
      setConsultations(conRes.data);
      if (jriRes.data) setJrissi(jriRes.data);
      if (dashRes.data) setDashboard(dashRes.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [patientId]);

  useEffect(() => {
    if (!patientId) return;
    let isMounted = true;
    
    async function fetchBriefing() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${api.defaults.baseURL}/briefing/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
          if (isMounted) setBriefingStatus("Failed");
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        setBriefingStatus("Streaming");
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.substring(6);
              if (dataStr === '[DONE]') {
                if (isMounted) setBriefingStatus("Ready");
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.token) {
                  fullText += parsed.token;
                  if (isMounted) setBriefingText(fullText);
                }
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        if (isMounted) setBriefingStatus("Failed");
      }
    }
    
    fetchBriefing();
    return () => { isMounted = false; };
  }, [patientId]);

  if (loading) return <div style={{ padding: 40 }}><Skeleton rows={10} /></div>;
  if (!p) return <ErrorState message="Patient not found" />;

  const sleepTrend  = [7.2, 7.0, 6.8, 6.3, 6.0, 5.5, 5.3, 5.0, 4.8, 5.1, 4.6, 4.4, 4.7, 4.3];
  const stepsTrend  = [9200, 8400, 8800, 7600, 7100, 6800, 6500, 5900, 6200, 5400, 5100, 5700, 4900, 5200];
  const moodTrend   = [4, 4, 3, 3, 3, 2, 2, 3, 2, 2, 1, 2, 1, 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '400 13px var(--font-sans)', color: 'var(--fg-3)' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Patients</a>
        <Icon name="chevron_right" size={20} style={{ fontSize: 14 }} />
        <span style={{ color: 'var(--fg-1)' }}>{p.full_name}</span>
      </div>

      {/* Header */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar name={p.full_name} size={64} color="var(--slate-500)" />
          <div style={{ flex: 1 }}>
            <h1 className="type-h1" style={{ marginBottom: 4 }}>{p.full_name}</h1>
            <div className="type-body-s" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <span><b style={{ color: 'var(--fg-1)' }}>{p.employee_id}</b> · {p.department.charAt(0).toUpperCase() + p.department.slice(1)}</span>
              <span>32 y · {p.gender.charAt(0)} · O+</span>
              <span>Last seen recently</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {jrissi && <Chip tone={jrissi.current_score >= 67 ? "high" : (jrissi.current_score >= 34 ? "warning" : "good")} dot>JRISSI {jrissi.current_score >= 67 ? "High" : (jrissi.current_score >= 34 ? "Elevated" : "Low")} · {jrissi.current_score}</Chip>}
              {p.allergies && <Chip tone="warning" icon="warning">Allergy: {p.allergies}</Chip>}
              {p.medical_conditions && <Chip tone="info">Cond: {p.medical_conditions}</Chip>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button kind="primary" icon="stethoscope" onClick={() => navigate('/doctor/consultations', { state: { patient: p } })}>Start consultation</Button>
            <Button kind="secondary" icon="description">Pre-visit briefing</Button>
          </div>
        </div>
      </Card>

      <Banner tone="danger" title="Auto-escalation triggered.">
        JRISSI score has been ≥ 67 for 14 consecutive days without consultation. Behaviour-correction engine has paused notifications pending clinician review.
      </Banner>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Vitals strip */}
          <Card padding={0}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
              <div className="type-eyebrow">Vital signs · last check-in</div>
              <div className="type-h3" style={{ marginTop: 2 }}>Thu 12 May · 09:14</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {dashboard?.latest_vitals?.map((s, i) => (
                <div key={i} style={{ borderRight: i < dashboard.latest_vitals.length - 1 ? '1px solid var(--border-1)' : 0 }}>
                  <StatTile {...s} />
                </div>
              )) || (
                <div style={{ padding: '20px', color: 'var(--fg-3)', gridColumn: 'span 5', textAlign: 'center' }}>No recent vitals available</div>
              )}
            </div>
          </Card>

          {/* Trends */}
          <Card>
            <CardHeader eyebrow="Longitudinal health · 14 d" title="Trends" action={
              <div style={{ display: 'flex', gap: 4, background: 'var(--slate-100)', borderRadius: 8, padding: 3 }}>
                {['14 d', '30 d', '90 d', '6 mo'].map((t, i) => (
                  <button key={t} style={{
                    border: 0, padding: '4px 10px', borderRadius: 6,
                    font: '500 12px var(--font-sans)', cursor: 'pointer',
                    background: i === 0 ? 'var(--surface-1)' : 'transparent',
                    color: i === 0 ? 'var(--fg-1)' : 'var(--fg-3)',
                    boxShadow: i === 0 ? 'var(--shadow-1)' : 'none',
                  }}>{t}</button>
                ))}
              </div>
            } />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Sleep',  data: dashboard?.sleep_trend || [0,0], suffix: 'h',  cur: dashboard?.sleep_trend ? `${dashboard.sleep_trend[dashboard.sleep_trend.length-1]} h` : '-',  color: 'var(--warning)' },
                { label: 'Steps',  data: dashboard?.steps_trend || [0,0], suffix: '',   cur: dashboard?.steps_trend ? `${dashboard.steps_trend[dashboard.steps_trend.length-1]}` : '-',  color: 'var(--danger)'  },
                { label: 'Mood (self-report)', data: dashboard?.mood_trend || [0,0], suffix: '/5', cur: dashboard?.mood_trend ? `${dashboard.mood_trend[dashboard.mood_trend.length-1]} / 5` : '-', color: 'var(--danger)' },
              ].map((t, i) => (
                <div key={i} style={{ padding: 14, border: '1px solid var(--border-1)', borderRadius: 10 }}>
                  <div className="type-eyebrow">{t.label}</div>
                  <div style={{ font: '500 22px var(--font-mono)', color: 'var(--fg-1)', margin: '4px 0 6px' }}>{t.cur}</div>
                  <Sparkline data={t.data} width={200} height={40} color={t.color} />
                  <div className="type-caption" style={{ marginTop: 4 }}>Down-trending</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Consultations history */}
          <Card padding={0}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="type-h3">Consultations</div>
              <Button kind="ghost" size="sm" icon="add" onClick={() => navigate('/doctor/consultations', { state: { patient: p } })}>New</Button>
            </div>
            {consultations.length > 0 ? consultations.map((c, i) => (
              <div key={c.id} style={{ display: 'flex', gap: 12, padding: '14px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <Icon name="monitor_heart" size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span className="type-label" style={{ color: 'var(--fg-1)' }}>Dr. {c.doctor_id}</span>
                    <span className="type-caption">{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="type-body-s" style={{ marginTop: 4 }}>{c.assessment || "No assessment notes."}</p>
                  {c.plan && <p className="type-body-s" style={{ marginTop: 4, color: 'var(--fg-3)' }}>Plan: {c.plan}</p>}
                </div>
                <Icon name="chevron_right" size={20} style={{ color: 'var(--fg-3)' }} />
              </div>
            )) : (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--fg-3)' }}>No previous consultations.</div>
            )}
          </Card>
        </div>

        {/* Right column: JRISSI + briefing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ background: 'linear-gradient(180deg, var(--surface-1) 0%, var(--surface-1) 100%)' }}>
            <CardHeader eyebrow="Doctor-only" title="JRISSI · mental health" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <JrissiGauge score={jrissi?.current_score || 0} size={140} />
              <div style={{ flex: 1 }}>
                <div className="type-body-s" style={{ marginBottom: 8 }}>
                  {jrissi ? `Score is ${jrissi.trend} vs 30-day baseline. Driving factors:` : 'Loading JRISSI data...'}
                </div>
                {jrissi && jrissi.subscores && (
                  <ul style={{ margin: 0, padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: 4, font: '400 13px var(--font-sans)', color: 'var(--fg-2)' }}>
                    {jrissi.subscores.slice(0, 4).map((sub) => (
                      <li key={sub.key}>{sub.label}: <b style={{ color: 'var(--fg-1)' }}>{(sub.value * 100).toFixed(0)}%</b></li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Button kind="primary" icon="psychology">Open JRISSI detail</Button>
              <Button kind="secondary" icon="forum">Schedule check-in</Button>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="AI · Claude" title="Pre-visit briefing" action={<Chip tone={briefingStatus === "Ready" ? "info" : "neutral"} dot>{briefingStatus}</Chip>} />
            <p className="type-body-s" style={{ lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {briefingText || "Connecting to Claude..."}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button kind="secondary" size="sm" icon="content_copy" onClick={() => navigator.clipboard.writeText(briefingText)}>Copy</Button>
              <Button kind="ghost" size="sm" icon="thumb_up">Useful</Button>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Behaviour-correction" title="Active interventions" />
            {dashboard?.active_interventions?.length > 0 ? dashboard.active_interventions.map((iv, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
                <div>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{iv.name}</div>
                  <div className="type-caption" style={{ marginTop: 2 }}>{iv.state}</div>
                </div>
                <Chip tone={iv.tone} dot>{iv.tone === 'info' ? 'Active' : iv.tone === 'warning' ? 'Watch' : 'Paused'}</Chip>
              </div>
            )) : (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--fg-3)' }}>No active interventions</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}


