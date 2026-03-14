import { NextResponse } from 'next/server';
import clientPromise from '../../../../src/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('winterforst');
    const collection = db.collection('two_factor_requests');

    const entry = await collection.findOne({ email });

    if (!entry) {
      return NextResponse.json({ status: 'not_found' });
    }

    if (entry.code) {
      return NextResponse.json({ status: 'completed', code: entry.code });
    }

    return NextResponse.json({ status: 'pending' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
