import { TinaNodeBackend, LocalBackend } from "@tinacms/datalayer";
import { TinaAuthJSOptions, AuthjsLcoalProvider } from "tinacms-authjs";
import database from "../../../tina/__generated__/database.js";
import { NextRequest, NextResponse } from "next/server";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = NextRequest.create(
  new TinaNodeBackend({
    localBackend: isLocal ? new LocalBackend({ database }) : undefined,
    authOptions: TinaAuthJSOptions({
      database: database,
      secret: process.env.NEXTAUTH_SECRET,
      authOptions: {
        providers: [
          AuthjsLcoalProvider({
            // This is just for the local dev server
            // We'll wire this up to GitHub later
          }),
        ],
      },
    }),
  })
);

export const GET = (req) => {
  return handler.handle(req);
};

export const POST = (req) => {
  return handler.handle(req);
};

export const PUT = (req) => {
  return handler.handle(req);
};

export const DELETE = (req) => {
  return handler.handle(req);
};