import "dotenv/config";
declare const buildApp: () => import("express-serve-static-core").Express;
export default buildApp;
