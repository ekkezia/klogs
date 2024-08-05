import { sanityFetch } from '@/sanity/client';
import { ArticlesSchema } from '@/types/article-types';
import { sanityQueryConfig } from '@/types/log-types';
import { NextResponse } from 'next/server';
import { z } from 'zod';
  
export async function GET() {
  try {
    const res = await sanityFetch({
      query: sanityQueryConfig("fetchAll"),
    });

    // const validated = ArticlesSchema.parse(res);

    return NextResponse.json(res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
