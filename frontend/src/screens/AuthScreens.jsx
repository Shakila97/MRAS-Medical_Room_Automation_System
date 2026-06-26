/* eslint-disable */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
// ============================================================================
// LOGIN
// ============================================================================
export function MrasLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const ROLE_ROUTES = {
    doctor:         '/doctor/dashboard',
    employee:       '/employee/home',
    pharmacy_staff: '/pharmacy/dashboard',
    admin:          '/admin/console',
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      const role = data.user?.role;
      const destination = ROLE_ROUTES[role] || '/employee/home';
      navigate(destination, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Invalid email or password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%', minHeight: 720, background: 'var(--bg-canvas)' }}>
      {/* Marketing panel */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, var(--teal-700) 0%, var(--teal-900) 70%, #062321 100%)',
        color: '#fff', padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="lg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" stroke="white" strokeWidth="0.5" fill="none" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#lg)" />
        </svg>
        <div style={{ position: 'absolute', right: -100, top: -100, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 65%)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={(window.__resources&&window.__resources.mrasMark)||"assets/mras-mark.svg"} alt="" style={{ height: 32, filter: 'brightness(0) invert(1)' }} />
          <img src={(window.__resources&&window.__resources.mrasWordmark)||"assets/mras-wordmark.svg"} alt="MRAS" style={{ height: 22, filter: 'brightness(0) invert(1)' }} />
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ font: '700 12px var(--font-mono)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal-300)' }}>Predict. Prevent. Personalise.</div>
          <h1 style={{ font: '600 44px var(--font-sans)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
            Welcome back.
          </h1>
          <p style={{ font: '400 17px var(--font-sans)', lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', maxWidth: 440, margin: 0 }}>
            Sign in to access the medical room console. Your role determines what you\u2019ll see — patient records, prescriptions, inventory or analytics.
          </p>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { i: 'shield', t: 'PHI-grade encryption · audit-logged' },
            { i: 'support_agent', t: '24/7 on-site clinical support' },
            { i: 'psychology', t: 'JRISSI early-warning system live' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={r.i} size={20} style={{ color: 'var(--teal-300)' }} />
              </div>
              <span style={{ font: '400 13px var(--font-sans)', color: 'rgba(255,255,255,0.85)' }}>{r.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 64px' }}>
        <div style={{ maxWidth: 380, width: '100%', margin: '0 auto' }}>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Account</div>
          <h2 className="type-h1" style={{ marginBottom: 8 }}>Sign in</h2>
          <p className="type-body" style={{ marginBottom: 28 }}>Use your corporate email. Single sign-on is enabled organisation-wide.</p>

          <Button kind="secondary" icon="login" style={{ width: '100%', justifyContent: 'center', marginBottom: 16, height: 44 }}>
            Continue with corporate SSO
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <span style={{ flex: 1, height: 1, background: 'var(--border-1)' }} />
            <span className="type-caption">or with email</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border-1)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} onKeyDown={handleKeyDown}>
            <Input label="Work email" value={email} onChange={setEmail} leading="mail" placeholder="you@company.com" />
            <Input label="Password" value={password} onChange={setPassword} leading="lock" trailing="visibility" type="password" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Toggle checked={remember} onChange={setRemember} label="Keep me signed in" />
              <a href="#" style={{ font: '500 13px var(--font-sans)', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--danger-tint, #fef2f2)', border: '1px solid var(--danger, #ef4444)', color: 'var(--danger, #dc2626)', font: '500 13px var(--font-sans)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="error" size={16} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}
            <Button kind="primary" size="lg" icon={loading ? undefined : 'arrow_forward'} onClick={handleLogin} disabled={loading} style={{ width: '100%', justifyContent: 'center', height: 44, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Button kind="secondary" icon="person_add" onClick={() => navigate('/signup')} style={{ width: '100%', justifyContent: 'center', height: 44 }}>
              Create an account
            </Button>
            <div className="type-body-s" style={{ textAlign: 'center', color: 'var(--fg-3)' }}>
              New employee? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Sign up here</Link>
            </div>
          </div>

          <div style={{ marginTop: 36, paddingTop: 20, borderTop: '1px dashed var(--border-1)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="type-caption">MRAS v3.0.4 · build 2026-05-12</span>
            <a href="#" style={{ font: '400 12px var(--font-sans)', color: 'var(--fg-3)', textDecoration: 'none' }}>Status · Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SIGN UP (create account)
// ============================================================================
export function MrasSignUp() {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [agree, setAgree] = React.useState(false);

  // Live validation
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const checks = [
    { label: 'At least 8 characters', ok: pw.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(pw) },
    { label: 'One number', ok: /\d/.test(pw) },
    { label: 'One symbol', ok: /[^A-Za-z0-9]/.test(pw) },
  ];
  const strength = checks.filter(c => c.ok).length;
  const strengthMeta = [
    { l: 'Too weak', c: 'var(--danger)' },
    { l: 'Weak', c: 'var(--danger)' },
    { l: 'Fair', c: 'var(--warning)' },
    { l: 'Good', c: 'var(--warning)' },
    { l: 'Strong', c: 'var(--success)' },
  ][strength];
  const match = confirm.length > 0 && pw === confirm;
  const canSubmit = first && last && emailValid && strength === 4 && match && agree;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%', minHeight: 720, background: 'var(--bg-canvas)' }}>
      {/* Marketing panel */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, var(--teal-700) 0%, var(--teal-900) 70%, #062321 100%)',
        color: '#fff', padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.07 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="sg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" stroke="white" strokeWidth="0.5" fill="none" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#sg)" />
        </svg>
        <div style={{ position: 'absolute', right: -100, top: -100, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 65%)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={(window.__resources&&window.__resources.mrasMark)||"assets/mras-mark.svg"} alt="" style={{ height: 32, filter: 'brightness(0) invert(1)' }} />
          <img src={(window.__resources&&window.__resources.mrasWordmark)||"assets/mras-wordmark.svg"} alt="MRAS" style={{ height: 22, filter: 'brightness(0) invert(1)' }} />
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ font: '700 12px var(--font-mono)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal-300)' }}>Predict. Prevent. Personalise.</div>
          <h1 style={{ font: '600 44px var(--font-sans)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
            Create your account.
          </h1>
          <p style={{ font: '400 17px var(--font-sans)', lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', maxWidth: 440, margin: 0 }}>
            Join the medical room platform. Your wellness home, appointments and health timeline come together in one place.
          </p>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { i: 'verified_user', t: 'Your data stays on-site &amp; encrypted' },
            { i: 'monitor_heart', t: 'Connect a wearable for richer insights' },
            { i: 'qr_code_2', t: 'Skip the desk — QR check-in at the kiosk' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={r.i} size={20} style={{ color: 'var(--teal-300)' }} />
              </div>
              <span style={{ font: '400 13px var(--font-sans)', color: 'rgba(255,255,255,0.85)' }} dangerouslySetInnerHTML={{ __html: r.t }} />
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 64px', overflow: 'auto' }}>
        <div style={{ maxWidth: 400, width: '100%', margin: '0 auto' }}>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Get started</div>
          <h2 className="type-h1" style={{ marginBottom: 8 }}>Create account</h2>
          <p className="type-body" style={{ marginBottom: 24 }}>Already registered? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Sign in</a></p>

          <Button kind="secondary" icon="badge" style={{ width: '100%', justifyContent: 'center', marginBottom: 16, height: 44 }}>
            Sign up with corporate SSO
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
            <span style={{ flex: 1, height: 1, background: 'var(--border-1)' }} />
            <span className="type-caption">or with email</span>
            <span style={{ flex: 1, height: 1, background: 'var(--border-1)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Input label="First name" value={first} onChange={setFirst} placeholder="Bandara" required />
              <Input label="Last name" value={last} onChange={setLast} placeholder="Karunaratne" required />
            </div>
            <Input label="Work email" value={email} onChange={setEmail} leading="mail" placeholder="you@company.com"
              required error={email.length > 0 && !emailValid ? 'Enter a valid email address' : ''} />

            <div>
              <Input label="Password" value={pw} onChange={setPw} leading="lock" trailing="visibility" type="password" required />
              {pw.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ flex: 1, display: 'flex', gap: 4 }}>
                      {[0, 1, 2, 3].map(i => (
                        <span key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < strength ? strengthMeta.c : 'var(--bg-hover)', transition: 'background var(--dur-fast) var(--ease-std)' }} />
                      ))}
                    </div>
                    <span style={{ font: '500 11px var(--font-sans)', color: strengthMeta.c, minWidth: 56, textAlign: 'right' }}>{strengthMeta.l}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                    {checks.map((c, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, font: '400 12px var(--font-sans)', color: c.ok ? 'var(--success-fg)' : 'var(--fg-3)' }}>
                        <Icon name={c.ok ? 'check_circle' : 'radio_button_unchecked'} size={20} style={{ fontSize: 14, color: c.ok ? 'var(--success)' : 'var(--fg-4)' }} />
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Input label="Confirm password" value={confirm} onChange={setConfirm} leading="lock" type="password" required
              error={confirm.length > 0 && !match ? 'Passwords don\u2019t match' : ''}
              hint={match ? 'Passwords match' : ''} />

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', marginTop: 2 }}>
              <span style={{ marginTop: 1 }}><Checkbox checked={agree} onChange={setAgree} /></span>
              <span className="type-body-s" style={{ color: 'var(--fg-2)', lineHeight: 1.5 }}>
                I agree to the <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Terms of Service</a> and consent to the processing of my health data under the <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</a>.
              </span>
            </label>

            <Button kind="primary" size="lg" icon="arrow_forward"
              disabled={!canSubmit}
              style={{ width: '100%', justifyContent: 'center', height: 44, marginTop: 4 }}>
              Create account
            </Button>
          </div>

          <div className="type-caption" style={{ textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
            Protected by reCAPTCHA · audit-logged · PHI-grade encryption
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// REGISTER (first-run onboarding for a new employee)
// ============================================================================
export function MrasRegister() {
  const [step, setStep] = React.useState(1);
  const [first, setFirst] = React.useState('Bandara');
  const [last, setLast] = React.useState('Karunaratne');
  const [empId, setEmpId] = React.useState('E-002893');
  const [dept, setDept] = React.useState('engineering');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 720, background: 'var(--bg-canvas)' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: '1px solid var(--border-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={(window.__resources&&window.__resources.mrasWordmark)||"assets/mras-wordmark.svg"} alt="MRAS" style={{ height: 24 }} />
        </div>
        <div className="type-caption">Already have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>Sign in</a></div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '40px 32px' }}>
        <div style={{ width: '100%', maxWidth: 640 }}>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>First-run · onboarding</div>
          <h1 className="type-h1" style={{ marginBottom: 8 }}>Set up your MRAS account</h1>
          <p className="type-body" style={{ marginBottom: 28 }}>This takes a minute. We need a few details to personalise your wellness home and unlock the kiosk QR.</p>

          <div style={{ marginBottom: 32 }}>
            <Stepper current={step} steps={['Identify', 'Wellness baseline', 'Consent', 'Done']} />
          </div>

          <Card>
            {step === 0 && (
              <>
                <CardHeader eyebrow="Step 1 of 4" title="Who are you?" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Input label="First name" value={first} onChange={setFirst} required />
                  <Input label="Last name" value={last} onChange={setLast} required />
                  <Input label="Employee ID" value={empId} onChange={setEmpId} leading="badge" required hint="From your access card" />
                  <Select label="Department" value={dept} onChange={setDept} options={[
                    { value: 'engineering', label: 'Engineering' },
                    { value: 'hr', label: 'Human resources' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'ops', label: 'Operations' },
                    { value: 'sales', label: 'Sales' },
                  ]} required />
                  <Input label="Work email" value="b.karunaratne@corp.lk" leading="mail" disabled hint="Managed by your organisation" onChange={() => {}} />
                  <DateField label="Date of birth" value="1992-03-18" onChange={() => {}} />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <CardHeader eyebrow="Step 2 of 4" title="Wellness baseline"
                  action={<Chip tone="info" dot>Optional</Chip>} />
                <p className="type-body-s" style={{ marginBottom: 16 }}>This helps the predictive layer flag changes that matter to you. You can skip and provide later.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Input label="Height" value="174" trailing="straighten" hint="cm" onChange={() => {}} />
                  <Input label="Weight" value="71" trailing="monitor_weight" hint="kg" onChange={() => {}} />
                  <Select label="Sleep · typical" value="7" options={[
                    { value: '5', label: 'Under 5 h' }, { value: '6', label: '5–6 h' },
                    { value: '7', label: '6–8 h' }, { value: '8', label: 'Over 8 h' },
                  ]} onChange={() => {}} />
                  <Select label="Exercise · frequency" value="2-3" options={[
                    { value: '0', label: 'Rarely' }, { value: '1', label: 'Once / week' },
                    { value: '2-3', label: '2–3 / week' }, { value: '4+', label: '4+ / week' },
                  ]} onChange={() => {}} />
                </div>
                <Textarea label="Known conditions / allergies" rows={3} value="Seasonal allergic rhinitis (pollen). Mild asthma · controlled."
                  hint="Helps the system check prescriptions against your history" onChange={() => {}} />
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader eyebrow="Step 3 of 4" title="Consent &amp; sharing" />
                <Banner tone="info" title="What we ask for, why we ask for it.">
                  Your data stays on-site and encrypted. You can revoke consent any time in Settings → Privacy.
                </Banner>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { l: 'Share consultation history with my on-site doctor', d: 'Required to provide care', force: true },
                    { l: 'Allow predictive forecasting (pollen, heat, flu)', d: 'Pre-emptive alerts for your conditions' },
                    { l: 'Connect a fitness device (WHOOP, Garmin, Fitbit)', d: 'You\u2019ll authorise the integration next' },
                    { l: 'Share aggregated, anonymised data with HR', d: 'Quarterly wellness reports — never individually identifying' },
                    { l: 'Receive a weekly wellness digest', d: 'Mondays 08:00 · email' },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, border: '1px solid var(--border-1)' }}>
                      <Checkbox checked={i < 3 || r.force} onChange={() => {}} />
                      <div style={{ flex: 1 }}>
                        <div className="type-label" style={{ color: 'var(--fg-1)' }}>{r.l}</div>
                        <div className="type-caption" style={{ marginTop: 2 }}>{r.d}</div>
                      </div>
                      {r.force && <Chip tone="neutral" style={{ padding: '2px 8px', fontSize: 11 }}>Required</Chip>}
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ width: 84, height: 84, borderRadius: 24, background: 'var(--success-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon name="check_circle" size={48} style={{ color: 'var(--success)' }} />
                </div>
                <h2 className="type-h2" style={{ marginBottom: 8 }}>You\u2019re all set, Bandara.</h2>
                <p className="type-body" style={{ marginBottom: 24, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                  Your wellness home is ready. Your QR code is on the next screen — keep it handy for kiosk check-ins.
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <Button kind="secondary" icon="qr_code_2">Show my QR</Button>
                  <Button kind="primary" icon="arrow_forward">Open wellness home</Button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--border-1)' }}>
              <Button kind="ghost" icon="arrow_back" onClick={() => setStep(Math.max(0, step - 1))}
                style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>Back</Button>
              {step < 3 ? (
                <Button kind="primary" icon="arrow_forward" onClick={() => setStep(Math.min(3, step + 1))}>
                  {step === 1 ? 'Skip &amp; continue' : 'Continue'}
                </Button>
              ) : null}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


