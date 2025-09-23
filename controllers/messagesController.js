const asyncHandler = require("express-async-handler");

const getPublicMessage  = asyncHandler(async (req, res) => {
  res.status(200).json({
    text: "This is a public message.",
  }); 
}); 

const getProtectedMessage = asyncHandler(async (req, res) => {
  res.status(200).json({
    text: "This is a protected message.",
  }); 
});


const getAdminMessage  = asyncHandler(async (req, res) => {
  res.status(200).json({
    text: "This is an admin message.",
  }); 
});

module.exports = {
  getPublicMessage,
  getProtectedMessage,
  getAdminMessage, 
};

