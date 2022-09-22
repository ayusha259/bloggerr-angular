export interface Blog {
  _id: string;
  body: string;
  category: {
    _id: string;
    title: string;
    slug: string;
  };
  cover_image: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  slug: string;
  title: string;
  user: {
    profile: { url: string; public_id: string };
    _id: string;
    name: string;
    username: string;
  };
  likes: any[];
  comments?: any[];
  tags?: any[];
}

export interface NewBlog {
  title: string;
  image_url: string;
  body: string;
  category: string;
}
