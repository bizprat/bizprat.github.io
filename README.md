# prateekanand.com

Personal portfolio website for Prateek Anand — solopreneur building AI-powered products.

Hosted on [prateekanand.com](https://prateekanand.com) via GitHub Pages.

## Adding Projects

Edit `data/projects.json` and add a new entry to the `projects` array:

```json
{
  "id": "project-slug",
  "title": "Project Name",
  "description": "Short description of what it does.",
  "icon": "🤖",
  "tags": ["React", "AI"],
  "links": {
    "live": "https://example.com",
    "source": "https://github.com/bizprat/repo"
  },
  "featured": true,
  "order": 1
}
```

Both `links.live` and `links.source` are optional. Lower `order` values appear first.
