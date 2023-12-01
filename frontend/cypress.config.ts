import axios, { AxiosError } from "axios";
import { defineConfig } from "cypress";
import { dotenv } from "cypress-plugin-dotenv";

export default defineConfig({
  video: true,
  e2e: {
    experimentalInteractiveRunEvents: true,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      const newConfig = dotenv(config);
      const { BACKEND_URL, USER_TOKEN_FOR_RESET_DB } = newConfig.env;

      // implement node event listeners here
      on("task", {
        async reset_database() {
          return axios
            .post(
              `${BACKEND_URL}/api/reset_database/${USER_TOKEN_FOR_RESET_DB}`
            )
            .then((response) => {
              const { status, data } = response;
              return { status, data };
            })
            .catch((error: AxiosError) => {
              const statusCode = error.response?.status;
              const data = error.response?.data;

              return {
                status: statusCode,
                data,
              };
            });
        },
        pause(ms) {
          return new Promise((resolve) => {
            // tasks should not resolve with undefined
            setTimeout(() => resolve(null), ms);
          });
        },
      });

      on("before:run", (details) => {
        "Recomendado usar para fazer configurações gerais";
      });

      on("after:spec", (details) => {
        "Usado para defazer configurações gerais a nivel de arquivo";
      });

      on("before:spec", (details) => {
        "Rodar no inicio de cada arquivo de testes";
      });

      return newConfig;
    },
  },
});
