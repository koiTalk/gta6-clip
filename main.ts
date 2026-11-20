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

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const SHORTS_PREFIX = 'https://www.youtube.com/shorts/';

mkdirSync(OUTPUT_DIR, { recursive: true });

// Validate VIDEO.json before copying: it must be a JSON object whose url
// is a YouTube Shorts address. A bad file is refused with exit 1 instead
// of being handed to the house as this entry's video.
let raw: string;
try {
  raw = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  console.error('VIDEO.json must be a JSON object with a url property');
  process.exit(1);
}
const url = (parsed as Record<string, unknown>).url;
if (typeof url !== 'string' || !url.startsWith(SHORTS_PREFIX)) {
  console.error(`VIDEO.json url must be a YouTube Shorts address starting with ${SHORTS_PREFIX}`);
  process.exit(1);
}

try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
