type Post = {
  id: string; // Unique identifier for the post
  title: string; // Title of the post
  content: string; // Content of the post
  author: string; // Author of the post
  tags: string[]; // Array of tags for the post
  thumbnail: string; // URL to the post's thumbnail image
  slug: string; // Slug for the post, typically used for SEO-friendly URLs
  createdAt: string; // Date when the post was created, ISO string format
  updatedAt: string; // Date when the post was last updated, ISO string format
};

type PostParams = {
  page?: number; // Page number for pagination (optional)
  limit?: number; // Number of items per page (optional)
  isActive?: boolean; // Whether the post is active (optional)
  search?: string; // Search query to filter posts (optional)
};

type MetaData = {
  totalItems: number; // Total number of items (posts)
  totalPages: number; // Total number of pages
  currentPage: number; // Current page number
  pageSize: number; // Number of items per page
};