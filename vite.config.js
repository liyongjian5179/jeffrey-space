import { existsSync } from "node:fs";
import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const staticAssetDirs = ["images", "docs"];

function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    apply: "build",
    async closeBundle() {
      const root = process.cwd();
      const distDir = resolve(root, "dist");
      const assetsSource = resolve(root, "assets");
      const assetsTarget = resolve(distDir, "assets");
      const cnameSource = resolve(root, "CNAME");
      const cnameTarget = resolve(distDir, "CNAME");

      await mkdir(distDir, { recursive: true });
      await mkdir(assetsTarget, { recursive: true });

      await Promise.all(staticAssetDirs.map(async (dir) => {
        const source = resolve(assetsSource, dir);
        const target = resolve(assetsTarget, dir);
        if (!existsSync(source)) return;
        await rm(target, { recursive: true, force: true });
        await cp(source, target, { recursive: true });
      }));

      if (existsSync(cnameSource)) {
        await copyFile(cnameSource, cnameTarget);
      }
    }
  };
}

export default defineConfig({
  plugins: [copyStaticAssets()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || assetInfo.name || "";
          if (name.endsWith(".css")) return "assets/css/[name]-[hash][extname]";
          return "assets/media/[name]-[hash][extname]";
        }
      }
    }
  }
});
