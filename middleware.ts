import { MiddlewareConfig, NextResponse, NextRequest } from "next/server";

import { AuthTokenMiddleware } from "@/middlewares/auth-token.middleware";

export const middleware = async (request: NextRequest) => {
  // let response = await AuthTokenMiddleware(request);
  // console.log("middleware");
  // if (!response) response = NextResponse.next();

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: ["/", "/doubt/:path", "/setup/:path"],
};
