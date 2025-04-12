export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  status: 'draft' | 'published';
  order: number;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
