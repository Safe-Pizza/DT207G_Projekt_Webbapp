import { defineConfig } from "vite";
import { resolve } from "path";


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                menu: resolve(__dirname, "menu.html"),
                table: resolve(__dirname, "table.html"),
                contact: resolve(__dirname, "contact.html"),
                allergy: resolve(__dirname, "allergy.html"),
                login: resolve(__dirname, "login.html"),
                admin: resolve(__dirname, "admin.html")
            }
        }
    },
    base: "/DT207G_Projekt_Webbapp/"
})