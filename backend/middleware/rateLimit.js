import ratelimit from "../config/uptash.js";

const ratelimiter = async (req,res,next) => 
{
  try {
    const { success } = await ratelimit.limit("my-race-limit");

    if (!success) {
      return res.status(429).json({message:"Unable to process at this time"});
    }
    next()
  } catch (error) {
    console.log("Race Limiting ERROR")
    next(error)
  }
}

export default ratelimiter
