
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  video_url: string | null;
  youtube_url: string | null;
  published_at: string;
}

export const useNewsArticles = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('id, title, summary, content, category, author, image_url, video_url, youtube_url, published_at')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const addArticle = async (article: Omit<NewsArticle, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .insert([article])
        .select();

      if (error) throw error;
      await fetchArticles();
      return data[0];
    } catch (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    refetch: fetchArticles
  };
};
