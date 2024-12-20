export const extractCookies = (
  cookiesHeader: string
): { [key: string]: string } => {
  const cookies: { [key: string]: string } = {};
  const cookieArray = cookiesHeader.split(";");

  cookieArray.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    if (name && value) cookies[name.trim()] = value.trim();
  });

  return cookies;
};
