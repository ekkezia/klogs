export interface IQueryParams {
  start: number;
  search: string[] | null | RegExpMatchArray;
  tags: string[];
  limit: number;
}

export interface IImageDimensions {
  width: number;
  height: number;
}

export interface IImage {
  name: string;
  size: string;
  dimensions: IImageDimensions;
  format: string;
  url: string;
}

export interface IHeadlinePicture {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      path: null;
      url: string;
    };
    large: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      path: null;
      url: string;
    };
    medium: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      path: null;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      path: null;
      url: string;
    };
  };
}

export interface IArticle {
  pinned: boolean;
  _id: string;
  tags: string[]; // The tags property is an empty object, you might need to specify its structure
  title: string;
  pubdate: string;
  body: string;
  summary: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  headlinePicture: IHeadlinePicture;
  id: string;
}

interface IImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface ILogoFormats {
  thumbnail: IImageFormat;
  medium: IImageFormat;
  small: IImageFormat;
}
export interface ILogo {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: ILogoFormats;
}
export interface IFeaturedArticle {
  _id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  logo: ILogo;
  provider: string;
  related: string[];
  id: string;
}
