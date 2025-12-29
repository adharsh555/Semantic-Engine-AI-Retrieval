import { createContent, getAllContents } from "../services/contentService.js";

export const addContent = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const result = await createContent({ title, content });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create content" });
  }
};

export const listContents = async (req, res) => {
  try {
    const contents = await getAllContents();
    res.json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contents" });
  }
};
