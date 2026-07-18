// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  ADMIN_COOKIE_NAME, 
  checkPassword, 
  expectedSessionToken 
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Log request details for debugging
    console.log("[Auth] Login request received");
    console.log("[Auth] Environment:", process.env.NODE_ENV);
    console.log("[Auth] Admin password set:", !!process.env.ADMIN_PASSWORD);
    console.log("[Auth] Session secret set:", !!process.env.SESSION_SECRET);
    
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("[Auth] Failed to parse request body:", parseError);
      return NextResponse.json(
        { 
          error: "Invalid request format",
          code: "INVALID_REQUEST"
        },
        { status: 400 }
      );
    }
    
    // Validate password field
    const { password } = body;
    
    if (!password || typeof password !== 'string') {
      console.warn("[Auth] Login attempt with missing or invalid password");
      return NextResponse.json(
        { 
          error: "Password is required",
          code: "MISSING_PASSWORD"
        },
        { status: 400 }
      );
    }
    
    // Verify password length (basic validation)
    if (password.length < 1) {
      return NextResponse.json(
        { 
          error: "Password cannot be empty",
          code: "EMPTY_PASSWORD"
        },
        { status: 400 }
      );
    }
    
    // Check environment configuration
    if (!process.env.ADMIN_PASSWORD) {
      console.error("[Auth] ADMIN_PASSWORD not configured");
      return NextResponse.json(
        { 
          error: "Server configuration error",
          code: "CONFIG_ERROR"
        },
        { status: 500 }
      );
    }
    
    if (!process.env.SESSION_SECRET) {
      console.error("[Auth] SESSION_SECRET not configured");
      return NextResponse.json(
        { 
          error: "Server configuration error",
          code: "CONFIG_ERROR"
        },
        { status: 500 }
      );
    }
    
    // Verify password
    const isValid = await checkPassword(password);
    console.log(`[Auth] Password validation result: ${isValid ? "valid" : "invalid"}`);
    
    if (!isValid) {
      // Add artificial delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 200));
      
      console.warn("[Auth] Failed login attempt");
      return NextResponse.json(
        { 
          error: "Invalid credentials",
          code: "INVALID_CREDENTIALS"
        },
        { status: 401 }
      );
    }
    
    // Generate session token
    let token;
    try {
      token = await expectedSessionToken();
    } catch (tokenError) {
      console.error("[Auth] Failed to generate session token:", tokenError);
      return NextResponse.json(
        { 
          error: "Failed to create session",
          code: "SESSION_ERROR"
        },
        { status: 500 }
      );
    }
    
    console.log(`[Auth] Session token generated (length: ${token.length})`);
    
    // Create success response
    const response = NextResponse.json({ 
      success: true,
      message: "Authentication successful"
    });
    
    // Set secure HTTP-only cookie
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true, // Always secure on Vercel (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      // Add priority for better browser compatibility
      priority: "high",
    });
    
    const elapsedTime = Date.now() - startTime;
    console.log(`[Auth] Login successful (took ${elapsedTime}ms)`);
    
    return response;
    
  } catch (error) {
    // Log the full error for debugging
    console.error("[Auth] Unexpected error during login:", error);
    console.error("[Auth] Error details:", error instanceof Error ? error.message : String(error));
    
    // Return generic error response
    return NextResponse.json(
      { 
        error: "An unexpected error occurred",
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}

// GET endpoint for checking API status
export async function GET() {
  const isConfigured = !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET;
  
  return NextResponse.json({
    status: "online",
    environment: process.env.NODE_ENV,
    configured: isConfigured,
    timestamp: new Date().toISOString(),
  });
            }
