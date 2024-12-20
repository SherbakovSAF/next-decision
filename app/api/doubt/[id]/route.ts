import { calculateAverageReactions } from "@/app/hooks/calculateAverageReactions";
import { getUserIdByAccessTokenFromRequest } from "@/lib/cookies-handler.lib";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) throw new Error();
    const data = await prisma.doubt_M.findFirstOrThrow({
      where: {
        id: Number(id),
        userId: await getUserIdByAccessTokenFromRequest(request),
      },
      include: {
        doubtReactions: true,
      },
    });

    const reactions = data.doubtReactions.map((reaction) => reaction.type);

    return NextResponse.json({
      ...data,
      averageReaction: calculateAverageReactions(reactions),
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
