import { api } from '../client';
import { useState, useCallback } from 'react';

// Simplified hook without React Query for now, just to show the pattern
export function useConsultation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createDraft = useCallback(async (patientId: number, vitals?: any) => {
    setLoading(true);
    try {
      const { data } = await api.post('/consultations/', {
        patient_id: patientId,
        vitals
      });
      return data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveDraft = useCallback(async (consultId: number, updateData: any) => {
    try {
      const { data } = await api.patch(`/consultations/${consultId}`, updateData);
      return data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  }, []);

  const signConsultation = useCallback(async (consultId: number) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/consultations/${consultId}/sign`);
      return data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createDraft,
    saveDraft,
    signConsultation,
    loading,
    error
  };
}
