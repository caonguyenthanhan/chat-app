import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// No need for OpenAI client since we're using AIMLAPI
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Lấy API key từ environment variable
    const apiKey = process.env.AIMLAPI_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AIMLAPI key is not configured' },
        { status: 500 }
      );
    }

    // Gọi API của AIMLAPI
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // Sử dụng apiKey từ environment variable
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Sử dụng model name hợp lệ
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    // Log response details for debugging
    if (!response.ok) {
      const errorData = await response.text();
      console.error('AIMLAPI Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData
      });
      throw new Error(`AIMLAPI request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('AIMLAPI Response:', data);

    // Lưu câu hỏi và câu trả lời vào file CSV
    const lastUserMessage = messages[messages.length - 1].content;
    const aiResponse = data.choices[0].message.content;
    const now = new Date();
    const timestamp = now.toLocaleString('vi-VN', { 
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Format CSV với xuống dòng và định dạng thời gian Việt Nam
    const csvLine = `"${lastUserMessage.replace(/"/g, '""')}","${aiResponse.replace(/"/g, '""')}","${timestamp}"\n\n`;
    
    // Đảm bảo thư mục data tồn tại
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    // Ghi vào file CSV
    fs.appendFileSync(path.join(dataDir, 'chat_history.csv'), csvLine);

    // Trả về kết quả
    return NextResponse.json({
      message: data.choices[0].message.content,
      role: 'assistant'
    });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process your request', details: error.message },
      { status: 500 }
    );
  }
}