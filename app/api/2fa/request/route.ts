import { NextResponse } from 'next/server';
import clientPromise from '../../../../src/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('winterforst');
    const collection = db.collection('two_factor_requests');

    // Update or insert a request for this email
    await collection.updateOne(
      { email },
      { 
        $set: { 
          email, 
          code: null, 
          status: 'pending', 
          updatedAt: new Date() 
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: 'Request recorded' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
