import { join } from "path";

function getRootDir(dir: string) {
	return dir;
}

export const CWD = process.cwd();
export const ROOT = getRootDir(CWD);
export const CLI_ROOT = join(__dirname, "../../");
export const CLI_SRC = join(CLI_ROOT, "src");
export const CLI_SITE = join(CLI_ROOT, "site");
export const CLI_DIST = join(CLI_ROOT, "dist");

export const ROOT_SRC = join(ROOT, "src");
