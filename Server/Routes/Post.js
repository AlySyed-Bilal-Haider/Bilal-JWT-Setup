import { publicPosts, privatePosts } from "../db.js";

export const postpublic = (req, res) => {
  try {
    res.json(publicPosts);
  } catch (error) {
    console.log("error:", error);
  }
};

export const privateroute = (req, res) => {
  try {
    console.log(req.user);
    res.json(privatePosts);
  } catch (error) {
    console.log("error:", error);
  }
};
