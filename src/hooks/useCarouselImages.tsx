
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CarouselImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export const useCarouselImages = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCarouselImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setCarouselImages(data || []);
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCarouselImage = async (image: Omit<CarouselImage, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .insert([image])
        .select();

      if (error) throw error;
      await fetchCarouselImages();
      return data[0];
    } catch (error) {
      console.error('Error adding carousel image:', error);
      throw error;
    }
  };

  const updateCarouselImage = async (id: string, updates: Partial<Omit<CarouselImage, 'id' | 'created_at'>>) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchCarouselImages();
    } catch (error) {
      console.error('Error updating carousel image:', error);
      throw error;
    }
  };

  const deleteCarouselImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCarouselImages();
    } catch (error) {
      console.error('Error deleting carousel image:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  return {
    carouselImages,
    loading,
    addCarouselImage,
    updateCarouselImage,
    deleteCarouselImage,
    refetch: fetchCarouselImages
  };
};
