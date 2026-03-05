import { defineType, defineField } from "sanity"

export const artworkSchema = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2024" — leave blank if unknown',
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      description: 'e.g. "Oil on canvas"',
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: 'e.g. "60 × 80 cm"',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Paintings", value: "paintings" },
          { title: "Bathroom Series", value: "bathroom" },
          { title: "Sketches", value: "sketches" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio (width ÷ height)",
      type: "number",
      description:
        "e.g. 0.75 for portrait, 1.33 for landscape. Calculate: image width divided by image height.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in the gallery",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "category",
    },
  },
})
