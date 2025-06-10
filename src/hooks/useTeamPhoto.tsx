
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TeamPhoto {
  id: string;
  photo_url: string;
  alt_text: string | null;
  created_at?: string;
  updated_at?: string;
}

export const useTeamPhoto = () => {
  const [teamPhoto, setTeamPhoto] = useState<TeamPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTeamPhoto = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_photo')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found - this is expected for a new install
          setTeamPhoto(null);
        } else {
          console.error('Error fetching team photo:', error);
          setTeamPhoto(null);
        }
      } else {
        setTeamPhoto(data as TeamPhoto);
      }
    } catch (error) {
      console.error('Error fetching team photo:', error);
      setTeamPhoto(null);
    } finally {
      setLoading(false);
    }
  };

  const updateTeamPhoto = async (photo: Omit<TeamPhoto, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('team_photo')
        .upsert({
          id: 'team-photo',
          ...photo,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating team photo:', error);
        throw error;
      }
      
      if (data) {
        setTeamPhoto(data as TeamPhoto);
      }
      return data;
    } catch (error) {
      console.error('Error updating team photo:', error);
      throw error;
    }
  };

  const deleteTeamPhoto = async () => {
    if (!teamPhoto) return;
    
    try {
      const { error } = await supabase
        .from('team_photo')
        .delete()
        .eq('id', teamPhoto.id);

      if (error) {
        console.error('Error deleting team photo:', error);
        throw error;
      }
      
      setTeamPhoto(null);
    } catch (error) {
      console.error('Error deleting team photo:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTeamPhoto();
  }, []);

  return {
    teamPhoto,
    loading,
    updateTeamPhoto,
    deleteTeamPhoto,
    refetch: fetchTeamPhoto
  };
};
