import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Static Export (GitHub Pages) 不支援 Middleware
  // 我們無法在這裡透過 Server 回應來寫入 Cookie。
  //
  // 權限驗證與 Token 管理必須完全由 Client-Side (Client Component) 處理。
  // Supabase Auth (Client) 會自動在瀏覽器端管理 access_token cookie。
  
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}
