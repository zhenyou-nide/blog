import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(
    posts.filter((post): post is any =>
      slugifyAll(post.data.tags).includes(tag)
    )
  );

export default getPostsByTag;
