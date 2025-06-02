import instance from '@/api/axiosIntance';
import { ChevronRightMini } from '@medusajs/icons';
import { createFileRoute, Link, useParams } from '@tanstack/react-router'; // Lấy slug từ URL
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/detailblog/$slug')({
  component: DetailBlog,
});

function DetailBlog() {
  const { slug: categorySlug } = useParams({
    from: '/_layout/detailblog/$slug',
  });
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // State to hold related posts

  useEffect(() => {
    // Gọi API để lấy bài viết theo slug
    const fetchPostDetails = async () => {
      try {
        // Kiểm tra nếu categorySlug là hợp lệ
        if (!categorySlug) {
          setError('Slug không hợp lệ');
          setLoading(false);
          return;
        }

        const response = await instance.get(`/detailblog/${categorySlug}`);

        // Kiểm tra dữ liệu trả về từ API
        if (response.data && response.data.data) {
          setPost(response.data.data);
          // Fetch related posts once the post is loaded
          if (response.data.data.tags) {
            fetchRelatedPosts(response.data.data.tags); // Fetch related posts based on tags
          }
        } else {
          setError('Không tìm thấy bài viết');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải bài viết');
        setLoading(false);
      }
    };

    // Fetch related posts based on the tags of the current post
    const fetchRelatedPosts = async tags => {
      try {
        const response = await instance.get(`/relatedposts/${tags}`);
        if (response.data && response.data.data) {
          // Filter out the current post from related posts
          const filteredRelatedPosts = response.data.data.filter(
            relatedPost => relatedPost.slug !== categorySlug
          );
          setRelatedPosts(filteredRelatedPosts);
        } else {
          setError('Không tìm thấy bài viết liên quan');
        }
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải bài viết liên quan');
      }
    };

    fetchPostDetails();
  }, [categorySlug]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="main-content flex h-48 w-full flex-col items-center justify-center">
        <div className="text-content">
          <div className="text-center text-4xl font-semibold">Blog</div>
          <div className="link caption1 mt-3 flex items-center justify-center gap-1">
            <div className="flex items-center justify-center">
              <Link to="/blog">Blog</Link>
              <ChevronRightMini />
            </div>
            <div className="capitalize text-gray-500">
              <Link to={`/detailblog/${categorySlug}`}>{categorySlug}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-white px-6 py-8 shadow-lg">
        {post && post.title ? (
          <div className="flex flex-col md:flex-row">
            {/* Left Column (Main content with title, image, and description) */}
            <div className="mb-6 flex-1 md:mb-0">
              <h4 className="mb-4 text-center text-3xl font-bold text-gray-800">
                {post.title}
              </h4>

              {post.thumbnail && (
                <img
                  className="mb-6 h-auto w-full transform rounded-lg shadow-md transition-transform duration-300 hover:scale-105 md:w-[400px]"
                  src={post.thumbnail}
                  alt={post.title}
                />
              )}

              <div className="mb-6 text-lg leading-relaxed text-gray-700">
                <p>{post.content}</p>
              </div>
            </div>

            {/* Right Column (Author, Tags, Date - aligned to the right) */}
            <div className="ml-auto flex flex-col items-end">
              <div className="mb-2 text-sm text-gray-600">
                <strong>Thẻ:</strong> {post.tags}
              </div>

              <p className="text-right text-sm text-gray-500">
                <strong>Ngày đăng:</strong>{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div>Bài viết không tồn tại.</div>
        )}

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800">
              Bài viết liên quan
            </h2>
            <ul className="mt-4 space-y-4">
              {relatedPosts.map(relatedPost => (
                <li key={relatedPost.id} className="flex items-center gap-3">
                  <Link
                    to={`/detailblog/${relatedPost.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    {relatedPost.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailBlog;
