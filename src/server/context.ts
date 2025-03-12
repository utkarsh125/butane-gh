// src/server/context.ts
import type { NextApiRequest, NextApiResponse } from "next";

import type { Session } from "next-auth";
import { db } from "./db";

export interface TRPCContext {
  req: NextApiRequest;
  res: NextApiResponse;
  db: typeof db;
  session: Session | null;
}
