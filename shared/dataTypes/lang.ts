import * as t from "io-ts";

export const LangCodec = t.literal("en");

export type Lang = t.TypeOf<typeof LangCodec>;
