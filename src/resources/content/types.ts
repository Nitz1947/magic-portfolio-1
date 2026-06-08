import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

export type LocaleContent = {
  person: Person;
  social: Social;
  newsletter: Newsletter;
  home: Home;
  about: About;
  blog: Blog;
  work: Work;
  gallery: Gallery;
};
