// Entry for make.fun bounty "Clip GTA 6 for the most YouTube views"
// (gta6-clipper-01).
//
// The entry is the YouTube video itself: a vertical clip cut by an AI agent
// from Rockstar's Grand Theft Auto VI Trailer 2 (Lucia and Jason's wildest
// 40 seconds, 110s-148s of the trailer), with make.fun's pitch on screen and
// spoken at the end, uploaded public on YouTube as a Short with the bounty's
// line and the entrant's play code in its description. This program hands the
// grader the video's address by copying VIDEO.json from the repository root
// to the output directory, where the house reads it and fetches the video's
// view count from YouTube. That copy is all this program does.
//
// Node 22, standard library only. No network, no clock, no files outside
// the repository: the same run always writes the same bytes.
//
// Local check, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// out/VIDEO.json is then byte for byte this directory's VIDEO.json.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
