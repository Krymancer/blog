# Blog

I really needed to starting writing something so I figured that a blog would be a good idea.

## Information

I'm using hugo in this, is a nice tool, I can write it in markdown and will generate the website. I never remember the commands so I wrote them here.

Run server locally

> hugo server

Go to the changes

> hugo server --navigateToChanged

Build and deploy

> hugo


## Obsidian configuration

In order to past images in obsidian and using it in the blog posts, we need to obsidian vault be the repo root folder and add this configuration to `.obsidian/app.json`

```json
{
  "attachmentFolderPath": "attachments",
  "useMarkdownLinks": true,
  "newLinkFormat": "absolute"
}
``` 
