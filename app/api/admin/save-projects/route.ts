import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

type Project = {
  slug: string;
  title: string;
  description: string;
  client: string;
  year: string;
  categories: string[];
  cover: string | null;
  externalUrl: string;
  detailUrl: string;
};

const dataDir = path.join(process.cwd(), 'data');

const buildTsFile = (projects: Project[]) => {
  const header = `export type Project = {
  slug: string;
  title: string;
  description: string;
  client: string;
  year: string;
  categories: string[];
  cover: string | null;
  externalUrl: string;
  detailUrl: string;
};

`;
  const body = `export const projects: Project[] = ${JSON.stringify(projects, null, 2)};\nexport const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);\n`;
  return header + body;
};

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const projects = payload?.projects as Project[] | undefined;
    if (!projects || !Array.isArray(projects)) {
      return NextResponse.json({ ok: false, message: 'Payload projects không hợp lệ' }, { status: 400 });
    }

    const jsonPath = path.join(dataDir, 'projects.json');
    const tsPath = path.join(dataDir, 'projects.ts');

    await fs.writeFile(jsonPath, JSON.stringify({ projects }, null, 2), 'utf8');
    await fs.writeFile(tsPath, buildTsFile(projects), 'utf8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, message: (error as Error).message }, { status: 500 });
  }
}
