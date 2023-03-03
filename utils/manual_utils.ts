// Copyright 2022-2023 the Deno authors. All rights reserved. MIT license.

import { join } from "$std/path/mod.ts";
import { getSourceURL } from "./registry_utils.ts";
import VERSIONS from "@/versions.json" assert { type: "json" };

const githubBasepath = "https://cdn.jsdelivr.net/gh/denocn/deno_docs@";
const sourcepath = "https://github.com/denocn/deno_docs/blob/";

export const versions = VERSIONS.cli;

export interface TableOfContents {
  [slug: string]: {
    name: string;
    children?: TableOfContents;
    redirectFrom?: string[];
  } | string;
}

export function collectToC(toc: TableOfContents, base = ""): string[] {
  const out = [];
  for (const [path, content] of Object.entries(toc)) {
    out.push(base + path);
    if (typeof content !== "string" && content.children) {
      out.push(...collectToC(content.children, base + path + "/"));
    }
  }
  return out;
}

export function basepath(version: string) {
  const manualPath = Deno.env.get("MANUAL_PATH");
  if (manualPath) {
    return "file://" + join(Deno.cwd(), manualPath);
  }
  if (isPreviewVersion(version)) {
    return githubBasepath + version;
  }
  return getSourceURL("manual", version, "");
}

export async function getTableOfContents(
  version: string,
): Promise<TableOfContents> {
  version = "master";
  const res = await fetch(`${githubBasepath}${version}/toc.json`);
  if (res.status !== 200) {
    throw Error(
      `Got an error (${res.status}) while getting the manual table of contents:\n${await res
        .text()}`,
    );
  }
  return await res.json();
}

export function getFileURL(version: string, path: string): string {
  version = "master";
  return `${githubBasepath}${version}${path}.md`;
}

export function getDocURL(_version: string, path: string): string {
  return `${sourcepath}master${path}.md`;
}

export function getDescription(content: string): string | undefined {
  const paras = content.split("\n\n");
  for (const para of paras) {
    if (para.match(/^[^#`]/)) {
      return para.slice(0, 199);
    }
  }
}

export function isPreviewVersion(version: string): boolean {
  return VERSIONS.cli.find((v) => v === version) === undefined;
}

export function generateToC(toc: TableOfContents, parentSlug: string) {
  const tempList: { path: string; name: string }[] = [];
  const redirectList: Record<string, string> = {};

  function tocGen(tocInner: TableOfContents, parentSlugInner: string) {
    for (const [childSlug, entry] of Object.entries(tocInner)) {
      const slug = `${parentSlugInner}/${childSlug}`;
      const name = typeof entry === "string" ? entry : entry.name;
      tempList.push({
        path: slug,
        name,
      });
      if (typeof entry === "object" && entry.redirectFrom) {
        for (const redirect of entry.redirectFrom) {
          redirectList[redirect] = slug;
        }
      }
      if (typeof entry === "object" && entry.children) {
        tocGen(entry.children, slug);
      }
    }
  }
  tocGen(toc, parentSlug);

  return { pageList: tempList, redirectList };
}
