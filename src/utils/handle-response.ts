// import { z } from 'zod';

// export async function handleResponse<
//   T extends z.ZodTypeAny,
//   E extends z.ZodTypeAny
// >(
//   res: Response,
//   schema: T | z.ZodTypeAny = z.any(),
//   errorSchema: E | z.ZodTypeAny = z.any()
// ): Promise<
//   | { success: false; error: string | z.infer<E> }
//   | { success: true; data: z.infer<T> }
// > {
//   // Parse response data
//   let resData;
//   try {
//     if (res.body) {
//       resData = await res.json();
//     }
//   } catch {
//     return {
//       success: false,
//       error: 'Unexpected error occurred when parsing response data',
//     };
//   }

//   // Handle 40x errors
//   switch (
//     res.status
//     // case 401:
//     //   throw NotLoggedInError()
//     // case 403:
//     //   throw NotAllowedError();
//     // case 404:
//     //   throw NotFoundError();
//   ) {
//   }

//   if (!res.ok) {
//     console.log(`handle response error ${res.status}:`, resData);
//   }

//   // Validate response data
//   const dataSchema = res.ok ? schema : errorSchema;
//   const validated = dataSchema.safeParse(resData);
//   if (!validated.success) {
//     console.log('Validation failed:', validated.error);

//     return {
//       success: false,
//       error: 'Unexpected error occurred when validating response data',
//     };
//   }

//   // Return data with success flag
//   if (!res.ok) {
//     return { success: false, error: validated.data };
//   }
//   return { success: true, data: validated.data };
// }

// export default handleResponse;
