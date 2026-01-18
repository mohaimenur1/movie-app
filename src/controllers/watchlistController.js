const { prisma } = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // verify movie exist into the movie table
  const movieExist = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!movieExist) {
    return res.status(404).json({ error: "Movie not found" });
  }
};

module.exports = { register, login, logout };
