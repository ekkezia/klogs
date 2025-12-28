import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function sanityImage(source: any) {
  // Handle null or undefined source
  if (!source) {
    return "";
  }

  // Handle case where source is an object but asset is missing or null
  if (source.asset === null || source.asset === undefined) {
    return "";
  }

  // Sanity image builder can handle both reference format (_ref) and expanded format (_id)
  // Check if asset has either _ref or _id
  const hasRef = source.asset._ref !== null && source.asset._ref !== undefined;
  const hasId = source.asset._id !== null && source.asset._id !== undefined;
  
  if (!hasRef && !hasId) {
    return "";
  }

  try {
    // If asset is expanded (has _id), pass the asset directly
    // Otherwise, pass the source object (which has asset with _ref)
    const imageSource = hasId ? source.asset : source;
    return builder.image(imageSource).url();
  } catch (error) {
    console.error("Error building image URL:", error, source);
    return "";
  }
}
