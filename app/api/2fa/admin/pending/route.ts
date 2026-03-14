import { NextResponse } from 'next/server';
import clientPromise from '../../../../../src/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('winterforst');
    const collection = db.collection('two_factor_requests');

    const pending = await collection.find({ status: 'pending' }).sort({ updatedAt: -1 }).toArray();

    return NextResponse.json(pending);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
