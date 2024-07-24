/* eslint-disable import/prefer-default-export */
export interface Opening {
  id: string;
  category: string;
  priority: number;
  url: string;
  title: string;
  description: string;
  summary?: string;
}

// export async function getAllOpenings() {
//   const res = await fetch(`${API_URL}/openings`);
//   const openings = await res.json();

//   openings.forEach((opening: Opening) => {
//     opening.url = `${API_URL}/${opening.url}`;
//     opening.title = opening.title;
//     opening.description = opening.description;
//   });

//   return openings;
// }
