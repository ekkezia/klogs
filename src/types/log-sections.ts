// Types for the section-based log post layout.
// Mirrors the Sanity schema in klogs-cms (schemaTypes/objects/sections.ts).

export type TPortableText = any[]

export type TAsset = {
  url?: string | null
  dims?: { width: number; height: number; aspectRatio: number } | null
  alt?: string | null
  caption?: string | null
}

export type TFact = { _key?: string; label: string; value: string }
export type TCredit = { _key?: string; role?: string; name: string; url?: string | null }

export type TMediaItem =
  | ({ _key: string; _type: "image" } & TAsset)
  | { _key: string; _type: "videoLink"; url: string; caption?: string | null }
  | { _key: string; _type: "videoFile"; fileUrl: string; caption?: string | null; poster?: TAsset | null }

export type TMediaLayout = "full" | "grid2" | "grid3" | "strip" | "stack"

export type TBlock =
  | { _key: string; _type: "textBlock"; content: TPortableText }
  | { _key: string; _type: "mediaBlock"; layout?: TMediaLayout; items: TMediaItem[]; caption?: string | null }
  | { _key: string; _type: "quotesBlock"; quotes: { _key: string; text: string; source?: string | null }[] }
  | { _key: string; _type: "insightsBlock"; items: { _key: string; title: string; text?: string | null }[] }
  | { _key: string; _type: "factsBlock"; items: TFact[] }
  | {
      _key: string
      _type: "cardsBlock"
      columns?: 2 | 3 | 4
      items: { _key: string; image?: TAsset | null; title: string; subtitle?: string | null; text?: string | null; linkLabel?: string | null; url?: string | null }[]
    }
  | { _key: string; _type: "chipsBlock"; label?: string | null; items: string[] }
  | { _key: string; _type: "paletteBlock"; colors: { _key: string; hex: string; name?: string | null }[] }
  | { _key: string; _type: "codeBlock"; filename?: string | null; language?: string | null; code: string; caption?: string | null; highlightLines?: string | null }
  | {
      _key: string
      _type: "annotatedImageBlock"
      image: TAsset
      caption?: string | null
      pins: { _key: string; x: number; y: number; title: string; note?: string | null; zoom?: number | null }[]
    }
  | { _key: string; _type: "modelBlock"; fileUrl: string; poster?: TAsset | null; caption?: string | null; autoRotate?: boolean | null }
  | { _key: string; _type: "embedBlock"; url: string; caption?: string | null; aspect?: "16:9" | "4:3" | "1:1" | "9:16" | null }

export type TSection = {
  _key: string
  title: string
  subsection?: boolean | null
  intro?: string | null
  blocks?: TBlock[] | null
}

export type TLogPost = {
  lede?: string | null
  facts?: TFact[] | null
  sections?: TSection[] | null
  credits?: TCredit[] | null
}

// GROQ projection for the post-only fields. Dereferences every asset so components
// get plain URLs + dimensions.
const asset = `{..., "url": asset->url, "dims": asset->metadata.dimensions}`
export const LOG_POST_FIELDS = `
    lede,
    facts,
    credits,
    sections[]{
      ...,
      blocks[]{
        ...,
        _type == "mediaBlock" => {
          ...,
          items[]{
            ...,
            _type == "image" => ${asset},
            _type == "videoFile" => {..., "fileUrl": file.asset->url, "poster": poster${asset}}
          }
        },
        _type == "cardsBlock" => {..., items[]{..., "image": image${asset}}},
        _type == "annotatedImageBlock" => {..., "image": image${asset}},
        _type == "modelBlock" => {..., "fileUrl": file.asset->url, "poster": poster${asset}}
      }
    }`
