import { useState, useEffect, useCallback } from 'react';
import { StormDocumentation } from '../types';
import { databaseService } from '../services/database';

interface UseStormDocumentationReturn {
  storms: StormDocumentation[];
  loading: boolean;
  error: string | null;
  addStorm: (storm: StormDocumentation) => Promise<void>;
  deleteStorm: (id: string) => Promise<void>;
  refreshStorms: () => Promise<void>;
}

export const useStormDocumentation = (): UseStormDocumentationReturn => {
  const [storms, setStorms] = useState<StormDocumentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStorms = useCallback(async () => {
    try {
      setError(null);
      const stormData = await databaseService.getAllStormDocumentations();
      setStorms(stormData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch storm data';
      setError(errorMessage);
    }
  }, []);

  const addStorm = useCallback(async (storm: StormDocumentation) => {
    try {
      setError(null);
      await databaseService.saveStormDocumentation(storm);
      await fetchStorms(); // Refresh the list
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save storm data';
      setError(errorMessage);
      throw err;
    }
  }, [fetchStorms]);

  const deleteStorm = useCallback(async (id: string) => {
    try {
      setError(null);
      await databaseService.deleteStormDocumentation(id);
      setStorms(prev => prev.filter(storm => storm.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete storm data';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const refreshStorms = useCallback(async () => {
    setLoading(true);
    try {
      await fetchStorms();
    } finally {
      setLoading(false);
    }
  }, [fetchStorms]);

  useEffect(() => {
    const initializeDatabase = async () => {
      setLoading(true);
      try {
        await databaseService.initDatabase();
        await fetchStorms();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize database';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initializeDatabase();
  }, [fetchStorms]);

  return {
    storms,
    loading,
    error,
    addStorm,
    deleteStorm,
    refreshStorms,
  };
}; 