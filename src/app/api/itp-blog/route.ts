// list all itp classes
import { sanityFetch } from '@/sanity/client';
import { sanityQueryConfig } from '@/types/itp-class-types';
import { NextResponse } from 'next/server';
import { z } from 'zod';
  
export const revalidate = 0

export async function GET() {
  try {
    const res = await sanityFetch({
      query: sanityQueryConfig("fetchAll"),
    });
    // const validated = ItpArticleSchema.parse(res);

    return NextResponse.json(res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
