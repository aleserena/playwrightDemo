export const users = {
  standard_user: {
    displayName: "Standard User",
    name: "standard_user",
    storageState: ".auth/standard_user.json",
    password: process.env.PASSWORD,
  },
  problem_user: {
    displayName: "Problem User",
    name: "problem_user",
    storageState: ".auth/problem_user.json",
    password: process.env.PASSWORD,
  },
  performance_glitch_user: {
    displayName: "Performance Glitch User",
    name: "performance_glitch_user",
    storageState: ".auth/performance_glitch_user.json",
    password: process.env.PASSWORD,
  },
  error_user: {
    displayName: "Error User",
    name: "error_user",
    storageState: ".auth/error_user.json",
    password: process.env.PASSWORD,
  },
  visual_user: {
    displayName: "Visual User",
    name: "visual_user",
    storageState: ".auth/visual_user.json",
    password: process.env.PASSWORD,
  },
  locked_out_user: {
    displayName: "Locked Out User",
    name: "locked_out_user",
    storageState: ".auth/locked_out_user.json",
    password: process.env.PASSWORD,
  },
};
