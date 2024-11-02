import rss, { rssSchema } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: "Tech Blog by Sergio Majé",
    description: "Blog de tecnología y desarrollo web de Sergio Majé. " +
      "Presentado para la actividad de creación de un blog de la asignatura " +
      "Desarrollo de Aplicaciones en Red de la UNIR.",
    schema: rssSchema,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      link: `/blog/${post.slug}/`,
      pubDate: post.data.date,
    })),
    customData: `<language>es</language>`,
  });
}
