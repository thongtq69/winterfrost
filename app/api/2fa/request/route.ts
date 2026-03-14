import { NextResponse } from 'next/server';
import clientPromise from '../../../../src/lib/mongodb';
import { sendTelegramNotification } from '../../../../src/lib/telegram';

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

    // Gửi thông báo tới Telegram (hoặc các kênh khác đã setup)
    const notificationMessage = `
<b>🔔 Yêu cầu mã 2FA mới!</b>

📧 <b>Email:</b> ${email}
⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN')}
🔗 <b>Xử lý tại:</b> <a href="https://winterfrost.tech/admin/2fa-manager">Trang quản lý 2FA</a>

<i>Vui lòng cấp mã cho người dùng sớm nhất có thể.</i>
    `;
    
    // Non-blocking notification send
    sendTelegramNotification(notificationMessage).catch(console.error);

    return NextResponse.json({ success: true, message: 'Request recorded and admin notified' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
