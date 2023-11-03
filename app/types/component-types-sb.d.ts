import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface AllPostsStoryblok {
  headline?: string;
  intro?: RichtextStoryblok;
  grid?: boolean;
  _uid: string;
  component: "all-posts";
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface AuthorStoryblok {
  avatar?: AssetStoryblok;
  bio?: RichtextStoryblok;
  seo_plugin?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  twitter?: string;
  seo?: SeoStoryblok[];
  grid?: boolean;
  _uid: string;
  component: "author";
  [k: string]: any;
}

export interface CategoryStoryblok {
  seo?: SeoStoryblok[];
  headline?: string;
  image?: AssetStoryblok;
  description?: string;
  grid?: boolean;
  _uid: string;
  component: "category";
  [k: string]: any;
}

export interface CodeBlockStoryblok {
  _uid: string;
  component: "code-block";
  [k: string]: any;
}

export interface ConfigStoryblok {
  header_nav?: NavItemStoryblok[];
  social_items?: SocialItemStoryblok[];
  footer_text?: RichtextStoryblok;
  posts_per_page?: string;
  logo?: AssetStoryblok;
  title?: string;
  _uid: string;
  component: "config";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface ContentStoryblok {
  text?: RichtextStoryblok;
  button?: MultilinkStoryblok;
  _uid: string;
  component: "content";
  [k: string]: any;
}

export interface LastPostsStoryblok {
  headline?: string;
  number_of_posts?: string;
  grid?: boolean;
  _uid: string;
  component: "last-posts";
  [k: string]: any;
}

export interface NavItemStoryblok {
  link?: MultilinkStoryblok;
  label?: string;
  location?: "" | "header" | "footer";
  _uid: string;
  component: "nav-item";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: any[];
  seo?: SeoStoryblok[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PostStoryblok {
  headline?: string;
  image?: AssetStoryblok;
  teaser?: string;
  post_content?: (CodeBlockStoryblok | ContentStoryblok)[];
  author?: StoryblokStory<AuthorStoryblok> | string;
  categories?: (StoryblokStory<CategoryStoryblok> | string)[];
  tags?: (StoryblokStory<TagStoryblok> | string)[];
  seo?: SeoStoryblok[];
  _uid: string;
  component: "post";
  [k: string]: any;
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: AssetStoryblok;
  _uid: string;
  component: "seo";
  [k: string]: any;
}

export interface SocialItemStoryblok {
  name?: string;
  icon?: AssetStoryblok;
  url?: MultilinkStoryblok;
  _uid: string;
  component: "social-item";
  [k: string]: any;
}

export interface TagStoryblok {
  seo?: SeoStoryblok[];
  headline?: string;
  description?: string;
  grid?: boolean;
  _uid: string;
  component: "tag";
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
