import { NextRequest, NextResponse } from "next/server";
import { extractCookies } from "@/lib/header-parser.lib";
import { isValidToken } from "@/lib/jwt-tokens.lib";
import { callDetailsApi } from "@/services/base.service";
import { CookiesName } from "@/types/cookies-name.type";
import { RoutePath_E } from "@/types/route-path.type";
import { getCookieValue } from "@/lib/cookies-handler.lib";

export const AuthTokenMiddleware = async (
  request: NextRequest
): Promise<NextResponse | undefined> => {
  const response = NextResponse.next();

  try {
    const accessToken = request.cookies.get(CookiesName.AccessToken)?.value;
    console.log(await isValidToken(accessToken ?? ""));
    if (await isValidToken(accessToken ?? "")) return response;
  } catch {
    const refreshToken = request.cookies.get(CookiesName.RefreshToken)?.value;
    if (!refreshToken)
      return NextResponse.redirect(new URL(RoutePath_E.AUTH, request.url));

    // TODO: Добавить в пути
    // Делаем запрос на сервер, чтобы он обновил auth в cookies

    const responseFetch = await fetch(
      new URL("/api/auth/refresh", request.url),
      {
        method: "GET", // Метод запроса
        headers: {
          "Content-Type": "application/json", // Тип контента
          Cookie: request.cookies.toString() || "", // Передача куков
        },
        credentials: "same-origin", // Передача куков на клиент-сервер
      }
    );
    const accessTokenFromServer = getCookieValue(
      responseFetch.headers.getSetCookie(),
      CookiesName.AccessToken
    );

    if (!accessTokenFromServer)
      throw new Error("Bad Request, но на самом деле нет токена");
    response.cookies.set(CookiesName.AccessToken, accessTokenFromServer);

    return response;
  }
};
