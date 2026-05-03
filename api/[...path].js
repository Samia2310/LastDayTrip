module.exports = async (req, res) => {
  try {
    const [{ app }, { connectDatabase }] = await Promise.all([
      import("../server/src/app.js"),
      import("../server/src/config/db.js")
    ]);

    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error("Vercel API boot failed:", error);
    return res.status(500).json({
      message: "Server configuration error"
    });
  }
};
