import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";
import { NextResponse } from "next/server";

const playgroundHandler = GRAPHQL_PLAYGROUND_GET(config);

export const GET =
  process.env.NODE_ENV === "production"
    ? () => new NextResponse(null, { status: 404 })
    : playgroundHandler;
