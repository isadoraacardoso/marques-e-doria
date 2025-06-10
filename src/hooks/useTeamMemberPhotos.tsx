
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TeamMemberPhoto {
  id: string;
  team_member_id: string;
  photo_url: string;
  alt_text: string | null;
  display_order: number;
  created_at?: string;
}

export const useTeamMemberPhotos = (teamMemberId?: string) => {
  const [photos, setPhotos] = useState<TeamMemberPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    if (!teamMemberId) {
      setPhotos([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('team_member_photos')
        .select('*')
        .eq('team_member_id', teamMemberId)
        .order('display_order');

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching team member photos:', error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = async (photo: Omit<TeamMemberPhoto, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('team_member_photos')
        .insert([photo])
        .select();

      if (error) throw error;
      await fetchPhotos();
      return data[0];
    } catch (error) {
      console.error('Error adding team member photo:', error);
      throw error;
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const { error } = await supabase
        .from('team_member_photos')
        .delete()
        .eq('id', photoId);

      if (error) throw error;
      await fetchPhotos();
    } catch (error) {
      console.error('Error deleting team member photo:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [teamMemberId]);

  return {
    photos,
    loading,
    addPhoto,
    deletePhoto,
    refetch: fetchPhotos
  };
};
