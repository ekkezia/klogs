import { sanityFetch } from '@/sanity/client';
import { ArticlesCountSchema, COUNT_QUERY } from '@/types/article-types';
import { NextResponse } from 'next/server';
import { z } from 'zod';

  
export async function GET() {
  try {
    const res = await sanityFetch({
      query: COUNT_QUERY,
    });
    const validated = ArticlesCountSchema.parse(res)

    return NextResponse.json(validated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
