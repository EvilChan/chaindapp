import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = fileURLToPath(path.dirname(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [react()],
});
