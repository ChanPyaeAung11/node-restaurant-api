import { startUnleash } from "unleash-client";

const featureToggleclient = startUnleash({
  url: process.env.UNLEASH_URL!,
  appName: `default`,
  customHeaders: { Authorization: process.env.UNLEASH_SECRET! },
});
export default featureToggleclient;
