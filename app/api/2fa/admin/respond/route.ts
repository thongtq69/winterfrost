import { NextResponse } from 'next/server';
import clientPromise from '../../../../../src/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    if (!email || !code) return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('winterforst');
    const collection = db.collection('two_factor_requests');

    const result = await collection.updateOne(
      { email },
      { 
        $set: { 
          code, 
          status: 'completed', 
          respondedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'No request found for this email' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
