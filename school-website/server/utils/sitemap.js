const News = require('../models/News');

module.exports = async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://vidyavihar.edu.in';
    const news = await News.find({ isPublished: true }).select('slug updatedAt').lean();

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/about', priority: '0.9', changefreq: 'monthly' },
      { url: '/academics', priority: '0.9', changefreq: 'monthly' },
      { url: '/admissions', priority: '1.0', changefreq: 'weekly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/transport', priority: '0.7', changefreq: 'monthly' },
      { url: '/hostel', priority: '0.7', changefreq: 'monthly' },
      { url: '/gallery', priority: '0.6', changefreq: 'monthly' },
      { url: '/news', priority: '0.8', changefreq: 'daily' },
    ];

    const staticUrls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

    const newsUrls = news.map(n => `
  <url>
    <loc>${baseUrl}/news/${n.slug}</loc>
    <lastmod>${new Date(n.updatedAt).toISOString()}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.5</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${newsUrls}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
};
