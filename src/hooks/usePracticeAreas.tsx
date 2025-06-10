
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  icon_name: string | null;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export const usePracticeAreas = () => {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPracticeAreas = async () => {
    try {
      const { data, error } = await supabase
        .from('practice_areas' as any)
        .select('*')
        .order('display_order');

      if (error) throw error;
      setPracticeAreas((data as unknown as PracticeArea[]) || []);
    } catch (error) {
      console.error('Error fetching practice areas:', error);
      setPracticeAreas([]);
    } finally {
      setLoading(false);
    }
  };

  const addPracticeArea = async (area: Omit<PracticeArea, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('practice_areas' as any)
        .insert([area])
        .select();

      if (error) throw error;
      await fetchPracticeAreas();
      return data?.[0] as unknown as PracticeArea;
    } catch (error) {
      console.error('Error adding practice area:', error);
      throw error;
    }
  };

  const updatePracticeArea = async (id: string, updates: Partial<Omit<PracticeArea, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('practice_areas' as any)
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchPracticeAreas();
    } catch (error) {
      console.error('Error updating practice area:', error);
      throw error;
    }
  };

  const deletePracticeArea = async (id: string) => {
    try {
      const { error } = await supabase
        .from('practice_areas' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPracticeAreas();
    } catch (error) {
      console.error('Error deleting practice area:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPracticeAreas();
  }, []);

  return {
    practiceAreas,
    loading,
    addPracticeArea,
    updatePracticeArea,
    deletePracticeArea,
    refetch: fetchPracticeAreas
  };
};
