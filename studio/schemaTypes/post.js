import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'publishedAt', title: 'Published on', type: 'date', validation: (r) => r.required()}),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One or two sentences shown on the Writing index and in search results.',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(220),
    }),
    defineField({name: 'coverImage', title: 'Cover image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alt text'}]},
      ],
    }),
    defineField({
      name: 'originalUrl',
      title: 'Original URL',
      description: 'Only for posts first published elsewhere, such as Medium.',
      type: 'url',
    }),
  ],
  preview: {select: {title: 'title', date: 'publishedAt'}},
})
