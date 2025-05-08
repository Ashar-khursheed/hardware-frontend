module.exports = {
  plugins: {
    autoprefixer: {
      overrides: {
        // Disable the specific rule that triggers the warning
        remove: ["gradient-direction"],
      },
    }, // Correct syntax for adding autoprefixer
  },
};
