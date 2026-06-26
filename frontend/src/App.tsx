import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleLayout } from './RoleLayout.jsx';
import { GlobalAnims } from './primitives.jsx';

// ── Auth screens (eager — small, needed immediately)
import { MrasLogin } from './screens/AuthScreens.jsx';
import { MrasSignUp } from './screens/AuthScreens.jsx';
import { MrasRegister } from './screens/AuthScreens.jsx';

// ── Doctor screens
import { DoctorDashboard } from './screens/DoctorDashboard.jsx';
import { PatientRecord } from './screens/PatientRecord.jsx';
import { SoapEditor, PrescriptionWriter, JrissiDeepDive, ForecastingView, JrissiAiOverview } from './screens/DoctorScreens.jsx';

// ── Employee screens
import { EmployeeHome } from './screens/EmployeeHome.jsx';
import { EmployeeWellness, AppointmentScheduling, KioskCheckIn } from './screens/EmployeeScreens.jsx';

// ── Pharmacy screens
import { PharmacyDashboard } from './screens/PharmacyDashboard.jsx';
import { PharmacyInventory } from './screens/PharmacyInventory.jsx';
import { GrnReceive, ExpiryWatch } from './screens/PharmacyScreens.jsx';

// ── Admin screens
import { AdminDashboard } from './screens/AdminDashboard.jsx';
import { AdminUsers, AuditLog, ReportsAnalytics } from './screens/AdminScreens.jsx';

// ── Shared screens
import {
  NotificationsCenter, SettingsProfile,
  SettingsSecurity, SettingsNotifications,
  SettingsPrivacy, SettingsIntegrations, SettingsPreferences,
} from './screens/SharedScreens.jsx';

// ── Loading fallback
function PageLoading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 300 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          border: '3px solid var(--primary-tint)',
          borderTopColor: 'var(--primary)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ font: '400 13px var(--font-sans)', color: 'var(--fg-3)' }}>Loading…</span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Auth layout wrapper (split-panel, no sidebar)
function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalAnims />
      <Routes>
        {/* Root → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ── Auth ── */}
        <Route path="/login"    element={<AuthLayout><MrasLogin /></AuthLayout>} />
        <Route path="/signup"   element={<AuthLayout><MrasSignUp /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><MrasRegister /></AuthLayout>} />

        {/* ── Doctor ── */}
        <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
        <Route path="/doctor/dashboard"     element={<RoleLayout role="doctor"><DoctorDashboard onOpenPatient={() => {}} /></RoleLayout>} />
        <Route path="/doctor/patients"      element={<RoleLayout role="doctor"><PatientRecord patientId="E-002417" onBack={() => {}} /></RoleLayout>} />
        <Route path="/doctor/consultations" element={<RoleLayout role="doctor"><SoapEditor /></RoleLayout>} />
        <Route path="/doctor/jrissi"        element={<RoleLayout role="doctor"><JrissiDeepDive /></RoleLayout>} />
        <Route path="/doctor/ai"            element={<RoleLayout role="doctor"><JrissiAiOverview onOpenPatient={() => {}} /></RoleLayout>} />
        <Route path="/doctor/forecasts"     element={<RoleLayout role="doctor"><ForecastingView /></RoleLayout>} />
        <Route path="/doctor/reports"       element={<RoleLayout role="doctor"><ReportsAnalytics /></RoleLayout>} />

        {/* ── Employee ── */}
        <Route path="/employee" element={<Navigate to="/employee/home" replace />} />
        <Route path="/employee/home"    element={<RoleLayout role="employee"><EmployeeWellness /></RoleLayout>} />
        <Route path="/employee/checkin" element={<RoleLayout role="employee"><AppointmentScheduling /></RoleLayout>} />
        <Route path="/employee/health"  element={<RoleLayout role="employee"><KioskCheckIn /></RoleLayout>} />
        <Route path="/employee/history" element={<RoleLayout role="employee"><EmployeeHome onCheckIn={() => {}} /></RoleLayout>} />

        {/* ── Pharmacy ── */}
        <Route path="/pharmacy" element={<Navigate to="/pharmacy/dashboard" replace />} />
        <Route path="/pharmacy/dashboard" element={<RoleLayout role="pharmacy"><PharmacyDashboard onOpenInventory={() => {}} /></RoleLayout>} />
        <Route path="/pharmacy/inventory" element={<RoleLayout role="pharmacy"><PharmacyInventory /></RoleLayout>} />
        <Route path="/pharmacy/grn"       element={<RoleLayout role="pharmacy"><GrnReceive /></RoleLayout>} />
        <Route path="/pharmacy/expiry"    element={<RoleLayout role="pharmacy"><ExpiryWatch /></RoleLayout>} />
        <Route path="/pharmacy/reports"   element={<RoleLayout role="pharmacy"><ReportsAnalytics /></RoleLayout>} />

        {/* ── Admin ── */}
        <Route path="/admin" element={<Navigate to="/admin/console" replace />} />
        <Route path="/admin/console"  element={<RoleLayout role="admin"><AdminDashboard /></RoleLayout>} />
        <Route path="/admin/users"    element={<RoleLayout role="admin"><AdminUsers /></RoleLayout>} />
        <Route path="/admin/audit"    element={<RoleLayout role="admin"><AuditLog /></RoleLayout>} />
        <Route path="/admin/services" element={<RoleLayout role="admin"><ReportsAnalytics /></RoleLayout>} />
        <Route path="/admin/settings" element={<RoleLayout role="admin"><SettingsProfile /></RoleLayout>} />

        {/* ── Shared ── */}
        <Route path="/notifications"         element={<RoleLayout role="doctor"><NotificationsCenter /></RoleLayout>} />
        <Route path="/settings"              element={<RoleLayout role="doctor"><SettingsProfile /></RoleLayout>} />
        <Route path="/settings/security"     element={<RoleLayout role="doctor"><SettingsSecurity /></RoleLayout>} />
        <Route path="/settings/notifications" element={<RoleLayout role="doctor"><SettingsNotifications /></RoleLayout>} />
        <Route path="/settings/privacy"      element={<RoleLayout role="doctor"><SettingsPrivacy /></RoleLayout>} />
        <Route path="/settings/integrations" element={<RoleLayout role="doctor"><SettingsIntegrations /></RoleLayout>} />
        <Route path="/settings/preferences"  element={<RoleLayout role="doctor"><SettingsPreferences /></RoleLayout>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
